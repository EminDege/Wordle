import React, { useState, useEffect } from 'react';
import './App.css';
import WordleGame from './components/WordleGame';
import words from './components/words.json';

function App() {
  const [selectedWord, setSelectedWord] = useState('ELMAS');

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord.toUpperCase());
  }, []);

  return (
    <div className="app">
      <WordleGame selectedWord={selectedWord} />
    </div>
  );
}

export default App;

