const BASE_URL = 'https://preguntados-api.vercel.app/api';

export const getDifficulties = async () => {
    try {
        const response = await fetch(`${BASE_URL}/difficulty`);
        if (!response.ok) throw new Error('Error fetching difficulties');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getQuestions = async (difficulty) => {
    try {
        const response = await fetch(`${BASE_URL}/questions?difficulty=${difficulty}`);
        if (!response.ok) throw new Error('Error fetching questions');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const checkAnswer = async (questionId, option) => {
    try {
        const response = await fetch(`${BASE_URL}/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId, option })
        });
        return await response.json();
    } catch (error) {
        console.error("Error checking answer:", error);
        return { answer: false };
    }
};