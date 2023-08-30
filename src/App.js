import React, { useState } from 'react';
import './App.css';
import WordleGame from './components/WordleGame';
import Keyboard from './components/keyboard.js';
import WordleBoard from './components/wordleBoard.js';

function App() {
  const [typedWord, setTypedWord] = useState('');

  const handleKeyPress = (key) => {
    // Eğer tuş boşluk ise, yazılan kelimeyi sıfırla
    if (key === 'Sıfırla') {
      setTypedWord('');
    } else {
      setTypedWord((prevWord) => prevWord + key);
    }
  };

  const keyboardKeys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'ü',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'i',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'Sıfırla'
  ];

  return (
    <div className="app">
      <WordleGame />
      <WordleBoard />
      <Keyboard keys={keyboardKeys} onKeyPress={handleKeyPress} />
      <p>Yazılan Kelime: {typedWord}</p>
    </div>
  );
}

export default App;
