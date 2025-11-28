import React, { useState } from 'react';
import { DifficultySelector } from './DifficultySelector';
import { QuestionCard } from './QuestionCard';
import { getQuestions, checkAnswer } from './api';

function App() {

    const [gameStatus, setGameStatus] = useState('MENU');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const [isThinking, setIsThinking] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleStartGame = async (difficulty) => {
        setGameStatus('LOADING');
        try {
            const questionsData = await getQuestions(difficulty);
            setQuestions(questionsData);
            setCurrentQuestionIndex(0);
            setScore(0);
            setGameStatus('PLAYING');
        } catch (error) {
            console.error(error);
            setGameStatus('MENU');
        }
    };

    const handleAnswer = async (questionId, selectedOption) => {
        if (isThinking) return;
        setIsThinking(true);
        setSelectedAnswer(selectedOption);

        try {
            const result = await checkAnswer(questionId, selectedOption);
            setIsCorrect(result.answer);

            setTimeout(() => {
                if (result.answer === true) {
                    setScore(prev => prev + 1);

                    const nextIndex = currentQuestionIndex + 1;
                    if (nextIndex < questions.length) {
                        setCurrentQuestionIndex(nextIndex);
                        setSelectedAnswer(null);
                        setIsCorrect(null);
                        setIsThinking(false);
                    } else {

                        setGameStatus('WIN');
                        setIsThinking(false);
                    }

                } else {

                    setGameStatus('GAME_OVER');
                    setIsThinking(false);
                }
            }, 1500);

        } catch (error) {
            console.error("Error API:", error);
            setIsThinking(false);
        }
    };


    const resetGame = () => {
        setGameStatus('MENU');
        setQuestions([]);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    return (
        <div className="app-container">
            <div className="header">
                <h1>Preguntados</h1>
                {gameStatus === 'PLAYING' && (
                    <div className="score-tag">Racha: {score}</div>
                )}
            </div>

            {gameStatus === 'MENU' && (
                <DifficultySelector onSelect={handleStartGame} />
            )}

            {gameStatus === 'LOADING' && <div className="loader">Buscando preguntas...</div>}


            {gameStatus === 'PLAYING' && questions.length > 0 && (
                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    showResult={isThinking}
                    selectedAnswer={selectedAnswer}
                    isCorrect={isCorrect}
                />
            )}

            {gameStatus === 'GAME_OVER' && (
                <div className="result-screen lose">
                    <h2>❌ ¡Respuesta Incorrecta!</h2>
                    <p>La respuesta correcta era otra.</p>
                    <div className="final-score">Racha Final: {score}</div>
                    <button onClick={resetGame} className="btn-restart">
                        Volver a Intentar
                    </button>
                </div>
            )}


            {gameStatus === 'WIN' && (
                <div className="result-screen win">
                    <h2>🏆 ¡Completaste el juego!</h2>
                    <p>¡Eres un genio!</p>
                    <div className="final-score">Puntaje Perfecto: {score}</div>
                    <button onClick={resetGame} className="btn-action">
                        Jugar Otra Vez
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;