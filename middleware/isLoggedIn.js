
module.exports = function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('notLoggedIn', 'Musisz być zalogowany, żeby to zrobić');
	res.redirect('/auth/login');
}