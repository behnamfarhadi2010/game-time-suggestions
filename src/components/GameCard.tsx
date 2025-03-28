
import React, { useState } from 'react';
import { Game } from '../data/gameData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Video, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Card className="kid-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-kid-purple">{game.title}</CardTitle>
        <div className="flex items-center text-muted-foreground gap-2 mt-1">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{game.timeRequired} minutes</span>
        </div>
        <CardDescription className="mt-2">{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          {showVideo ? (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${game.videoId}?autoplay=1`} 
              title={`${game.title} video`}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={`https://img.youtube.com/vi/${game.videoId}/maxresdefault.jpg`}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button 
                  className="bg-kid-purple hover:bg-kid-purple/90 text-white flex items-center gap-2"
                  onClick={() => setShowVideo(true)}
                >
                  <Youtube className="h-5 w-5" />
                  Watch Video
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-kid-blue/10 text-kid-blue border-kid-blue/20">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default GameCard;
