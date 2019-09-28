var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '註冊';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var userName = req.body['txtUserName'],
      userPwd = req.body['txtUserPwd'],
      userRePwd = req.body['txtUserRePwd'],     
      md5 = crypto.createHash('md5');
 
      userPwd = md5.update(userPwd).digest('hex');

  var newUser = new User({
      username: userName,
      userpass: userPwd
  });
module.exports = router;