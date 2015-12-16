// app/routes.js
var eventDAO = require('./models/eventDAO.js');
var User = require('./models/user.js');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
	app.get('/fblogin', function(req, res) {
		res.render('index.ejs'); 
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form, unused now.
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form, unused now.
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
		// res.json(req.user);
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get('/loggedIn', function(req, res) {
		res.send(req.isAuthenticated()?"true":"false");
	});
	
	app.get('/api/user', function(req, res) {
		if(!req.isAuthenticated()) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
		else {
			res.send(req.user);
		}
	});
	
	app.get('/api/events', function(req, res) {
		eventDAO.getEvents(res);
	});
	
	app.get('/api/event/:id', function(req, res) {
		eventDAO.getEvent(req.params.id, res);
	});
	
	app.delete('/api/event/:id', function(req, res) {
		console.log("delete event id:" + req.params.id);
		/**
		 TODO: Only the poster can delete his event
		 	   Need to query the event's poseter by id
		**/
		if(!req.isAuthenticated()) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
		else {
			eventDAO.deleteEvent(req.params.id, req.user.fbid, res);
		}
	});
	
	app.post('/api/events', function(req, res) {
		var newEvent = req.body;
		if(!req.isAuthenticated()) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
		else if(!newEvent) {
			res.statusCode = 400;
			res.send('Failed');
		}
		else {
			eventDAO.postEvent(newEvent, req.user.fbid, req.user.name);
			//eventDAO.postEvent(newEvent,"test_userid")
			res.statusCode = 200;
			res.send('OK');
		}
	});
	
	app.put('/api/event/:id', function(req,res) {
		var modEvent = req.body;
		modEvent.id = req.params.id;
		if(!req.isAuthenticated()) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
		else if(!modEvent) {
			res.statusCode = 400;
			res.send('Failed');
		}
		else {
			eventDAO.modifyEvent(modEvent, req.user.fbid, res);
		}
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
