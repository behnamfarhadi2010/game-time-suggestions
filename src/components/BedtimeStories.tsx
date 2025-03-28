
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Youtube } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

interface Story {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
}

const BedtimeStories: React.FC = () => {
  // Real YouTube bedtime stories with actual video IDs
  const stories: Story[] = [
    {
      id: '1',
      title: 'The Three Little Pigs',
      thumbnailUrl: `https://img.youtube.com/vi/QLR2pLUsl-s/maxresdefault.jpg`,
      videoId: 'QLR2pLUsl-s',
      duration: '8 mins'
    },
    {
      id: '2',
      title: 'Goldilocks and the Three Bears',
      thumbnailUrl: `https://img.youtube.com/vi/LDMWJCrDmxo/maxresdefault.jpg`,
      videoId: 'LDMWJCrDmxo',
      duration: '10 mins'
    },
    {
      id: '3',
      title: 'Little Red Riding Hood',
      thumbnailUrl: `https://img.youtube.com/vi/0W86K1jBJFI/maxresdefault.jpg`,
      videoId: '0W86K1jBJFI',
      duration: '7 mins'
    },
    {
      id: '4',
      title: 'Jack and the Beanstalk',
      thumbnailUrl: `https://img.youtube.com/vi/zurz-pL-uzw/maxresdefault.jpg`,
      videoId: 'zurz-pL-uzw',
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
                  className="rounded-xl border-kid-purple/20 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
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
