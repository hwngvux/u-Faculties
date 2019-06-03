const express = require('express');
router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const connection = require("../config/database");
const passport = require('passport');
const multer = require('multer');

const authenticateController = require('../controllers/authenticate-controller'),
    registerController = require('../controllers/register-controller'),
    unitController = require('../controllers/units-controller'),
    employeeController = require('../controllers/employee-controller');

require('../config/passport')(passport)


// User account route
router.route('/signin')
    .post(authenticateController.userLogin)

router.route('/controllers/register-controller')
    .post(registerController.register);

// Register account (UNAVAILABLE TEMPORARY)
// router.route('/signup')
//     .get((req, res) => res.render("signup"))

router.route('/logout')
    .post((req, res) => {
        console.log('logging out');
        req.logout();
        req.session.destroy(err => {
            res.clearCookie();
            res.redirect('/');
        });
    })

router.route('/')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/index');
        } else {
            res.render("login")
        }
    })
    .post((req, res) => res.render('login'))

router.route('/index')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("index", { name: req.session.passport.user, role: req.user[0].role })
        } else {
            res.redirect('/')
        }
    })

// ============== FIELD PAGE ================
router.route('/field_research')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user[0].role === "admin") {
            res.render("field_research", { name: req.session.passport.user, role: req.user[0].role })
        } else {
            res.redirect('/')
        }
    })

router.route('/field')
    .get((req, res) => {
        connection.query("SELECT * FROM field", function(err, result) {
            if(err) throw err;
            res.send(result)
        });
    });

router.route('/researchCreate')
    .post((req, res) => {
        if (req.isAuthenticated() && req.user[0].role === "admin") {
            var sql = "INSERT INTO field (id, parent, text) VALUES(?, ?, ?);";
            connection.query(sql, [req.body.id, req.body.parent, req.body.text], (err) => {
                if (err) console.log(err);
            });
        }
    })


router.route('/researchRename')
    .post((req, res) => {
        if (req.isAuthenticated() && req.user[0].role === "admin") {
            var sql = "UPDATE field SET text = ? WHERE id = ?;";
            connection.query(sql, [req.body.text,  req.body.id], (err) => {
                if (err) throw err;
            });
        }
    })

router.route('/researchDelete')
    .post((req, res) => {
        if (req.isAuthenticated() && req.user[0].role === "admin") {
            var id = req.body.id;
            var sql = "DELETE FROM field WHERE id = "+id+" OR parent = '"+id+"';";
            connection.query(sql, (err) => {
                if (err) console.log(err);
            })
        }
    })

//==============================================

// Render with DB
function renderHTML(path, res, data) {
    var htmlContent = fs.readFileSync(path, 'utf-8');
    data.filename = path;

    var htmlRenderized = ejs.render(htmlContent, data);

    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}


// Unit route
router.route('/unit')
    .get(function (req, res) {
        if(req.isAuthenticated()) {
            connection.query('SELECT * FROM units', function (err, result) {
                if (err) throw err;
                renderHTML('./views/unit.ejs', res, { units: result, name: req.session.passport.user, role: req.user[0].role });
            });
        } else {
            res.redirect('/')
        }
    })


router.route('/controllers/units-controller')
    .post(unitController.addUnit);

router.route('/unit-manage')
    .delete(unitController.delUnit)
    .post(unitController.editUnit)


// ================ Profile page route =================
router.route('/profile')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            if (req.session.passport.user === "admin") {
                res.redirect('/index');
            } else {
                connection.query('SELECT * FROM employee WHERE username = ?', req.session.passport.user, function (err, result) {
                    if (err) throw err
                    connection.query('SELECT DISTINCT f.text fieldname FROM employee e , field2 f , fieldEmploy b WHERE  b.employeeId = (select employeeId FROM employee WHERE username = "'+req.session.passport.user+'") and b.fieldId = f.id;', function(err, rows){
                        if (err) console.log(err);
                        console.log(rows);
                        renderHTML('./views/profile.ejs', res, { user: result,field: rows, name: req.session.passport.user, role: req.user[0].role });
                    })

                });
            }
        } else {
            res.redirect("/")
        }
    })

