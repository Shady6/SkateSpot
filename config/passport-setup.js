const FacebookStrategy = require('passport-facebook');
const LocalStrategy    = require('passport-local').Strategy;
const GoogleStrategy   = require('passport-google-oauth20');
const User = require('../models/user_model');


module.exports = function(passport){

	

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
     });
 });

// local passport setup
passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, done){
	process.nextTick(function(){
		console.log(req.body)
		User.findOne({'local.email' : email}, function(err, user){
			if (err){
				return done(err);
			}
			if (user){
				return done(null, false, req.flash('signupMessage', 'Ten email jest już zajęty.'));
			} if (password.length < 5) {
				return done(null, false, req.flash('signupMessage', 'Hasło musi mieć przynajmniej 6 znaków.'));
			}
			if (!(password === req.body.repeatPassword)) {
				return done(null, false, req.flash('signupMessage', 'Hasła się nie zgadzają.'));
			}
			if (!req.body.username) {
				return done(null, false, req.flash('signupMessage', 'Musisz wprowadzić nazwę użytkownika.'));
			}
			if (req.body.username.length < 3) {
				return done(null, false, req.flash('signupMessage', 'Nazwa użytkownika musi zawierać conajmniej 3 znaki.'));
			}
			else {
				var newUser = new User();

				newUser.local.email = email;
				newUser.local.username = req.body.username;
				newUser.local.password = newUser.generateHash(password);

				newUser.save(function(err){
					if (err){
						throw err;
					}
					return done(null, newUser);
				});
			}
		});
	});
}));

// local login
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, done){
	User.findOne({'local.email' : email}, function(err, user){
		if (err) {
			return done(err);
		} 
		if (!user) {
			return done(null, false, req.flash('loginMessage', 'Niepoprawne hasło lub email.'));
		}
		if (!user.validPassword(password)) {
			return done(null, false, req.flash('loginMessage', 'Niepoprawne hasło lub email.'));
		}
		return done(null, user);
	});
}));

// facebook passport setup
passport.use(
	new FacebookStrategy({
		// options for the google strat
		callbackURL: '/auth/facebook/redirect',
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  	}, (accessToken, refreshToken, profile, done) => {
		// passport callback function && check if user exists
		User.findOne({'facebook.id': profile.id}).then((currentUser) => {
			if(currentUser){
				//already have the user
				done(null, currentUser)
			} else {
				// if not create user in our db
					new User({
					'facebook.username': profile.displayName,
					'facebook.id': profile.id,
					}).save().then((newUser) => {
					done(null, newUser);
				});
			}
		});

		
  	})
);


// google passport setup
passport.use(
	new GoogleStrategy({
		// options for the google strat
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GOOGLE_PLUS_CLIENT_ID,
		clientSecret: process.env.GOOGLE_PLUS_CLIENT_SECRET
  	}, (accessToken, refreshToken, profile, done) => {
		// passport callback function && check if user exists
		User.findOne({'google.id': profile.id}).then((currentUser) => {
			if(currentUser){
				//already have the user
				done(null, currentUser)
			} else {
				// if not create user in our db
					new User({
					'google.username': profile.displayName,
					'google.id': profile.id,
					}).save().then((newUser) => {
					done(null, newUser);
				});
			}
		});

		
  	})
);

};