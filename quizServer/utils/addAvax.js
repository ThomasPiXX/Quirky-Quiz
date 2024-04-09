const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../quiz.db');

/*const sql =  `CREATE TABLE questionAVAX (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correctAnswer TEXT NOT NULL);`



db.run(sql, function(err) {
    if(err){
        console.error('error modifying the column', err);
    }else{
        console.log('column has been modified correctly');
    }
});

db.close();
*/



const initialQuestions = [
    


]


addquestion =() =>{

    initialQuestions.forEach(question => {
        const {qText, options, correctAnswer } = question;
    
        const optionsString = JSON.stringify(options);
    
        const query = 'INSERT INTO questionAVAX (question, options, correctAnswer) VALUES (?, ?, ?)';
    
        db.run(query, [qText, optionsString, correctAnswer], function(err){
            if(err) {
                console.error('Error inserting question:', err);
            } else {
                console.log(`Question inserted with ID: ${this.lastID}`);
            } 
        });
    });
}


addquestion();
