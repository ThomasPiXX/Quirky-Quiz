const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../quiz.db');






const initialQuestions = [
    {
        question: "Which Ethereum client software was named after a mythological figure known for his agility and cunning?",
        options: ["Zeus", "Hercules", "Odysseus", "Parity"],
        correctAnswer: "Parity"
        },
        {
        question: "What does the term 'gas' refer to in the context of Ethereum smart contracts?",
        options: ["Fuel for mining Ethereum", "A unit of cryptocurrency", "The cost of computational resources required to execute a transaction or smart contract", "The Ethereum network's mascot"],
        correctAnswer: "The cost of computational resources required to execute a transaction or smart contract"
        },
        {
        question: "In Ethereum's Solidity programming language, what does the 'pragma' statement do?",
        options: ["Imports external libraries", "Specifies the version of the Solidity compiler to be used", "Defines the contract's visibility", "Declares global variables"],
        correctAnswer: "Specifies the version of the Solidity compiler to be used"
        },
        {
        question: "Which Ethereum test network is often humorously referred to as 'Ropsten'?",
        options: ["Testnet 1", "Testnet 2", "Testnet 3", "Testnet 4"],
        correctAnswer: "Testnet 3"
        },
        {
        question: "What is the term for a piece of code deployed on the Ethereum blockchain that can be interacted with by sending transactions?",
        options: ["Smart Contract", "Ethereum Script", "Ether Code", "Blockchain App"],
        correctAnswer: "Smart Contract"
        },
        {
        question: "What does the term 'immutable' mean in the context of Ethereum smart contracts?",
        options: ["They can only be executed once", "They cannot be modified or deleted after deployment", "They are resistant to hacking attempts", "They are highly scalable"],
        correctAnswer: "They cannot be modified or deleted after deployment"
        },
        {
        question: "In Ethereum development, what is the purpose of the 'web3.js' library?",
        options: ["To create web interfaces for smart contracts", "To securely store private keys", "To optimize gas usage in smart contracts", "To mine Ethereum efficiently"],
        correctAnswer: "To create web interfaces for smart contracts"
        },
        {
        question: "What is the name of the Ethereum virtual machine (EVM) instruction that transfers ether from one account to another?",
        options: ["EVM_SEND", "EVM_MOVE", "EVM_TRANSFER", "EVM_CALL"],
        correctAnswer: "EVM_CALL"
        },
        {
        question: "What is the primary purpose of the 'fallback' function in an Ethereum smart contract?",
        options: ["To handle transactions with invalid data", "To revert transactions with insufficient gas", "To receive ether or perform actions when a contract receives ether but no other function matches the provided function signature", "To execute by default when no other function matches the provided function signature"],
        correctAnswer: "To execute by default when no other function matches the provided function signature"
        },
        {
        question: "What does the term 'ERC' stand for in the context of Ethereum Improvement Proposals (EIPs)?",
        options: ["Ethereum Request Code", "Ethereum Resource Center", "Ethereum Research Committee", "Ethereum Request for Comments"],
        correctAnswer: "Ethereum Request for Comments"
        },
]

initialQuestions.forEach(question => {
    const { question: qText, options, correctAnswer } = question;

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