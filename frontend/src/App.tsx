import React from 'react';
import Fact from './components/Fact';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Fact />
    </div>
  );
};

export default App;
