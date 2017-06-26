/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  profile: function (req, res) {
    return res.view('user/profile',{user:{userId:req.param('userId'), userName:'User name'}});
  },

  listAll: function (req, res) {
    User.find().exec(function (err, users) {
      if (err)
        return res.json(err);
      else
        return res.json(users);
    });
  },
  register: function (req, res) {
    var form = req.params.all();

    User.create({name:form.name, email:form.email, encryptedPassword:form.password}, function (result, err) {
      if (err)
        return res.view('500', {data:err});
      else{
        if (result.error)
          return res.view('500', {data:result});
        else
          return res.json(result);
      }
    });

  }
};

