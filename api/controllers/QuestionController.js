/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    console.log(req.user.fname);
    var tags = [];
    if (req.query.tag)
      tags = req.query.tag;
    return res.view('question/new', {tags: tags});
  },

  'create': function (req, res) {

    var question = req.params.all();
    Question.create({
      title: question.title,
      tags: question.tags.split(','),
      text: question.text,
      asker: req.user
    }, function (err, result) {
      if (err)
        return res.json(err);
      else
        return res.json(result);
    });

    // return res.json({que:question, user: req.user});
  },

  index: function (req, res) {
    console.log('this');
    Question.find().exec(function (err, questions) {
      if (err)
        return res.view('500', {data: err});
      else {
        return res.view('question/index', {questions: questions});

        // return res.json({questions:questions});
      }
    });
  },

  'question': function (req, res, next) {
    var question_id = req.param('question_id');
    Question.findOne({id: question_id}).exec(function (err1, question) {
      if (!question)
        return next();
      Answer.find({question: question.id}).exec(function (err2, answers) {
          if (err1 || err2)
            return res.view('500', {data: err});
          else {
            var counter = 0;
            answers.forEach(function (answer, index, answers) {

              User.findOne({id: answer.responser}, function (err, user) {
                answer._responser = {fname: 'hell', lname: 'go'};
                if (err)
                  return res.view('500', {data: err});
                else {
                  counter ++;
                  answer.responser = user;

                  if (counter === answers.length){
                    question.answers = answers;
                    return res.view('question/singleQuestion', {question: question});
                  }
                }
              });
            });

            // var questionRequested;
            // Question.findOne({id: question_id})
            //   .then(function (question) {
            //     if (! question)
            //       return next();
            //     questionRequested = question;
            //     return Answer.find({question: question_id});
            //   })
            //   .then(function (answers) {
            //     answers.forEach(function (answer, index) {
            //
            //     })
            //   })
            //   .catch(function (err) {
            //
            //   })
          }

        }
      )
      ;

    });
  }

};

