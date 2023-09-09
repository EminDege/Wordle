import React, { useEffect, useState } from 'react';
import './WordleGame.css';

const WordleGame = () => {
    const [userGuess, setUserGuess] = useState('');
    const [selectedWord, setSelectedWord] = useState('ELMAS');
    const [feedback, setFeedback] = useState(Array(selectedWord.length).fill('gray'));
    const [answer, setAnswer] = useState(Array(6).fill({ guess: ['', '', '', '', ''], feedback: Array(selectedWord.length) }));
    const [currentRow, setCurrentRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameMessage, setGameMessage] = useState('');
    const [typedWord, setTypedWord] = useState('');


    //klavye renk değişimini çözmeye çalışıyorum.adwdaw

    const handleKeyPress = (key) => {
        if (key === 'Sıfırla') {
            setTypedWord('');
        }
        else if (key === 'Enter') {
            handleCheckGuess();
        }
        else {
            setTypedWord((prevWord) => prevWord + key);
        }
    };

    const keyboardKeys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ', 'Enter',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'Sıfırla'
    ];
    const [keyboardKeyColors, setKeyboardKeyColors] = useState(keyboardKeys.map(() => '#007bff'));

    const handleGameOver = (message) => {
        setGameOver(true);
        setGameMessage(message);
    };

    const handleGuessChange = (event, index) => {
        if (gameOver) return;

        const newGuesses = [...answer[currentRow].guess];
        const inputText = event.target.value.toUpperCase();

        if (inputText.length === 1) {
            newGuesses[index] = inputText;
        } else {
            newGuesses[index] = '';
        }

        setUserGuess(inputText);
    };

    const handleCheckGuess = () => {
        if (gameOver) return;

        if (userGuess.length !== 5) {
            alert('5 harfli bir tahmin yapmalısınız.');
            return;
        }

        const correctLetters = [];
        const correctPositions = [];

        for (let i = 0; i < selectedWord.length; i++) {
            if (userGuess[i] === selectedWord[i]) {
                correctPositions.push(i);
            } else if (selectedWord.includes(userGuess[i])) {
                correctLetters.push(i);
            }
        }

        const feedbackArray = Array(selectedWord.length).fill('gray');

        const newKeyColors = [...keyboardKeyColors];
        correctPositions.forEach((index) => {
            feedbackArray[index] = 'green';
            const keyIndex = keyboardKeys.indexOf(userGuess[index]);
            if (keyIndex !== -1) {
                newKeyColors[keyIndex] = 'green';
            }
        });
        correctLetters.forEach((index) => {
            feedbackArray[index] = 'yellow';
            const keyIndex = keyboardKeys.indexOf(userGuess[index]);
            if (keyIndex !== -1) {
                newKeyColors[keyIndex] = 'yellow';
            }
        });
        userGuess.split('').forEach((guess, index) => {
            if (selectedWord.indexOf(guess) === -1) {
                const keyIndex = keyboardKeys.indexOf(guess);
                if (keyIndex !== -1) {
                    newKeyColors[keyIndex] = 'gray';
                }
            }
        });
        setKeyboardKeyColors(newKeyColors);

        setFeedback(feedbackArray);

        const newAnswer = [...answer];
        newAnswer[currentRow] = { guess: [...userGuess], feedback: feedbackArray };
        setAnswer(newAnswer);

        if (userGuess === selectedWord) {
            handleGameOver('Kazandınız');
        } else if (currentRow + 1 >= answer.length) {
            handleGameOver(`Başaramadın... Doğru cevap ${selectedWord}`);
        } else {
            setCurrentRow(currentRow + 1);
        }

        setUserGuess('');
        setTypedWord('');
    };

    useEffect(() => {
        if (typedWord.length <= selectedWord.length) {
            setTypedWord(userGuess);
        }
    }, [userGuess]);
    useEffect(() => {
        if (typedWord.length <= selectedWord.length) {
            setUserGuess(typedWord);
        }
    }, [typedWord]);


    return (
        <div className="wordle-game">
            <h1>Wordle Game</h1>
            <p>Guess the word of {selectedWord.length} letters</p>
            <input
                className="input2"
                type="text"
                value={userGuess}
                onChange={(event) => handleGuessChange(event, 0)}
                maxLength={selectedWord.length}
                style={{ textTransform: 'uppercase' }}
                disabled={gameOver}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleCheckGuess();
                    }
                }}
            />
            <button onClick={handleCheckGuess} disabled={gameOver}>Check Guess</button>

            <div className="wordle-board">
                {answer.map((row, rowIndex) => (
                    <div key={rowIndex} className="guesses">
                        {row.guess.map((guess, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={guess}
                                onChange={(event) => handleGuessChange(event, index)}
                                style={{ backgroundColor: row.feedback[index] }}
                            />
                        ))}
                    </div>
                ))}
                {gameOver && (
                    <div className="game-message">
                        {gameMessage}
                    </div>
                )}
            </div>


            <div className="keyboard" style={{ maxWidth: "650px", margin: "auto" }}>
                {keyboardKeys.map((key, index) => (
                    <button
                        key={index}
                        onClick={() => handleKeyPress(key)}
                        style={{ backgroundColor: keyboardKeyColors[index] }}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WordleGame;
