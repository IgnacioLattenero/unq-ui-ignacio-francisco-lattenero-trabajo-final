import React from 'react';

export const QuestionCard = ({ question, onAnswer, selectedAnswer, showResult, isCorrect }) => {

    if (!question) return <div className="loader">Cargando tarjeta...</div>;


    const optionKeys = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6'];


    const validKeys = optionKeys.filter(key => question[key]);


    const getButtonClass = (key) => {

        if (!showResult) return 'btn-option';

        if (key === selectedAnswer) {

            return 'btn-option ' + (isCorrect ? 'correct' : 'incorrect');
        }
        return 'btn-option disabled';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

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


            <div className="vertical-stack">
                {validKeys.map((key) => (
                    <button
                        key={key}

                        onClick={() => onAnswer(question.id, key)}
                        className={getButtonClass(key)}
                        disabled={showResult}
                    >

                        {question[key]}
                    </button>
                ))}
            </div>
        </div>
    );
};