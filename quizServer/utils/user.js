const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../user.db');



const querry = "ALTER TABLE userStat ADD COLUMN avaxStat INTEGER DEFAULT 0";


db.run(querry, (err, succes) => {
    if(err){
        console.log('error while inserting a column', err);
    }else{
        console.log ('sucess');
    }
});

db.close();