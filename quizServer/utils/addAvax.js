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
    {
        qText:'If Avalanche was a superhero, what would be its superpower?',
        options: ["A) Flying"," B) Invisibility" ," C) High throughput and low latency"," D) Time travel"],
        correctAnswer: 'C) High throughput and low latency',
    },
    
    {
        qText:'What kind of consensus does the Avalanche network prefer at its parties?',
        options: ["A) Proof of Work"," B) Proof of Stake", "C) Avalanche Consensus Protocol"," D) Consensus on pizza toppings"],
        correctAnswer: 'C) Avalanche Consensus Protocol',
    },
    
    {
        qText:'If the Avalanche network were an animal, what would it be?',
        options: ["A) A sloth"," B) A cheetah"," C) A penguin" ," D) An avalanche leopard"],
        correctAnswer: 'B) A cheetah',
    },
    
    {
        qText:'Which chain on the Avalanche network is a matchmaker for Ethereum applications?',
        options: ["A) X-Chain"," B) P-Chain"," C) C-Chain"," D) Love Chain"],
        correctAnswer: 'C) C-Chain',
    },
    
    {
        qText:'What’s the native token of Avalanche that sounds like a winter sports enthusiast’s favorite?',
        options: ["A) Snow"," B) Ski"," C) AVAX"," D) Ice"],
        correctAnswer: 'C) AVAX',
    },
    
    {
        qText:'In the Avalanche ecosystem, who does the coordination and doesn’t let anyone fall out of line?',
        options: ["A) X-Chain"," B) P-Chain"," C) C-Chain"," D) The blockchain sheriff"],
        correctAnswer: 'B) P-Chain',
    },
    
    {
        qText:'What would the Avalanche blockchain be voted as in a high school yearbook?',
        options: ["A) Most likely to succeed"," B) Class clown"," C) Best all-rounder"," D) Prom King"],
        correctAnswer: 'C) Best all-rounder',
    },
    
    {
        qText:'If AVAX were to sponsor a sports team, which sport would it be most suited for?',
        options: ["A) Chess"," B) Golf"," C) Formula 1"," D) Slow-pitch softball"],
        correctAnswer: 'C) Formula 1',
    },
    
    {
        qText:'Where do old and tired smart contracts go to retire?',
        options: ["A) Florida"," B) The Ethereum blockchain"," C) The C-Chain on Avalanche"," D) A nice farm upstate"],
        correctAnswer: 'C) The C-Chain on Avalanche',
    },   
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
