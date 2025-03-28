
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedGame: React.FC = () => {
  // This would typically come from a backend or context
  const featuredGame = {
    name: "Musical Freeze Dance",
    ageRange: "3-8",
    timeRequired: 15,
    imageUrl: "https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    id: "5" // Changed to match an actual game ID from the gameData
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl shadow-xl border-2 border-kid-purple/30 max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
      
      <img 
        src={featuredGame.imageUrl} 
        alt={featuredGame.name}
        className="w-full h-56 md:h-72 object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Game of the Day: {featuredGame.name}
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-kid-purple/90 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <span className="text-xl">👶</span> Ages {featuredGame.ageRange}
          </span>
          <span className="bg-kid-blue/90 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Clock className="h-4 w-4" /> {featuredGame.timeRequired} mins
          </span>
        </div>
        
        <Link to={`/results?featured=${featuredGame.id}`}>
          <Button 
            className="bg-gradient-to-r from-kid-purple to-kid-blue hover:opacity-90 transition-opacity"
          >
            <Gamepad2 className="mr-2 h-4 w-4" /> Play Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default FeaturedGame;
