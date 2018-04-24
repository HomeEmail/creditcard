var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var c =svgCaptcha.create({ //普通验证码
		size:4,
		noise:2,
		color:true,
		background:'#e1e1e1',
		width:80,
		height:40,
		fontSize:30
	});
	req.session.captcha=c.text;
	res.type('svg');// 使用ejs等模板时如果报错 res.type('html')
 	res.status(200).send(c.data);
});
router.get('/math',function(req,res,next){
	var c =svgCaptcha.createMathExpr({ //普通验证码
		size:4,
		noise:2,
		color:true,
		background:'#e1e1e1',
		width:80,
		height:40,
		fontSize:30
	});
	req.session.captcha=c.text;
	res.type('svg');// 使用ejs等模板时如果报错 res.type('html')
 	res.status(200).send(c.data);
});

module.exports = router;
