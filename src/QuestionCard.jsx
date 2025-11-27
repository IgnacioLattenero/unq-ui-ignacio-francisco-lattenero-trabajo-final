// src/components/QuestionCard.jsx (o donde lo tengas guardado)
import React from 'react';

export const QuestionCard = ({ question, onAnswer }) => {
    // Si la pregunta no existe todavía, mostramos un mensaje para evitar error
    if (!question) return <div>Cargando...</div>;

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '500px', margin: '0 auto' }}>

            {/* Categoría */}
            <h3 style={{ color: '#666' }}>{question.category || "General"}</h3>

            {/* CORRECCIÓN 1: Usamos .question en lugar de .text */}
            <h2 style={{ fontSize: '1.2rem' }}>{question.question}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                {/* CORRECCIÓN 2: Agregamos '?' antes del .map para seguridad */}
                {question.options?.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(question.id, option)}
                        style={{ padding: '15px', cursor: 'pointer' }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};