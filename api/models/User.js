const bcrypt = require('bcrypt');
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  connection: 'someMongodbServer',
  tableName: 'users',
  attributes: {
    fname: {type: 'string', required: true},
    lname: {type: 'string', required: true},
    username: {type: 'string', required: true, unique:true},
    email: {type: 'string', email: true, required: true, unique: true},
    password: {type: 'string'},
    interests: {type:'array'}
  },
  toJSON: function () {
    var obj = this.toObject();
    // delete obj.password;
    // delete obj.encryptedPassword;

    return obj;
  },

  beforeCreate: function (values, cb) {

    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  }
};

