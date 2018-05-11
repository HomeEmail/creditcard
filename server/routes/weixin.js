var express = require('express');
var router = express.Router();
var wx_api = require('../lib/wx_api');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
 	res.status(404).send();
});
router.get('/getToken',function(req,res,next){
	wx_api.getToken()
	.then(function(token){
		var str='token:'+token;
		res.status(200).send(str);
	})
	.catch(function(err){
		console.log('wx_api.getToken error:',err);
		res.status(200).send('wx_api.getToken error');
	});
	
	
});

module.exports = router;

