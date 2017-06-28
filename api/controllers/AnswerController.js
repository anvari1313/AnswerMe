/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'create': function (req, res) {
    var question_id = req.param('question_id');
    var user = req.user;
    var text = req.params.all().text;
    Question.findOne({id:question_id}, function (err, question) {
      Answer.create({text:text,question: question,responser: user}, function (err, answer) {
        if (err)
          return res.json(err);
        else
        {
          question.answers.add(answer);
          question.save(function (err) {
            if (err)
              return res.json(err);
          });
          return res.json(answer);
        }
      })
    });

  },

  newComment:function (req, res) {

  }

};

