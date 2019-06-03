const bcrypt = require('bcrypt');
const connection = require('../config/database');

module.exports.createUser = function(username, password, check) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // var users = {
            //     "username": username,
            //     "password": hash,
            //     "role": 'teacher'
            // };
            var insert = "INSERT INTO account (username, password, role) SELECT * FROM (SELECT '"+username+"', '"+hash+"', 'teacher') AS tmp WHERE NOT EXISTS (SELECT username FROM account WHERE username = '"+username+"') LIMIT 1";
            connection.query(insert, function(err, result) {
                if (err) {
                    console.log(err)
                    // return check(err);
                }
                return check(null);
            }); 
        })
    })
}

module.exports.modifyUser = function(id, username, password, check) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            connection.query("UPDATE account SET username = '"+username+"', password = '"+hash+"', role = 'teacher' WHERE userId = "+id, function(err, result) {
                if (err) {
                    return check(err);
                } else {
                    return check(null)
                }
            })
        })
    })
}


  
