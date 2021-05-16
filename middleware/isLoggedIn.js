
let translate = require("../get_translation");

module.exports = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('notLoggedIn', translate(req.cookies, "not-logged-in"));
	res.redirect('/auth/login');
}