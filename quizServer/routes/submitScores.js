const express = require('express');
const SubmitScoresJSRouter = express.Router();
const SubmitScoreEthRouter = express.Router();
const sqlite3 = require('sqlite3');
const statDb = new sqlite3.Database('./user.db');


SubmitScoresJSRouter.post('/submitScoresJS', (req, res) =>{
    
    if(!req.user || req.user.id){
        return res.status(401).send('User is not authenticated');
    }
    
    const userId = req.user.id;
    const { newScore, newAverage,} = req.body;

    statDb.run('UPDATE userStat SET js_stats = ? , average_stat = ? WHERE userId = ?',[newScore, newAverage, userId], (error) => {
        if(error){
            console.error('Error updating database', error);
            res.status(500).send('An error occured');
            return;
        }
        res.send({message: 'Score successfully updated'});
    });
});

SubmitScoreEthRouter.post('/submitScoresEth', (req, res) => {

    const {newScore, newAverage,} = req.body;

    statDb.run('INSERT')
})


module.exports = {
    SubmitScoresJSRouter,
    SubmitScoreEthRouter,
}