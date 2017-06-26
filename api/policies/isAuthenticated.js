/**
 * Created by ahmad on 6/21/17.
 */

var jwt = require('express-jwt');

var authCheck = jwt({
  secret: new Buffer('M9U2yGV6aQbnjYYfilOq5fWPmsSHrX901GE089oodAKA_T81iqlDmqdIqxFVmq-5', 'base64'),
  audience: 'hUu1jgzuo53obxy3Dm3hSuDzoXb1ezj4'
});


module.exports = authCheck;
