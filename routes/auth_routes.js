var router = require('express').Router(),
	passport = require('passport');

let translate = require("../get_translation");

//  register get and post routes
router.get('/register', function (req, res) {
	res.render('register', {
		path: req.route.path
	});
});

router.post('/register', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/auth/register',
	failureFlash: true
}));

// login get and post routes
router.get('/login', function (req, res) {
	res.render('login', {
		path: req.route.path
	});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/auth/login',
	failureFlash: true
}));

// auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	req.flash('success', translate(req.cookies, "logged-out"));
	req.logout();
	res.redirect('/')
});

// auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {
	successRedirect: '/',
	failureRedirect: '/auth/login'
}), (req, res) => {
	res.redirect('/profile/view')
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email']
}));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/auth/login'
}), (req, res) => {
	res.redirect('/profile/view');
});

module.exports = router;

