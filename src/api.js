// src/services/api.js

const BASE_URL = 'https://preguntados-api.vercel.app/api';

export const getDifficulties = async () => {
    try {
        const response = await fetch(`${BASE_URL}/difficulty`);

        // Si la respuesta no es OK (ej: error 404 o 500), lanzamos error
        if (!response.ok) {
            throw new Error('Error al obtener dificultades');
        }

        const data = await response.json();
        return data; // Esto devolverá algo como ["Easy", "Medium", "Hard"]
    } catch (error) {
        console.error(error);
        return []; // Retornamos array vacío para que la app no explote
    }
};


export const getQuestions = async (difficulty) => {
    try {
        // Usamos comillas invertidas `` para insertar la variable difficulty en la URL
        const response = await fetch(`${BASE_URL}/questions?difficulty=${difficulty}`);

        if (!response.ok) {
            throw new Error('Error al obtener preguntas');
        }

        const data = await response.json();
        return data; // Devuelve la lista de preguntas
    } catch (error) {
        console.error(error);
        return [];
    }
};