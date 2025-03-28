
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Gamepad2, Brain, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    icon: <Gamepad2 className="h-8 w-8" />, 
    color: "text-kid-yellow",
    bgColor: "bg-kid-yellow/10" 
  }
];

const CategoryCard: React.FC<CategoryProps> = ({ name, icon, color, bgColor }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="min-w-[180px] cursor-pointer transition-transform hover:scale-105 border-2 border-transparent hover:border-kid-purple/30"
      onClick={() => navigate(`/results?category=${name.toLowerCase().replace(' ', '-')}`)}
    >
      <CardContent className="p-6 flex flex-col items-center gap-3">
        <div className={`${bgColor} p-4 rounded-full ${color}`}>
          {icon}
        </div>
        <h3 className={`font-bold ${color}`}>{name}</h3>
      </CardContent>
    </Card>
  );
};

const CategoryCards: React.FC = () => {
  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4 px-1">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryCards;
