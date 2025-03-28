
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Mic, MessageCircle, X, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const PiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hi there! I\'m Pi, your friendly AI companion. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isMobile = useIsMobile();

  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error('Could not recognize your voice. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      toast.error('Speech recognition is not supported in your browser');
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast.info('Listening... Speak now');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Could not start voice recognition');
      }
    }
  };

  const speakResponse = (text: string) => {
    if (isMuted) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a female voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('woman') || 
        voice.name.includes('girl') ||
        voice.name.toLowerCase().includes('samantha')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Configure speech parameters for a kid-friendly voice
      utterance.pitch = 1.2;  // Slightly higher pitch
      utterance.rate = 1.0;   // Normal speed
      utterance.volume = 1.0; // Full volume
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        speechSynthesisRef.current = null;
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        speechSynthesisRef.current = null;
        toast.error('Speech synthesis error occurred');
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Speech synthesis is not supported in your browser');
    }
  };

  const toggleMute = () => {
    if (isSpeaking && !isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    // Add user message to chat
    const newUserMessage = { role: 'user' as const, content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsProcessing(true);

    try {
      // Simulate Pi.ai response (in a real implementation, you would call the Pi.ai API)
      setTimeout(() => {
        // Example response - in production, this would be from the Pi.ai API
        const piResponse = getPiResponse(text);
        const assistantMessage = { role: 'assistant' as const, content: piResponse };
        setMessages([...updatedMessages, assistantMessage]);
        setIsProcessing(false);
        
        // Speak the response
        speakResponse(piResponse);
      }, 1000);
      
      // For a real implementation with Pi.ai API:
      // const response = await fetch('https://api.pi.ai/chat', { 
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_PI_API_KEY' },
      //   body: JSON.stringify({ message: text })
      // });
      // const data = await response.json();
      // setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      // speakResponse(data.response);
      
    } catch (error) {
      console.error('Error sending message to Pi:', error);
      toast.error('Could not connect to Pi. Please try again later.');
      setIsProcessing(false);
    }
  };

  // Initialize speech synthesis voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
      
      // Clean up on unmount
      return () => {
        if (speechSynthesisRef.current) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Temporary function to generate responses for demo purposes
  const getPiResponse = (message: string): string => {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return 'Hello there! I\'m Pi. I love talking with kids! What would you like to play today?';
    } else if (message.includes('game') || message.includes('play')) {
      return 'I know lots of games! How about I Spy, Simon Says, or we could make up a story together? What would you like to do?';
    } else if (message.includes('story')) {
      return 'Once upon a time, there was a brave little explorer who discovered a magical playground. Would you like to hear what happened next?';
    } else if (message.includes('song') || message.includes('sing')) {
      return 'I love singing! 🎵 Twinkle twinkle little star, how I wonder what you are! 🎵 Do you know this song?';
    } else {
      return 'That sounds interesting! Tell me more about it or ask me to play a game with you!';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full bg-kid-purple shadow-lg hover:bg-kid-purple/90 transition-all"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className={`w-full sm:max-w-md rounded-t-2xl pt-16 border-kid-purple border-2 ${isMobile ? 'font-sans' : 'font-comic'}`} side="bottom">
          <div className="flex flex-col h-[70vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-kid-purple">Chat with Pi</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className={isMuted ? 'text-red-500' : 'text-green-500'}
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-1 space-y-4 mb-4 bg-gray-50 rounded-lg">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-kid-blue text-white' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-white border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-kid-purple"
              />
              <Button 
                type="button" 
                onClick={() => handleSend()}
                className="bg-kid-purple text-white rounded-full hover:bg-kid-purple/90"
              >
                Send
              </Button>
              <Button 
                type="button" 
                onClick={toggleListening}
                variant={isListening ? "destructive" : "outline"}
                className={`rounded-full ${isListening ? 'animate-pulse' : ''}`}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PiChatbot;
