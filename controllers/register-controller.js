const user = require('../models/user');

//tạo module đăng ký với các parameters
module.exports.register = function(req, res) {
  user.createUser(req.body.username, req.body.password, (err) => {
    if (err) {
      res.json({
        status: false,
        message: 'Sign up failed'
      })
    }
    return  res.redirect('/');
  })
}
