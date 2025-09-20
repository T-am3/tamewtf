import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../components/ScrollAnimation';

const NotFound: React.FC = () => {
  const messages = [
    "where are you going? there's nothing here.",
    "this page seems to have sudo rm -rf'd itself.",
    "hmm, that page doesn't seem to exist.",
    "you've discovered a secret page... just kidding, it's a 404.",
    "i forgor where this page went.",
    "well, this is awkward.",    
    "this link appears to be broken or moved."
  ];

  const [currentMessage] = useState(() => Math.floor(Math.random() * messages.length));

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <ScrollAnimation delay={200} threshold={0.1}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-8 glass rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-white mb-4">page not found</h1>
          <p className="text-gray-300 mb-8 leading-relaxed min-h-[3rem] flex items-center justify-center">
            {messages[currentMessage]}
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            go home
          </Link>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default NotFound;