import React, { useState } from 'react';
import './WordleGame.css';

const WordleGame = () => {
    const [selectedWord, setSelectedWord] = useState('apple');
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleGuessChange = (event) => {
        setUserGuess(event.target.value);
    };

    const handleCheckGuess = () => {
        const correctLetters = [];
        for (let i = 0; i < selectedWord.length; i++) {
            if (userGuess.includes(selectedWord[i])) {
                if (userGuess[i] === selectedWord[i]) {
                    correctLetters.push('green');
                } else {
                    correctLetters.push('yellow');
                }
            } else {
                correctLetters.push('red');
            }
        }
        setFeedback(correctLetters.join(' '));
    };

    return (
        <div className="wordle-game">
            <h1>Wordle Game</h1>
            <p>Guess the word of {selectedWord.length} letters</p>
            <input
                type="text"
                value={userGuess}
                onChange={handleGuessChange}
                maxLength={selectedWord.length}
            />
            <button onClick={handleCheckGuess}>Check Guess</button>
            <div className="feedback">
                {feedback.split(' ').map((color, index) => (
                    <div key={index} className={`feedback-circle ${color}`}></div>
                ))}
            </div>
        </div>
    );
};

export default WordleGame;
