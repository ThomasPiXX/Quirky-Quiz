const bcrypt = require('bcryptjs');

function passwordHasher(password, callback){

    if (!password) {
        const error = new Error('Invalid password');
        return callback(error);
    }
    //Generate a salt to use for hashing
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) return callback(err);

        //hash the password using the generated salt 
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return callback(err);

            // invoke the callback
            callback(null, hash);
        })
    })
}




module.exports = {
    passwordHasher,
}