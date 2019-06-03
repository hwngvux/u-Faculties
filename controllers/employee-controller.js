const db = require('../models/db');
const xlsx = require('xlsx');

module.exports.addEmployee = function(req, res) {
    db.createEmployee(req.body.name, req.body.username, req.body.email, req.body.password, req.body.employeeType, req.body.degree, req.body.company, (err) => {
        if (err) {
            res.send({
                message: 'User exits'
            })
        } 
        return res.redirect('/employee')
    })
}

module.exports.addEmployeeByExcel = function(file) {
    var excel = xlsx.readFile('./public/image/user/'+file)
    var ws = excel.Sheets["Sheet1"];
    var data = xlsx.utils.sheet_to_json(ws);
    for (var i = 0; i < data.length; i++) {
        db.createEmployeeByExcel(data[i]["Tên đăng nhập"], data[i]["Mật khẩu"].toString(), data[i]["Họ và tên"], data[i]["VNU email"], (err) => {
            if (err) {
                console.log(err)
            } 
        })
    }
}

module.exports.deleteEmployee = function(req, res) {
    console.log(req.body.username);
    console.log(req.body.type);
    if(req.body.type === 'delete') {
        db.deleteEmployee(req.body.username);
    }
}

module.exports.editEmployee = function(req, res) {
    db.modifyEmployee(req.body.id, req.body.name, req.body.username, req.body.mail, req.body.password, req.body.type, req.body.degree, req.body.company, (err) => {
        if (err) {
            res.json({
                status: false,
                message: 'Creating failed'
            })
        }
    })
}

module.exports.editProfile = function(req, res) {
    db.modifyProfile(req.body.id, req.body.type, req.body.company, req.body.degree, req.body.mail, req.body.website, (err) => {
        if (err) console.log(err)
    })
}
