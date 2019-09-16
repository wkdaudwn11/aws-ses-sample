const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');
AWS.config.update({ region: 'us-west-2' });

module.exports = {
  /**
   * @controller  GET /mail
   * @desc        sendEmail
   */
  sendEmail: async (req, res) => {
    const receiveEmail = req.body.map(receive => {
      return receive.email;
    });

    let params = {
      Destination: {
        //ToAddresses: ['wkdaudwn11@naver.com', 'wkdaudwn1028@naver.com'], // 받는 사람 이메일 주소
        ToAddresses: receiveEmail,
        CcAddresses: [], // 참조
        BccAddresses: [] // 숨은 참조
      },
      Message: {
        /* required */
        Body: {
          /* required */
          // Html: {
          //   Charset: 'UTF-8',
          //   Data: 'HTML_FORMAT_BODY'
          // },
          Text: {
            Charset: 'UTF-8',
            Data: 'test'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email'
        }
      },
      Source: 'wkdaudwn11@ddive.co.kr', // 보낸 사람 주소
      ReplyToAddresses: ['wkdaudwn11@ddive.co.kr'] // 답장 받을 이메일 주소
    };

    // promise 및 SES 서비스 객체 생성
    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(params)
      .promise();

    // promise객체 실행 / 에러처리
    sendPromise
      .then(function(data) {
        console.log(data.MessageId);
        res.status(200).json({ message: 'success' });
      })
      .catch(function(err) {
        console.error(err, err.stack);
        res.status(200).json({ message: 'fail' });
      });
  }
};
