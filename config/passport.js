var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./database');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      connection.query('SELECT * FROM account WHERE username = ?', username, function(err, results) {
        if (err) return err;
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, function(err, check) {
            if (err) return err
            if (check) {
                return done(null, results[0])
            } else {
                return done(null, false, {message: "Sai mật khẩu"})
            }
          })
        } else {
          return done(null, false, {message: "Tài khoản không tồn tại"})
        }
      })
    }
  ))

  passport.serializeUser((user, done) => {
      done(null, user.username, user.role)
  })

  passport.deserializeUser((name, done) => {
    connection.query("SELECT username, role FROM account WHERE username = ?", name, function(err, results) {
      if (err) return err
      if (results) {  
        return done(null, results)
      } else {
        return done(null, false)
      }
    })
  })
}