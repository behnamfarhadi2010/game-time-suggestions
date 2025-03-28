
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getGeminiApiKey, saveGeminiApiKey, removeGeminiApiKey } from '../services/aiService';
import { KeyRound, Trash2 } from 'lucide-react';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = getGeminiApiKey();
    setHasKey(!!storedKey);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    saveGeminiApiKey(apiKey);
    setHasKey(true);
    setIsOpen(false);
    toast.success('Gemini API key saved!');
  };

  const handleRemoveKey = () => {
    removeGeminiApiKey();
    setApiKey('');
    setHasKey(false);
    toast.success('Gemini API key removed');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={hasKey ? "outline" : "default"} className="rounded-full">
          <KeyRound className="mr-2 h-4 w-4" />
          {hasKey ? 'API Key Configured' : 'Add AI API Key'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Google Gemini API Key</DialogTitle>
          <DialogDescription>
            Enter your Gemini API key to get smarter game recommendations.
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-kid-purple hover:underline block mt-2"
            >
              Get a free API key from Google AI Studio
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="rounded-md"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          {hasKey && (
            <Button variant="destructive" onClick={handleRemoveKey} type="button">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Key
            </Button>
          )}
          <Button type="button" onClick={handleSaveKey}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
