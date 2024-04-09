const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../quiz.db');






const initialQuestions = [
    {
        qText: '',
        options: '',
        correctAnswer: '',
    },
]

initialQuestions.forEach(question => {
    const { qText, options, correctAnswer } = question;

    // Convert options array to a JSON string
    const optionsString = JSON.stringify(options);

    const query = 'INSERT INTO questionETH (question, options, correctAnswer) VALUES (?, ?, ?)';

    db.run(query, [qText, optionsString, correctAnswer], function(err) {
        if (err) {
            console.error('Error inserting question:', err);
        } else {
            console.log(`Question inserted with ID: ${this.lastID}`);
        }
    });
});