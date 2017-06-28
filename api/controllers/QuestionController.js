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

	  console.log();
    Question.create({title:question.title, tags:question.tags.split(','), text:question.text, asker:req.user}, function (err, result) {
      if (err)
        return res.json(err);
      else
        return res.json(result);
    });

    // return res.json({que:question, user: req.user});
  },

  index:function (req, res) {
	  console.log('this');
	  Question.find().exec(function (err, questions) {
      if (err)
        return res.view('500', {data:err});
      else{
        return res.view('question/index',{questions:questions});
      }
    });
  },

  'question':function (req, res) {

  }

};

