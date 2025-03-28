
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { findGames, Game } from '../data/gameData';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import ApiKeyInput from '../components/ApiKeyInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Gamepad2, Brain } from 'lucide-react';
import { enhanceGameSuggestions, getGeminiApiKey } from '../services/aiService';
import { toast } from 'sonner';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const age = Number(searchParams.get('age') || '4');
  const time = Number(searchParams.get('time') || '15');
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') || '';

  // Check if AI can be used
  useEffect(() => {
    const hasApiKey = !!getGeminiApiKey();
    setIsAiEnabled(hasApiKey);
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(async () => {
      // Use the appropriate search parameters
      let foundGames = findGames(age, time, category, featured);
      setGames(foundGames);
      setLoading(false);
      
      // If API key is available, enhance suggestions automatically
      if (isAiEnabled && foundGames.length > 0) {
        enhanceWithAi(foundGames);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [age, time, category, featured, isAiEnabled]);

  const enhanceWithAi = async (gamesList: Game[]) => {
    if (!getGeminiApiKey()) {
      toast.error("Please add your Gemini API key first");
      return;
    }
    
    setIsAiProcessing(true);
    toast.info("AI is analyzing your game options...");
    
    try {
      const enhancedGames = await enhanceGameSuggestions(gamesList, age, time);
      setGames(enhancedGames);
      toast.success("Games have been sorted by AI recommendation");
    } catch (error) {
      console.error("Error enhancing game suggestions:", error);
      toast.error("Failed to get AI recommendations");
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-kid-purple mb-2">
                Game Suggestions
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" /> For {age} year old
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" /> {time} minutes available
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {!loading && games.length > 0 && (
                <Button 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => enhanceWithAi(games)}
                  disabled={isAiProcessing || !getGeminiApiKey()}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {isAiProcessing ? 'Processing...' : 'Get AI Recommendations'}
                </Button>
              )}
              <ApiKeyInput />
              <Link to="/">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  New Search
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="kid-card h-80 animate-pulse">
                  <div className="h-full flex flex-col">
                    <div className="h-8 bg-muted rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-muted rounded mb-6 w-1/4"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-full"></div>
                    <div className="flex-1 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="kid-card text-center py-12">
              <h2 className="text-2xl font-bold text-kid-purple mb-4">No Games Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any games that match your criteria. Try adjusting the age range or available time.
              </p>
              <Link to="/">
                <Button className="kid-button bg-gradient-to-r from-kid-purple to-kid-blue">
                  Try Again
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;
