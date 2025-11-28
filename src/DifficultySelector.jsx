import React, { useState, useEffect } from 'react';
import { getDifficulties } from './api.js';

export const DifficultySelector = ({ onSelect }) => {

    const [difficulties, setDifficulties] = useState([]);


    useEffect(() => {
        getDifficulties().then((data) => {
            setDifficulties(data);
        });
    }, []);

    return (
        <div>
            <h2>Selecciona una dificultad:</h2>

            {difficulties.map((diff) => (
                <button
                    key={diff}
                    onClick={() => onSelect(diff)}
                    style={{ margin: '5px', padding: '10px' }}
                    className="btn-difficulty"
                >
                    {diff}
                </button>
            ))}
        </div>
    );
};