var express = require('express'),
router 		= express.Router();

// home page route
router.get('/', function(req, res){
	res.render('index', {
		path: req.route.path
	});
});



module.exports = router;