// requiring modules
var Skatespot 	   = require('./models/skatespot_model'),
dotenv 		       = require('dotenv/config'),
bodyParser 		   = require('body-parser'),
mongoose 	       = require('mongoose'),
express 	       = require('express'),
app 		       = express(),

session 	   	   = require('express-session'),
flash		   	   = require('connect-flash'),
cookieParser   	   = require('cookie-parser'),
passport 	   	   = require('passport');


// connect to the database on local is local
var url = process.env.DATABASE_SKATESPOT_URL;
mongoose.connect(url);

// passport configuration
require('./config/passport-setup')(passport);

// basic set up
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// required for passport
app.use(session({
	secret: process.env.COOKIE_SESSION_KEY,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// requiring routes
var authRoutes = require('./routes/auth_routes');
// var profileRoutes = require('./routes/profile_routes');
var indexRoutes = require('./routes/index_routes');
var spotRoutes = require('./routes/spot_routes');
var adminRoutes = require('./routes/admin_routes');

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.signupMessage = req.flash('signupMessage');
	res.locals.loginMessage = req.flash('loginMessage');
	res.locals.notLoggedIn = req.flash('notLoggedIn');
	res.locals.success = req.flash('success');
	res.locals.failure = req.flash('failure');
	next();
});

// set up routes
app.use('/', indexRoutes);
app.use('/spot', spotRoutes);
app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);

app.get('*', function(req, res){
  res.render('error404')
});

app.listen(3000, () => console.log('Listening to the server on port 3000'));