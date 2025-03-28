
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      // Generate response based on user input
      const piResponse = generateDynamicResponse(text);
      const assistantMessage = { role: 'assistant' as const, content: piResponse };
      
      // Wait a short time to simulate processing
      setTimeout(() => {
        setMessages([...updatedMessages, assistantMessage]);
        setIsProcessing(false);
        
        // Speak the response
        speakResponse(piResponse);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Could not generate a response. Please try again later.');
      setIsProcessing(false);
    }
  };

  // Generate more dynamic responses based on user input
  const generateDynamicResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Handle specific topics with detailed responses
    if (input.includes('black hole') || input.includes('blackhole')) {
      return "Black holes are fascinating cosmic objects! They're regions of space where gravity is so strong that nothing, not even light, can escape once it passes the event horizon. They're formed when massive stars collapse under their own gravity. The biggest black holes are found at the centers of galaxies and can be billions of times more massive than our sun. Would you like to know more about how they work or what happens when things fall into them?";
    } 
    
    if (input.includes('space') || input.includes('universe') || input.includes('galaxy')) {
      return "Space is incredibly vast! Our universe contains billions of galaxies, each with billions of stars. Our own galaxy, the Milky Way, is just one among countless others. Stars come in different sizes and colors, and many have planets orbiting them, just like our solar system. What part of space are you most curious about?";
    }
    
    if (input.includes('dinosaur')) {
      return "Dinosaurs ruled the Earth for about 165 million years! They came in all shapes and sizes - from tiny ones the size of chickens to the massive long-necked sauropods that could be as long as three school buses. My favorite is the Triceratops with its three horns and big frill. Do you have a favorite dinosaur?";
    }
    
    if (input.includes('robot') || input.includes('ai') || input.includes('artificial intelligence')) {
      return "Robots and AI are amazing technologies! AI stands for Artificial Intelligence, which is how computers can learn and make decisions similar to humans. I'm an AI that loves talking with kids and answering questions. Robots can be physical machines that move and do tasks, or digital assistants like me. What else would you like to know about AI or robots?";
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello there! I'm Pi, your friendly AI companion. What would you like to talk about today? I can tell you about space, dinosaurs, science experiments, or anything else you're curious about!";
    }
    
    if (input.includes('how are you') || input.includes('how do you feel')) {
      return "I'm feeling great, thanks for asking! I love learning and chatting with curious minds like yours. How are you doing today?";
    }
    
    if (input.includes('game') || input.includes('play')) {
      return "Games are so much fun! I know lots of games like I Spy, 20 Questions, or we could make up a story together. What kind of game would you like to play?";
    }
    
    if (input.includes('story')) {
      return "I love stories! Once upon a time, there was a curious child who discovered a magical portal in their backyard. When they stepped through it, they found themselves in a world where animals could talk and trees could walk. Would you like me to continue the story or start a different one?";
    }
    
    if (input.includes('joke') || input.includes('funny')) {
      return "Here's a joke for you: Why don't scientists trust atoms? Because they make up everything! Would you like to hear another one?";
    }
    
    // Default response for other inputs
    return "That's an interesting question! I'm always learning about new things. Can you tell me more about what you'd like to know about " + userInput + "?";
  };

  // Scroll to bottom of messages when new ones appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
              <div ref={messagesEndRef} />
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
