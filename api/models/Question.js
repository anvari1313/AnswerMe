/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  connection: 'someMongodbServer',
  tableName: 'questions',
  attributes: {
    title: {type: 'string', required: true},
    tags: {type:'array', required: true},
    text: {type:'text', required:true},
    asker: {model: 'user'},
    answers: {collection: 'answer', via : 'responser'}
  }
};

