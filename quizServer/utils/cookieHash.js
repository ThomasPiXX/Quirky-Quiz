const crypto = require('crypto');

function cookieHash(){
    const key = crypto.randomBytes(32).toString('hex');
    return key;
}




module.exports ={
    cookieHash,
}