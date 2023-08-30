import React, { useState } from 'react';
import './wordleBoard.css'; // Stil dosyası

const WordleBoard = () => {
  const [word, setWord] = useState('apple'); // Rastgele seçilen kelime

  const [guesses, setGuesses] = useState(['', '', '', '', '', '']); // Tahminlerin tutulduğu dizi

  const handleGuessChange = (event, index) => {
    const newGuesses = [...guesses];
    newGuesses[index] = event.target.value;
    setGuesses(newGuesses);
  };

  return (
    <div className="wordle-board">
      <div className="guesses">
        {guesses.map((guess, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={guess}
            onChange={(event) => handleGuessChange(event, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WordleBoard;
