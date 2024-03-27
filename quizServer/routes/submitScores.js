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

    statDb.run('UPDATE userStat SET js_stats = ? , average_stat = ? WHERE userID = ?',[newScore, newAverage, userId], (error) => {
        if(error){
            console.error('Error updating database JS Score', error);
            res.status(500).send('An error occured while updating JS stats');
            return;
        }
        res.send({message: 'JS Score successfully updated :) '});
    });
});

SubmitScoreEthRouter.post('/submitScoresEth', (req, res) => {

    if(!req.user || req.user.id){
        return  res.status(401).send('User not authenticated');
    }
        const userId = req.user.id;
        const { newScore, newAverage } = req.body;
        
        statDb.run('UPDATE userStat SET eth_stats = ?, average_stat = ? WHERE userID = ?', [newScore, newAverage, userId], (error) => {
            if(error){
                console.error('Error updating database with eth score', error);
                res.status(500).send('An error occured whil updating Eth stats');
                return;
            }
            res.sendStatus({message: 'Eth scores  successfully updated :)'});
        });
})


module.exports = {
    SubmitScoresJSRouter,
    SubmitScoreEthRouter,
}
