import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Youtube, BookmarkPlus } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { toast } from 'sonner';

interface Story {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
  channel: string;
}

const BedtimeStories: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const stories: Story[] = [
    {
      id: '1',
      title: 'Cinderella - Fairy Tale',
      thumbnailUrl: `https://img.youtube.com/vi/DgwZebuIiXc/maxresdefault.jpg`,
      videoId: 'DgwZebuIiXc',
      duration: '12 mins',
      channel: '@FairyTales.English'
    },
    {
      id: '2',
      title: 'Snow White and the Seven Dwarfs',
      thumbnailUrl: `https://img.youtube.com/vi/HgfJQfMgHpE/maxresdefault.jpg`,
      videoId: 'HgfJQfMgHpE',
      duration: '14 mins',
      channel: '@FairyTales.English'
    },
    {
      id: '3',
      title: 'The Little Mermaid',
      thumbnailUrl: `https://img.youtube.com/vi/LPJQB9gLsUI/maxresdefault.jpg`,
      videoId: 'LPJQB9gLsUI',
      duration: '10 mins',
      channel: '@FairyTales.English'
    },
    {
      id: '4',
      title: 'Beauty and the Beast',
      thumbnailUrl: `https://img.youtube.com/vi/EMjWfVkyGUE/maxresdefault.jpg`,
      videoId: 'EMjWfVkyGUE',
      duration: '11 mins',
      channel: '@FairyTales.English'
    },
    {
      id: '5',
      title: 'The Three Little Pigs',
      thumbnailUrl: `https://img.youtube.com/vi/JS-HRq18EGo/maxresdefault.jpg`,
      videoId: 'JS-HRq18EGo',
      duration: '8 mins',
      channel: '@Snugglekids'
    },
    {
      id: '6',
      title: 'Goldilocks and the Three Bears',
      thumbnailUrl: `https://img.youtube.com/vi/iR2M0QuLPZs/maxresdefault.jpg`,
      videoId: 'iR2M0QuLPZs',
      duration: '7 mins',
      channel: '@Snugglekids'
    },
    {
      id: '7',
      title: 'Little Red Riding Hood',
      thumbnailUrl: `https://img.youtube.com/vi/egHUf-MnRRo/maxresdefault.jpg`,
      videoId: 'egHUf-MnRRo',
      duration: '9 mins',
      channel: '@Snugglekids'
    },
    {
      id: '8',
      title: 'Jack and the Beanstalk',
      thumbnailUrl: `https://img.youtube.com/vi/KBtpWz6UGlg/maxresdefault.jpg`,
      videoId: 'KBtpWz6UGlg',
      duration: '10 mins',
      channel: '@Snugglekids'
    },
    {
      id: '9',
      title: 'Sleeping Beauty',
      thumbnailUrl: `https://img.youtube.com/vi/VGQsb7nGkCU/maxresdefault.jpg`,
      videoId: 'VGQsb7nGkCU',
      duration: '13 mins',
      channel: '@LittleMoonbeam'
    },
    {
      id: '10',
      title: 'Hansel and Gretel',
      thumbnailUrl: `https://img.youtube.com/vi/jfg-CYLs9_s/maxresdefault.jpg`,
      videoId: 'jfg-CYLs9_s',
      duration: '11 mins',
      channel: '@LittleMoonbeam'
    },
    {
      id: '11',
      title: 'Rapunzel',
      thumbnailUrl: `https://img.youtube.com/vi/L2WVKnNozKE/maxresdefault.jpg`,
      videoId: 'L2WVKnNozKE',
      duration: '12 mins',
      channel: '@LittleMoonbeam'
    },
    {
      id: '12',
      title: 'The Princess and the Pea',
      thumbnailUrl: `https://img.youtube.com/vi/IPytbUghpJM/maxresdefault.jpg`,
      videoId: 'IPytbUghpJM',
      duration: '8 mins',
      channel: '@LittleMoonbeam'
    }
  ];

  const openYoutubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const toggleFavorite = (storyId: string) => {
    setFavorites(prev => {
      if (prev.includes(storyId)) {
        toast("Removed from favorites");
        return prev.filter(id => id !== storyId);
      } else {
        toast("Added to favorites");
        return [...prev, storyId];
      }
    });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-kid-purple flex items-center gap-2">
          <BookOpen className="h-6 w-6" /> Bedtime Stories
        </h2>
        <Button variant="outline" className="text-kid-purple border-kid-purple/30 rounded-full">
          View All
        </Button>
      </div>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {stories.map((story) => (
              <CarouselItem key={story.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card 
                  className="rounded-xl border-kid-purple/20 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="relative h-40 bg-muted">
                    <img 
                      src={story.thumbnailUrl} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                      onClick={() => openYoutubeVideo(story.videoId)}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => openYoutubeVideo(story.videoId)}
                    >
                      <div className="rounded-full bg-white/80 p-3">
                        <Youtube className="h-8 w-8 text-red-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                      {story.duration}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(story.id);
                      }}
                      className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"
                    >
                      <BookmarkPlus className={`h-4 w-4 ${favorites.includes(story.id) ? 'text-kid-purple fill-kid-purple' : 'text-gray-600'}`} />
                    </button>
                  </div>
                  <CardContent className="p-4" onClick={() => openYoutubeVideo(story.videoId)}>
                    <h3 className="font-semibold text-base truncate">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Youtube className="h-3 w-3 text-red-600" /> {story.channel}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white border-kid-purple/20 text-kid-purple hover:bg-kid-purple hover:text-white" />
          <CarouselNext className="right-0 bg-white border-kid-purple/20 text-kid-purple hover:bg-kid-purple hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default BedtimeStories;
