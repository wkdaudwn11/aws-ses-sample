// nodemailer 모듈 요청
var nodemailer = require('nodemailer');

// 메일발송 객체
var mailSender = {
  // 메일발송 함수
  sendGmail: function(param) {
    let result = true;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: '보낼사람 gmail',
        pass: '비번'
      }
    });
    // 메일 옵션
    var mailOptions = {
      from: '받는사람 이메일',
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text // 메일 내용
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        result = false;
      }
    });

    return result;
  }
};
// 메일객체 exports
module.exports = mailSender;
