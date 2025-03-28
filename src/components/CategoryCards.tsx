
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Gamepad2, Brain, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const categories: CategoryProps[] = [
  { 
    name: "Indoor Games", 
    icon: <Gamepad2 className="h-8 w-8" />, 
    color: "text-kid-purple",
    bgColor: "bg-kid-purple/10" 
  },
  { 
    name: "Outdoor Games", 
    icon: <ArrowUp className="h-8 w-8" />, 
    color: "text-kid-green",
    bgColor: "bg-kid-green/10" 
  },
  { 
    name: "Learning Games", 
    icon: <Brain className="h-8 w-8" />, 
    color: "text-kid-blue",
    bgColor: "bg-kid-blue/10" 
  },
  { 
    name: "Quiet Time", 
    icon: <ArrowDown className="h-8 w-8" />, 
    color: "text-kid-pink",
    bgColor: "bg-kid-pink/10" 
  },
  { 
    name: "Group Play", 
    icon: <Users className="h-8 w-8" />, 
    color: "text-kid-yellow",
    bgColor: "bg-kid-yellow/10" 
  }
];

const CategoryCard: React.FC<CategoryProps> = ({ name, icon, color, bgColor }) => {
  const categoryUrl = `/results?category=${name.toLowerCase().replace(' ', '-')}`;
  
  return (
    <Link to={categoryUrl}>
      <Card 
        className="min-w-[180px] cursor-pointer transition-transform hover:scale-105 border-2 border-transparent hover:border-kid-purple/30"
      >
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <div className={`${bgColor} p-4 rounded-full ${color}`}>
            {icon}
          </div>
          <h3 className={`font-bold ${color}`}>{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

const CategoryCards: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-12">
      <div className="flex justify-center w-full">
        <ScrollArea className="max-w-3xl w-full">
          <div className="flex space-x-4 pb-4 px-1 justify-center">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="max-w-4xl w-full bg-kid-yellow/10 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-kid-yellow mb-3">Group Play Activities</h3>
        <p className="text-gray-700 mb-4">
          Discover fun activities perfect for playdates, parties, and family gatherings. 
          These games are designed to encourage teamwork and social skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold text-kid-yellow">Musical Chairs</h4>
            <p className="text-sm text-gray-600">Ages 4-10 • 15 minutes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold text-kid-yellow">Duck, Duck, Goose</h4>
            <p className="text-sm text-gray-600">Ages 3-8 • 10 minutes</p>
          </div>
        </div>
        <Link to="/results?category=group-play" className="inline-block mt-5 px-5 py-2 bg-kid-yellow text-white rounded-full font-medium hover:bg-kid-yellow/80 transition-colors">
          View All Group Games
        </Link>
      </div>
    </div>
  );
};

export default CategoryCards;
