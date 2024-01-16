const sqlite3 = require('sqlite3').verbose();

 
const db = new sqlite3.Database('quiz.db');


const initialQuestions = [
    {
        question: "What is the output of `'1' + 2 + 3` in JavaScript?",
        options: ["'123'", "'6'", "15", "Error"],
        correctAnswer: "'123'"
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["// comment", "<!-- comment -->", "# comment", "/* comment */"],
        correctAnswer: "// comment"
    },
    {
        question: "What will `console.log(typeof null)` output?",
        options: ["'null'", "'object'", "'undefined'", "'error'"],
        correctAnswer: "'object'"
    },
    {
        question: "How do you declare a constant in JavaScript?",
        options: ["var CONSTANT;", "const CONSTANT;", "let CONSTANT;", "CONSTANT = 0;"],
        correctAnswer: "const CONSTANT;"
    },
    {
        question: "What is the result of `'5' * 3` in JavaScript?",
        options: ["'53'", "15", "TypeError", "undefined"],
        correctAnswer: "15"
    },
    {
        question: "How do you convert a string to an integer in JavaScript?",
        options: ["toInt()", "Number()", "ParseInt()", "All of the above"],
        correctAnswer: "ParseInt()"
    },
    {
        question: "What does the `&&` operator do?",
        options: ["AND", "OR", "NOT", "XOR"],
        correctAnswer: "AND"
    },
    {
        question: "What does the `===` operator check?",
        options: ["Equality", "Type and value equality", "Both operands are true", "None of the above"],
        correctAnswer: "Type and value equality"
    },
    {
        question: "How do you create an array in JavaScript?",
        options: ["[]", "{}", "new Array()", "Both [] and new Array()"],
        correctAnswer: "Both [] and new Array()"
    },
    {
        question: "What is the use of the `isNaN` function?",
        options: ["Checks if a value is NaN", "Checks if a value is a number", "Converts a type to a number", "None of the above"],
        correctAnswer: "Checks if a value is NaN"
    },
    {
        question: "What does `0.1 + 0.2 === 0.3` evaluate to in JavaScript?",
        options: ["true", "false", "undefined", "NaN"],
        correctAnswer: "false"
    },
    {
        question: "What is a closure in JavaScript?",
        options: ["A function inside another function", "A loop", "An error", "A type of variable"],
        correctAnswer: "A function inside another function"
    },
    {
        question: "How do you add an element to the front of an array?",
        options: ["push()", "unshift()", "concat()", "splice()"],
        correctAnswer: "unshift()"
    },
    {
        question: "What method would you use to remove the last element from an array?",
        options: ["pop()", "push()", "shift()", "cut()"],
        correctAnswer: "pop()"
    },
    {
        question: "What is event bubbling in JavaScript?",
        options: ["A type of event handling", "An error in code", "A loop in events", "None of the above"],
        correctAnswer: "A type of event handling"
    },
    {
        question: "What is the difference between `let` and `var`?",
        options: ["Scope", "Hoisting", "Reassignment", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "How do you stop the default action of an event in JavaScript?",
        options: ["preventDefault()", "stopPropagation()", "stopDefault()", "pauseEvent()"],
        correctAnswer: "preventDefault()"
    },
    {
        question: "What is the purpose of the `Array.map()` method?",
        options: ["To loop over an array", "To modify each element in an array", "To check each element in an array", "To reduce an array"],
        correctAnswer: "To modify each element in an array"
    },
    {
        question: "What is the difference between `null` and `undefined` in JavaScript?",
        options: ["Type", "Value", "Both", "There is no difference"],
        correctAnswer: "Both"
    },
    {
        question: "How do you check if an object has a property in JavaScript?",
        options: ["hasOwnProperty()", "in operator", "isProperty()", "Both hasOwnProperty() and in operator"],
        correctAnswer: "Both hasOwnProperty() and in operator"
    },
    {
        question: "What will `console.log(1 < 2 < 3)` output?",
        options: ["true", "false", "undefined", "Error"],
        correctAnswer: "true"
    },
    {
        question: "What is a JavaScript Promise?",
        options: ["A data structure", "An async operation", "A loop", "A function"],
        correctAnswer: "An async operation"
    },
    {
        question: "What does `use strict` do in JavaScript?",
        options: ["Improves performance", "Enforces stricter parsing and error handling", "Encrypts the script", "None of the above"],
        correctAnswer: "Enforces stricter parsing and error handling"
    },
    {
        question: "How do you find the length of a string in JavaScript?",
        options: [".length()", ".size()", ".length", ".count()"],
        correctAnswer: ".length"
    },
    {
        question: "What is hoisting in JavaScript?",
        options: ["Raising functions to the top", "Raising variables to the top", "Both functions and variables are raised to the top", "None of the above"],
        correctAnswer: "Both functions and variables are raised to the top"
    },
    {
        question: "What is the output of `!!'false'` in JavaScript?",
        options: ["true", "false", "TypeError", "undefined"],
        correctAnswer: "true"
    },
    {
        question: "How do you round a number in JavaScript?",
        options: ["Math.round()", "Math.floor()", "Math.ceil()", "Number.round()"],
        correctAnswer: "Math.round()"
    },
    {
        question: "What is the difference between `==` and `===` in JavaScript?",
        options: ["Equality", "Type coercion", "Both compare values", "No difference"],
        correctAnswer: "Type coercion"
    },
    {
        question: "How do you generate a random number in JavaScript?",
        options: ["Math.random()", "random()", "Math.randomize()", "Number.random()"],
        correctAnswer: "Math.random()"
    },
    {
        question: "What is a JavaScript IIFE (Immediately Invoked Function Expression)?",
        options: [
            "A function that runs as soon as it is defined", 
            "A standard function declaration", 
            "A function that is executed after the script loads", 
            "A function declared with the `async` keyword"
        ],
        correctAnswer: "A function that runs as soon as it is defined"
    } 
     
];





initialQuestions.forEach(question => {
    const { question: qText, options, correctAnswer } = question;

    // Convert options array to a JSON string
    const optionsString = JSON.stringify(options);

    const query = 'INSERT INTO questionsJS (question, options, correctAnswer) VALUES (?, ?, ?)';

    db.run(query, [qText, optionsString, correctAnswer], function(err) {
        if (err) {
            console.error('Error inserting question:', err);
        } else {
            console.log(`Question inserted with ID: ${this.lastID}`);
        }
    });
});

db.close(err => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database closed successfully');
    }
});