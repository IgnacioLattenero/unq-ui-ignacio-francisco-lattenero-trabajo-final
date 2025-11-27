// src/App.jsx
import React, { useState } from 'react';
import { DifficultySelector } from './DifficultySelector';
import { QuestionCard } from './QuestionCard';
import { getQuestions, checkAnswer } from './api';

function App() {
    // ESTADOS
    const [gameStatus, setGameStatus] = useState('MENU'); // MENU | PLAYING | GAME_OVER | WIN
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    // ESTADOS VISUALES (Para el color verde/rojo)
    const [isThinking, setIsThinking] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // 1. INICIAR JUEGO
    const handleStartGame = async (difficulty) => {
        setGameStatus('LOADING');
        try {
            const questionsData = await getQuestions(difficulty);
            setQuestions(questionsData);
            setCurrentQuestionIndex(0); // Empezamos en la 0
            setScore(0);
            setGameStatus('PLAYING');
        } catch (error) {
            console.error(error);
            setGameStatus('MENU');
        }
    };

    // 2. MANEJO DE RESPUESTA (Lógica Muerte Súbita)
    const handleAnswer = async (questionId, selectedOption) => {
        if (isThinking) return; // Evita doble click
        setIsThinking(true);
        setSelectedAnswer(selectedOption);

        try {
            // Validamos con la API
            const result = await checkAnswer(questionId, selectedOption);
            setIsCorrect(result.answer); // true o false

            // Esperamos 1.5 segundos viendo el color
            setTimeout(() => {
                if (result.answer === true) {
                    // --- SI ES CORRECTA: SIGUE JUGANDO ---
                    setScore(prev => prev + 1);

                    const nextIndex = currentQuestionIndex + 1;
                    if (nextIndex < questions.length) {
                        setCurrentQuestionIndex(nextIndex);
                        // Reseteamos visuales para la siguiente
                        setSelectedAnswer(null);
                        setIsCorrect(null);
                        setIsThinking(false);
                    } else {
                        // Si respondiste BIEN todas
                        setGameStatus('WIN');
                        setIsThinking(false);
                    }

                } else {
                    // --- SI ES INCORRECTA: PERDISTE (A CASA) ---
                    setGameStatus('GAME_OVER');
                    setIsThinking(false);
                }
            }, 1500);

        } catch (error) {
            console.error("Error API:", error);
            setIsThinking(false);
        }
    };

    // 3. VOLVER AL INICIO
    const resetGame = () => {
        setGameStatus('MENU');
        setQuestions([]);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    return (
        <div className="app-container">
            {/* CABECERA FIJA */}
            <div className="header">
                <h1>Preguntados UNQ</h1>
                {gameStatus === 'PLAYING' && (
                    <div className="score-tag">Racha: {score}</div>
                )}
            </div>

            {/* --- PANTALLA 1: MENU --- */}
            {gameStatus === 'MENU' && (
                <DifficultySelector onSelect={handleStartGame} />
            )}

            {/* --- PANTALLA 2: CARGANDO --- */}
            {gameStatus === 'LOADING' && <div className="loader">Buscando preguntas...</div>}

            {/* --- PANTALLA 3: JUEGO --- */}
            {gameStatus === 'PLAYING' && questions.length > 0 && (
                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    showResult={isThinking}
                    selectedAnswer={selectedAnswer}
                    isCorrect={isCorrect}
                />
            )}

            {/* --- PANTALLA 4: PERDISTE (GAME OVER) --- */}
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

            {/* --- PANTALLA 5: GANASTE TODO --- */}
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