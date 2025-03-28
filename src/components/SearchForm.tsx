
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { CalendarClock, Search } from 'lucide-react';

const SearchForm: React.FC = () => {
  const [age, setAge] = useState<number>(4);
  const [availableTime, setAvailableTime] = useState<number>(15);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (age < 1 || age > 12) {
      toast.error("Please enter an age between 1 and 12");
      return;
    }

    if (availableTime < 5 || availableTime > 60) {
      toast.error("Available time should be between 5 and 60 minutes");
      return;
    }

    navigate(`/results?age=${age}&time=${availableTime}`);
  };

  return (
    <form onSubmit={handleSubmit} className="kid-card max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="age" className="flex items-center gap-2 text-lg font-semibold text-kid-purple">
            <span className="text-2xl">👶</span> Child's Age (1-12)
          </label>
          <Input
            id="age"
            type="number"
            min={1}
            max={12}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="rounded-xl text-lg"
            placeholder="Enter age (1-12)"
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-lg font-semibold text-kid-blue">
            <CalendarClock className="h-6 w-6" /> Available Time: {availableTime} minutes
          </label>
          <div className="px-3">
            <Slider
              defaultValue={[15]}
              max={60}
              min={5}
              step={5}
              onValueChange={(values) => setAvailableTime(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>5 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>
        </div>

        <Button type="submit" className="kid-button w-full bg-gradient-to-r from-kid-purple to-kid-blue text-lg py-6">
          <Search className="mr-2 h-5 w-5" /> Find Fun Games
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
