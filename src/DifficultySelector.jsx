import React, { useState, useEffect } from 'react';
import { getDifficulties } from './api.js';

export const DifficultySelector = ({ onSelect }) => {
    // 1. ESTADO: Aquí guardamos la lista que viene de la API
    const [difficulties, setDifficulties] = useState([]);

    // 2. EFECTO: Se ejecuta una sola vez al cargar el componente
    useEffect(() => {
        getDifficulties().then((data) => {
            setDifficulties(data); // Guardamos los datos en el estado
        });
    }, []); // El array vacío [] significa "solo al principio"

    return (
        <div>
            <h2>Selecciona una dificultad:</h2>
            {/* 3. RENDERIZADO: Convertimos la lista de textos en botones */}
            {difficulties.map((diff) => (
                <button
                    key={diff}
                    onClick={() => onSelect(diff)} // Avisamos al padre que eligieron uno
                    style={{ margin: '5px', padding: '10px' }}
                >
                    {diff}
                </button>
            ))}
        </div>
    );
};