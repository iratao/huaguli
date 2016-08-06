var express     = require('express');
var app         = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser  = require('body-parser');
var path = require('path');
var fs = require('fs');


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

var value = require('./items.json')

router.route('/api/item/:item_id/issoldout/:soldout')
	.put(function(req, res) {
		var itemid = req.params.item_id;
		var isSoldOut = req.params.soldout;
		value.items[itemid] = isSoldOut > 0 ? true: false;

		fs.writeFile("./items.json", JSON.stringify(value, null, 4), function(err) {
			res.setHeader('Content-Type', 'application/json');
		    if(err) {
		    	console.log(err);
		        res.send({success: false});
		    }
	    	res.send({success: true});
		}); 

		
	});

router.route('/api/getlist')
	.get(function(req, res) {
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(value));
	});


app.use('/', router);

var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});