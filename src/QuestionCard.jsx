// src/QuestionCard.jsx
import React from 'react';

export const QuestionCard = ({ question, onAnswer, selectedAnswer, showResult, isCorrect }) => {
    // 1. Seguridad
    if (!question) return <div className="loader">Cargando tarjeta...</div>;

    // 2. Definimos las posibles claves que usa la API
    const optionKeys = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6'];

    // Filtramos solo las claves que tienen texto en esta pregunta
    const validKeys = optionKeys.filter(key => question[key]);

    // 3. Estilos de botones (Semáforo)
    // Ahora comparamos CLAVES (ej: 'option1' === 'option1') en vez de textos
    // Dentro de QuestionCard.jsx
    const getButtonClass = (key) => {
        // La clase base ahora es 'btn-option'
        if (!showResult) return 'btn-option';

        if (key === selectedAnswer) {
            // Si es la elegida, se suma 'correct' o 'incorrect'
            return 'btn-option ' + (isCorrect ? 'correct' : 'incorrect');
        }
        return 'btn-option disabled';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Cabecera */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{
                    alignSelf: 'center',
                    background: '#dfe6e9',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#636e72',
                    marginBottom: '10px'
                }}>
                    {question.category || "General"}
                </span>

                <h2 style={{ textAlign: 'center', fontSize: '1.4rem', color: '#2d3436' }}>
                    {question.question}
                </h2>
            </div>

            {/* Opciones Verticales */}
            <div className="vertical-stack">
                {validKeys.map((key) => (
                    <button
                        key={key}
                        // --- EL CAMBIO CLAVE ESTÁ AQUÍ ---
                        // Enviamos la 'key' (ej: option1), NO el texto (question[key])
                        onClick={() => onAnswer(question.id, key)}
                        className={getButtonClass(key)}
                        disabled={showResult}
                    >
                        {/* Pero al usuario le mostramos el texto */}
                        {question[key]}
                    </button>
                ))}
            </div>
        </div>
    );
};