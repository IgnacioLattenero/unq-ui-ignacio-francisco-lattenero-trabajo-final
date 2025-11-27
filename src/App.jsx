// src/App.jsx
import React, { useState } from 'react';

// CORRECCIÓN SEGÚN TU FOTO:
// 1. DifficultySelector SÍ está dentro de la carpeta components
import { DifficultySelector } from './DifficultySelector';

// 2. api.js está SUELTO en src (al lado de App), no en services
import { getQuestions } from './api';

// 3. QuestionCard.jsx está SUELTO en src, no en components
import { QuestionCard } from './QuestionCard';

function App() {
    const [gameStatus, setGameStatus] = useState('MENU');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleStartGame = async (difficulty) => {
        setGameStatus('LOADING');
        try {
            const questionsData = await getQuestions(difficulty);
            setQuestions(questionsData);
            setCurrentQuestionIndex(0);
            setGameStatus('PLAYING');
        } catch (error) {
            console.error("Error iniciando:", error);
            setGameStatus('MENU');
        }
    };

    const handleAnswer = (questionId, selectedOption) => {
        // Lógica simple para pasar de pregunta
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            alert("¡Fin del juego!");
            setGameStatus('MENU');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h1>Preguntados UNQ</h1>

            {gameStatus === 'MENU' && <DifficultySelector onSelect={handleStartGame} />}

            {gameStatus === 'LOADING' && <h2>Cargando... ⏳</h2>}

            {gameStatus === 'PLAYING' && questions.length > 0 && (
                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
}

export default App;