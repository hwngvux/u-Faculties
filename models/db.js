const connection = require('../config/database');
const user = require('../models/user');

//============== Model Unit =================
exports.createUnit = function(unitName, unitType, address, phone, website, check) {
    connection.query("INSERT INTO units (name, unit_type, address, phone, website) VALUES ('"+unitName+"', '"+unitType+"', '"+address+"', '"+phone+"', '"+website+"')", function(err, result) {
        if (err) {
            return check(err);
        }
        return check(null);
    })
}

// expo/

exports.deleteUnit = function(id) {
    connection.query('SELECT * FROM units WHERE id = ?', id, function(err, rows) {
        if (err) return err;
        if (rows.length > 0) {
            connection.query("DELETE FROM units WHERE id = ?", id, function(err, result) {
                if (err) return err;
                console.log("Removed unit:" + id);
            })
        } else {
            console.log("Cannot find unit");
        }
    });
}

exports.getListUnit = function(cb) {
    connection.query('SELECT * FROM units', function(err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            cb(rows);
            return rows;
        } else {
            return null;
        }
    })
}

exports.modifyUnit = function(unitID, unitName, unitType, address, phone, website, check) {
    connection.query("UPDATE units SET name = '"+unitName+"', unit_type = '"+unitType+"', address = '"+address+"', phone = '"+phone+"', website = '"+website+"' WHERE id = "+unitID, function(err, result) {
        if (err) return err;
        return check(null);
    })
}
//==============================================



//============== Model Employee ================
exports.createEmployee = function(name, username, email, password, employeeType, degree, company, check) {
    user.createUser(username, password, (err) => {
        if (err) return check(err);
        connection.query('SELECT userId FROM account WHERE username = ?', username, function(err, result) {
            if (err) return err;
            if (result.length > 0) {
                var employeeId = result[0].userId
                // console.log(employee);
                connection.query("INSERT INTO employee (employeeId, name, username, email, employeeType, degree, company) VALUES ("+employeeId+", '"+name+"', '"+username+"', '"+email+"', '"+employeeType+"', '"+degree+"', '"+company+"')", function(err, result) {
                    if (err) {
                        // console.log(err)
                        if (err.code === "ER_DUP_FIELDNAME") {
                            return check(err)
                        }
                        // return check(err, mess)
                    } 
                    return check(null)
                })
            }
        })
    })
}

exports.createEmployeeByExcel = function(username, password, name, email, check) {
    user.createUser(username, password, (err) => {
        if (err) return err;
        connection.query('SELECT userId FROM account WHERE username = ?', username, function(err, result) {
            if (err) return err;
            if (result.length > 0) {
                var id = result[0].userId
                connection.query("INSERT INTO employee (employeeId, name, username, email) VALUES ("+id+", '"+name+"', '"+username+"', '"+email+"')", (err) => {
                    if (err) {
                        return check(err)
                    }
                    return check(null)
                })
            }
        })
    })
}

exports.deleteEmployee = function(username) {
    connection.query("SELECT * FROM employee WHERE username = ?", username, function(err, rows) {
        if (err) return err;
        if (rows.length > 0) {
            connection.query("DELETE FROM employee WHERE username = ?", username, function(err, result) {
                if (err) return err;
                console.log("Removed user from employee: " + username)
            })
            connection.query("DELETE FROM account WHERE username = ?", username, function(err, result) {
                if (err) return err;
                console.log("Removed user from account: " + username)
            })
        } else {
            console.log("Cannot find user");
        }
    })
}

exports.modifyEmployee = function(id, name, username, mail, password, type, degree, company, check) {
    connection.query("UPDATE employee SET name = '"+name+"', username = '"+username+"', email = '"+mail+"', employeeType = '"+type+"', degree = '"+degree+"', company = '"+company+"' WHERE employeeId = "+id, function(err, result) {
        if (err) { 
            return err;
        } else {
            user.modifyUser(id, username, password, (err) => {
                if (err) {
                    return check(err);
                } else {
                    return check(null);
                }
            })
        }
    })
}
//==============================================
exports.modifyProfile = function(id, type, company, degree,  mail, website) {
    connection.query("UPDATE employee SET email = '"+mail+"', employeeType = '"+type+"', degree = '"+degree+"', company = '"+company+"', website = '"+website+"' WHERE employeeId = "+id, function(err, result) {
        if (err) console.log(err); 
    })
}