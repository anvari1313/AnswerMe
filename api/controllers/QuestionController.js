/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new' : function (req, res) {
	  console.log(req.user.fname);
	  var tags = [];
	  if (req.query.tag)
	    tags = req.query.tag;
	  return res.view('question/new', {tags: tags});
  },

  'create': function (req, res) {
	  var question = req.params.all();
	  Question.create({title:question.title})
  },

  index:function (req, res) {

  },

  'question':function (req, res) {

  }

};

