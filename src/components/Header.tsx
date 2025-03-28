
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import ApiKeyInput from './ApiKeyInput';

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-3">
          <Gamepad2 className="h-10 w-10 text-kid-purple animate-bounce" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-kid-purple via-kid-blue to-kid-green text-transparent bg-clip-text">
            KidPlay Time
          </h1>
        </Link>
        <div>
          <ApiKeyInput />
        </div>
      </div>
    </header>
  );
};

export default Header;
