let express = require('express');
let router = express.Router();
let nodemailer = require('nodemailer');

//GET home page
router.get('/', function (req, res, next) {
  res.render('contact', {title: 'Contact'});
});

router.post('/send', function (req, res, next) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yourmail@gmail.com',
        pass: 'yourpassword'
    }
  });

  let mailOpptions ={
    from: 'John Doe <johndoe@outlook.com>',
    to: 'johndoe@gmail.com',
    subject: 'Website Submission',
    text: 'You have a new submission with the following details...Name ' + req.body.name + ' Email ' + req.body.email + ' Message ' + req.body.message,

  };

  transporter.sendMail(mailOpptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('message sent: ' + info.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
