
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { findGames, Game } from '../data/gameData';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import ApiKeyInput from '../components/ApiKeyInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Gamepad2, Brain, Sparkles, Filter } from 'lucide-react';
import { enhanceGameSuggestions, getGeminiApiKey } from '../services/aiService';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Results: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiUsedCount, setAiUsedCount] = useState(0);
  const [originalGames, setOriginalGames] = useState<Game[]>([]);

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
      setFilteredGames(foundGames);
      setOriginalGames(foundGames);
      setLoading(false);
      
      // If API key is available, enhance suggestions automatically
      if (isAiEnabled && foundGames.length > 0) {
        enhanceWithAi(foundGames);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [age, time, featured, isAiEnabled]);

  // Separate effect for category changes to avoid full reload
  useEffect(() => {
    if (originalGames.length > 0 && !loading) {
      if (!category || category === 'all') {
        setFilteredGames(games);
      } else {
        const categoryMap: Record<string, string[]> = {
          'indoor': ['indoor'],
          'outdoor': ['outdoor'],
          'active': ['active'],
          'quiet': ['quiet'],
          'learning': ['learning'],
          'creative': ['creative', 'art'],
          'group': ['group', 'party']
        };
        
        const relevantTags = categoryMap[category] || [];
        
        if (relevantTags.length > 0) {
          const filtered = games.filter(game => 
            game.tags.some(tag => relevantTags.includes(tag))
          );
          setFilteredGames(filtered);
        } else {
          setFilteredGames(games);
        }
      }
    }
  }, [category, games, originalGames, loading]);

  const enhanceWithAi = async (gamesList: Game[]) => {
    if (!getGeminiApiKey()) {
      toast.error("Please add your Gemini API key first");
      return;
    }
    
    setIsAiProcessing(true);
    setAiUsedCount(prev => prev + 1);
    
    const toastMessage = aiUsedCount > 0 
      ? "AI is creating new recommendations..." 
      : "AI is analyzing your game options...";
    
    toast.info(toastMessage, {
      icon: <Sparkles className="h-4 w-4 text-yellow-400" />
    });
    
    try {
      const enhancedGames = await enhanceGameSuggestions(gamesList, age, time);
      setGames(enhancedGames);
      
      // When category is active, apply filtering to enhanced games
      if (category && category !== 'all') {
        const categoryMap: Record<string, string[]> = {
          'indoor': ['indoor'],
          'outdoor': ['outdoor'],
          'active': ['active'],
          'quiet': ['quiet'],
          'learning': ['learning'],
          'creative': ['creative', 'art'],
          'group': ['group', 'party']
        };
        
        const relevantTags = categoryMap[category] || [];
        
        if (relevantTags.length > 0) {
          const filtered = enhancedGames.filter(game => 
            game.tags.some(tag => relevantTags.includes(tag))
          );
          setFilteredGames(filtered);
        } else {
          setFilteredGames(enhancedGames);
        }
      } else {
        setFilteredGames(enhancedGames);
      }
      
      const successMessage = aiUsedCount > 0 
        ? "New AI recommendations generated" 
        : "Games have been sorted by AI recommendation";
        
      toast.success(successMessage, {
        icon: <Sparkles className="h-4 w-4 text-yellow-400" />
      });
    } catch (error) {
      console.error("Error enhancing game suggestions:", error);
      toast.error("Failed to get AI recommendations");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value === 'all') {
        newParams.delete('category');
      } else {
        newParams.set('category', value);
      }
      return newParams;
    });
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
                  onClick={() => enhanceWithAi(originalGames)}
                  disabled={isAiProcessing || !getGeminiApiKey()}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {isAiProcessing ? 'Processing...' : (aiUsedCount > 0 ? 'Get New AI Recommendations' : 'Get AI Recommendations')}
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

          {!loading && games.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by category:</span>
              </div>
              <Select 
                value={category || 'all'} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="quiet">Quiet</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

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
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="kid-card text-center py-12">
              <h2 className="text-2xl font-bold text-kid-purple mb-4">No Games Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any games that match your selected category. Try another category or adjust your search.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleCategoryChange('all')}
                  className="rounded-full"
                >
                  Show All Games
                </Button>
                <Link to="/">
                  <Button className="kid-button bg-gradient-to-r from-kid-purple to-kid-blue">
                    New Search
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;
