
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import { Gamepad2, Clock } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-kid-purple via-kid-blue to-kid-green text-transparent bg-clip-text">
            Find the Perfect Game for Your Child
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter your child's age and available time, and we'll suggest fun activities with video guides!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="bg-gradient-to-br from-kid-purple/20 to-kid-blue/20 rounded-2xl p-6 flex items-center gap-4 max-w-sm">
            <div className="bg-kid-purple/20 p-4 rounded-full">
              <Gamepad2 className="h-8 w-8 text-kid-purple" />
            </div>
            <div>
              <h3 className="font-bold text-kid-purple">Kid-Friendly Games</h3>
              <p className="text-sm text-muted-foreground">Age-appropriate activities your kids will love</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-kid-blue/20 to-kid-green/20 rounded-2xl p-6 flex items-center gap-4 max-w-sm">
            <div className="bg-kid-blue/20 p-4 rounded-full">
              <Clock className="h-8 w-8 text-kid-blue" />
            </div>
            <div>
              <h3 className="font-bold text-kid-blue">Time-Based Suggestions</h3>
              <p className="text-sm text-muted-foreground">Perfect for 5-minute breaks or longer play sessions</p>
            </div>
          </div>
        </div>
        
        <SearchForm />
      </main>
    </div>
  );
};

export default Index;
