const express = require('express');
const SubmitScoresJSRouter = express.Router();
const SubmitScoreEthRouter = express.Router();
const SubmitScoreAvaxRouter = express.Router();
const sqlite3 = require('sqlite3');
const statDb = new sqlite3.Database('./user.db');


SubmitScoresJSRouter.post('/submitScoresJS', (req, res) =>{
    
    console.log('submit js score route hit');
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

    console.log('submitScoreEth route hit');
        const userId = req.user.id;
        const { newScore, newAverage } = req.body;
        
        statDb.run('UPDATE userStat SET eth_stats = ?, average_stat = ? WHERE userID = ?', [newScore, newAverage, userId], (error) => {
            if(error){
                console.error('Error updating database with eth score', error);
                res.status(500).send('An error occured whil updating Eth stats');
                return;
            }
            res.send({message: 'Eth scores  successfully updated :)'});
        });
})

SubmitScoreAvaxRouter.post('/submitScoreAvax', (req, res) => {
    console.log('avax submit scores route has been hit ');
    const userId = req.user.id
    const { newScore, newAverage} = req.body;

    statDb.run(`UPDATE userStat SET avax_stats = ?, average_stats WHERE userID = ?`, [newScore, newAverage, userId], (error) => {
        if(error){
            console.log('Error while Updating avalanche score', error);
            res.status(500).send('An error occured while updating avax stats');
            return
        }
        res.send({message: 'Avax Scores has been updated :)'});
    });
})


module.exports = {
    SubmitScoresJSRouter,
    SubmitScoreEthRouter,
    SubmitScoreAvaxRouter,
}