router.route('/field_research1')
    .get((req, res) => {
        connection.query('SELECT * FROM field', function (err, result) {
            if (err) throw (err)
            // connection.query('SELECT f.text fieldname FROM employee e, field f, fieldEmploy b WHERE b.employeeId = (select employeeId FROM employee WHERE username = "'+req.session.passport.user+'") and b.fieldId = f.id;', function(err, rows){
            //     if (err) console.log(err)
            //     res.render("field_research", { field: result, name: req.session.passport.user, role: req.user[0].role })
            // })
            res.send(result);
        })
    })

router.route('/field_research1/:id&:sd')
    .get(function(req, res) {
        const id = req.params.id;
        const sd = req.params.sd;
        connection.query('DELETE FROM fieldEmploy WHERE employeeId = ?' ,sd, (err) => {
            if(err) console.log(err);
            connection.query('INSERT INTO fieldEmploy (employeeId, fieldId) VALUE ('+sd+', '+id+')', (err,rows) => {
            if(err) console.log(err);
                res.send(rows);
                //res.render("profile1.ejs", {degree: rows[0].degree, name: rows[0].name, employeeId: rows[0].employeeId, employeeType: rows[0].employeeType});
            });
        })
    })


router.route('/profile-manage')
    .post(employeeController.editProfile)
// ======================================================

// Employee route
router.route('/employee')
    .get(function (req, res) {
        if(req.isAuthenticated()) {
            connection.query('SELECT * FROM employee', function (err, result) {
                if (err) throw err;
                renderHTML('./views/employee.ejs', res, { employee: result, name: req.session.passport.user, role: req.user[0].role });
            });
        } else {
            res.redirect('/')
        }
    })

router.route('/controllers/employee-controller')
    .post(employeeController.addEmployee);

router.route('/employee-manage')
    .delete(employeeController.deleteEmployee)
    .post(employeeController.editEmployee)

// router.route('/employee-upload')
//     .post(employeeController.addEmployeeByExcel)


//============== upload image ================
// Config storage for image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image/user')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.route('/uploadImage')
    .post(upload.single('file'), function(req, res) {
        console.log(req.file.originalname);
        res.redirect('/profile')
    })

router.route('/uploadExcel')
    .post(upload.single('file'), function(req, res) {
        employeeController.addEmployeeByExcel(req.file.originalname)
        res.redirect('/employee')
    })
//============================================
router.route('/search-unit/:id')
.get(function(req, res){
  const name = req.params.id;
  connection.query('SELECT * FROM employee WHERE employeeId=?', name, (err,rows) => {
    //console.log(rows);
    //if (err) throw err;
    if (rows.length > 0) {
      res.send(rows);
      //res.render("profile1.ejs", {degree: rows[0].degree, name: rows[0].name, employeeId: rows[0].employeeId, employeeType: rows[0].employeeType});
    } else {
      res.json(rows);
    }
   });
});

router.route('/search-unit1/:id')
.get(function(req, res){
  const name = req.params.id;
  connection.query('SELECT * FROM employee WHERE company=?', name, (err,rows) => {
    //console.log(rows);
    //if (err) throw err;
    if (rows.length > 0) {
      res.send(rows);
      //res.render("profile1.ejs", {degree: rows[0].degree, name: rows[0].name, employeeId: rows[0].employeeId, employeeType: rows[0].employeeType});
    } else {
      res.json(rows);
    }
   });
});

router.route('/search-unit')
.get(function(req, res){
  if(req.isAuthenticated()) {
    connection.query('SELECT * FROM employee', function (err, result) {
      if (err) throw err;
      renderHTML('./views/search-unit.ejs', res, { unit: result, role: req.user[0].role, name: req.session.passport.user });
    });
  } else {
    connection.query('SELECT * FROM employee', function (err, result) {
        if (err) throw err;
        renderHTML('./views/search-unit.ejs', res, { unit: result, role: "guest", name: "guest" });
    });
  }
});


module.exports = router;
