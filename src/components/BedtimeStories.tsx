
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Youtube } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Story {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
}

const BedtimeStories: React.FC = () => {
  // This would typically come from an API or backend
  const stories: Story[] = [
    {
      id: '1',
      title: 'The Three Little Pigs',
      thumbnailUrl: '/placeholder.svg',
      videoId: 'QLR2pLUsl-s',
      duration: '8 mins'
    },
    {
      id: '2',
      title: 'Goldilocks and the Three Bears',
      thumbnailUrl: '/placeholder.svg',
      videoId: 'LDMWJCrDmxo',
      duration: '10 mins'
    },
    {
      id: '3',
      title: 'Little Red Riding Hood',
      thumbnailUrl: '/placeholder.svg',
      videoId: 'LDMWJCrDmxo',
      duration: '7 mins'
    },
    {
      id: '4',
      title: 'Jack and the Beanstalk',
      thumbnailUrl: '/placeholder.svg',
      videoId: 'LDMWJCrDmxo',
      duration: '12 mins'
    }
  ];

  const openYoutubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
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
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4">
          {stories.map((story) => (
            <Card 
              key={story.id} 
              className="w-72 flex-shrink-0 rounded-xl border-kid-purple/20 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openYoutubeVideo(story.videoId)}
            >
              <div className="relative h-40 bg-muted">
                <img 
                  src={story.thumbnailUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/80 p-3">
                    <Youtube className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {story.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-base truncate">{story.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Youtube className="h-3 w-3 text-red-600" /> YouTube Kids
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default BedtimeStories;
