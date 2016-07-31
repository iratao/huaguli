var express     = require('express');
var app         = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser  = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var router = express.Router();

// 开启一个 SMTP 连接池
var transport = nodemailer.createTransport(smtpTransport({
		host: "smtp.qq.com", // 主机
		secure: true, // 使用 SSL
		port: 465, // SMTP 端口
		auth: {
		user: "415333982@qq.com", // 账号
		pass: "fwmvuycsrgrmbijb" // 密码
	}
}));

router.route('/api/sendmail')
    .post(function(req, res) {
    	var itemid = req.body.item_id;
    	var seatNum = req.body.seat_num;


	    var mailOptions = {
		    from: '415333982@qq.com', // sender address
		    to: '415333982@qq.com', // list of receivers
		    subject: '鲜花订单', // Subject line
		    text: '座位号：' + seatNum + '\n商品号：' + itemid // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};

		transport.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});
	});


app.use('/', router);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});