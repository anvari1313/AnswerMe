/**
 * Answer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  connection: 'someMongodbServer',
  tableName: 'answers',
  attributes: {
    text: {type:'text', required:true},
    question: {model:'question'},
    comments: {type:'array'},
    responser: {model:'user'}
  }
};

