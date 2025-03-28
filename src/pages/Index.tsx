
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Gamepad2, Clock, Brain, ArrowDown, ArrowUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import CategoryCards from '../components/CategoryCards';
import FeaturedGame from '../components/FeaturedGame';
import BedtimeStories from '../components/BedtimeStories';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const [age, setAge] = useState<number>(6);
  const [selectedTime, setSelectedTime] = useState<number>(15);
  const navigate = useNavigate();

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    navigate(`/results?age=${age}&time=${selectedTime}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pb-12 space-y-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-kid-purple via-kid-blue to-kid-green text-transparent bg-clip-text">
            Find the Perfect Game
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized activities for your child
          </p>
        </div>

        {/* Featured Game of the Day */}
        <FeaturedGame />

        {/* Game Finder Section */}
        <section className="max-w-3xl mx-auto">
          <div className="kid-card">
            <h2 className="text-2xl font-bold text-center mb-6 text-kid-purple">
              Quick Search
            </h2>
            
            <div className="space-y-8">
              {/* Age Slider */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-semibold text-kid-blue">
                  <span className="text-2xl">👶</span> Child's Age: {age} years
                </label>
                <div className="px-3 pt-2">
                  <Slider
                    value={[age]}
                    max={12}
                    min={1}
                    step={1}
                    onValueChange={(values) => setAge(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <div className="flex flex-col items-center">
                      <span>1</span>
                      <span className="text-xl">👶</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span>6</span>
                      <span className="text-xl">👧</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span>12</span>
                      <span className="text-xl">🧒</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Selector Chips */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-semibold text-kid-blue">
                  <Clock className="h-6 w-6" /> Available Time
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[5, 15, 30, 60].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`rounded-full py-2 px-1 font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-kid-blue text-white shadow-md transform scale-105'
                          : 'bg-white border-2 border-kid-blue/30 text-kid-blue hover:bg-kid-blue/10'
                      }`}
                    >
                      {time} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSubmit}
                className="kid-button w-full bg-gradient-to-r from-kid-purple to-kid-blue text-lg py-6"
              >
                Find Games
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-center mb-6 text-kid-purple">
            Browse by Category
          </h2>
          <CategoryCards />
        </section>
        
        {/* Bedtime Stories Section */}
        <BedtimeStories />
      </main>
    </div>
  );
};

export default Index;
