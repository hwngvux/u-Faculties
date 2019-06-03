const passport = require('passport');

const user = require('../models/user');
require('../config/passport')(passport)

exports.userLogin = function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
        return next(err);
    }

    if (!user) {
        return res.render('login', {
            message: info.message,        
        });
    }

    req.session.authenticatedAt = null;
    req.session.save();

    req.logIn(user, function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/index');
    });
  })(req, res, next);  
}
