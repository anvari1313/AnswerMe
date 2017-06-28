var bcrypt = require('bcrypt');
var fs = require('fs');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  profile: function (req, res) {
    return res.view('user/profile', {user: {userId: req.param('userId'), userName: 'User name'}});
  },

  listAll: function (req, res) {
    User.find().exec(function (err, users) {
      if (err)
        return res.json(err);
      else
        return res.json(users);
    });
  },

  logout: function (req, res) {
    req.session.authenticated = false;
    req.session.user = undefined;
    res.redirect('/');
  },

  login: function (req, res) {
    var form = req.params.all();
    if (form.email && form.password){
      User.findOne({email: req.params.all().email}, function (err, user) {
        if (err)
          return res.view('500', {data: err});

        if (user){
          var enteredPassword = form.password;
          var userPassword = user.password;
          console.log(enteredPassword);
          console.log(userPassword);

          bcrypt.compare(enteredPassword, userPassword, function (err, valid) {
            if (err)
              return res.view('500', {data: err});

            console.log(valid);
            if (!valid) return res.redirect('/login');

            req.session.authenticated = true;
            req.session.user = user;
            res.redirect('/');
          });
        }else{
          return res.redirect('/login')
        }


      });
    }

  },

  register: function (req, res) {
    var form = req.params.all();

    User.create({
      fname: form.first_name,
      lname: form.last_name,
      username: form.username,
      email: form.email,
      password: form.password
    }, function (err, result) {
      if (err)
        return res.view('500', {data: JSON.stringify(err)});
      else {
        if (result.error)
          return res.view('500', {data: JSON.stringify(result)});
        else {
          req.session.authenticated = true;
          req.session.user = {fname: result.fname, lname: result.lname, email: result.email, username: result.username};
          res.redirect('/');
        }
      }
    });

  },

  profilePic: function (req, res) {
    var path = sails.config.appPath + '/assets/images/avatars/' + req.param('username') + '.png';

    fs.exists(path, function (exists) {
      if (exists) {
        fs.createReadStream(path).pipe(res);
      } else {
        fs.createReadStream(sails.config.appPath + '/assets/images/avatars/defaultAvatar.png').pipe(res);
      }

    });

  },

  questions: function (req, res) {

  },


};

