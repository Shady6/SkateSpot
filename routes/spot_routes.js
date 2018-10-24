var express = require('express'),
router 		= express.Router(),
Skatespot   = require('../models/skatespot_model'),
TemporarySkatespot   = require('../models/temporarySkatespot_model'),
isLoggedIn  = require('../middleware/isLoggedIn');
TemporatyPhoto = require('../models/temporaryPhoto_model');

router.get('/all', function(req, res){
	Skatespot.find({}, function(err, allSpots){
		if (err) {
			req.flash('failure', 'Błąd ścieżka spot all')
      		return res.redirect('/');
		} else {
			res.render('allSpots', {
			allSpots: allSpots,
			path: req.route.path
			});
		}
	});
	
});

router.get('/add', isLoggedIn, function(req, res){
	Skatespot.find({}, function(err, foundSpots){
		if (err) {
			req.flash('failure', 'Błąd ścieżka spot all')
      		return res.redirect('/');
		} else {
			res.render('add', {
			path: req.route.path,
			spots: foundSpots
		});
		}
	});
	
});

router.post('/add', isLoggedIn, function(req, res){
	if (!req.body.spot.name){
		req.flash('failure', 'Musisz dodać nazwę spota');
		return res.redirect('/spot/add');
	}
	if (req.body.spot.name.length < 2 || req.body.spot.name.length > 50){
		req.flash('failure', 'Nazwa spota zbyt długa lub zbyt krótka');
		return res.redirect('/spot/add');
	}
	if (req.body.spot.description.length > 500 ){
		req.flash('failure', 'Opis zbyt długi');
		return res.redirect('/spot/add');
	}
	if ( (typeof req.body.spot.photo) === 'object' && req.body.spot.photo.length > 5){
		req.flash('failure', 'Możesz dodać maksymalnie 5 zdjęć');
		return res.redirect('/spot/add');
	}
	if (!req.body.spot.latLng){
		req.flash('failure', 'Musisz zaznaczyć spota na mapie');
		return res.redirect('/spot/add');
	}
	if (Number(req.body.spot.surface) > 10 ) {
		req.flash('failure', 'Ocena nie może być większa niż 10');
		return res.redirect('/spot/add');
	}
	var skateSpot = req.body.spot;
	var author = {};
	author.id = req.user._id;
	

	function addUsername(username){
		author.username = username;
	}

	if(!!req.user.google.username){
		addUsername(req.user.google.username);
	}

	else if(!!req.user.local.username){
		addUsername(req.user.local.username);
	}

	else if(!!req.user.facebook.username){
		addUsername(req.user.facebook.username);
	}

	skateSpot.author = author;

	
	TemporarySkatespot.create(skateSpot, function(err, newlyCreated){
		if (err) {
			req.flash('failure', 'Błąd ścieżka spot all')
      		return res.redirect('/');
		} else {
			req.flash('success', 'Spot dodany, oczekuje na weryfikacje.')
			res.redirect('/');
		}
		
	});
});

// router.get('/showcase/:id', function(req, res){
// 	Skatespot.findOne({_id: req.params.id}, function(err, foundSpot){
// 		if (err) {
// 			throw err;
// 		} else {
// 			res.render('skateSpotShowcase', {
// 			spot: foundSpot,
// 			path: req.route.path
// 			});
// 		}
// 	});
	
// });

router.get('/addPhoto/:idOfSpot', isLoggedIn ,function(req, res){
	Skatespot.findOne({_id: req.params.idOfSpot}, function(err, foundSpot){
		if (err) {
			return res.redirect('/spot/all');
		} else {
			res.render('addPhoto', {name: foundSpot.name, id: foundSpot._id ,path: req.route.path});
		}
	});
});

router.post('/addPhoto/:idOfSpot', isLoggedIn ,function(req, res){
	var photo = {};
	var editor = {};
	var allPhotos = [];
	editor.id = req.user._id;


	function addUsername(username){
		editor.username = username;
	}

	if(!!req.user.google.username){
		addUsername(req.user.google.username);
	}

	else if(!!req.user.local.username){
		addUsername(req.user.local.username);
	}

	else if(!!req.user.facebook.username){
		addUsername(req.user.facebook.username);
	}

	photo.editor = editor;
	photo.spot = {};
	photo.spot.id = req.params.idOfSpot;;

	req.body.photo.forEach(function(e){
		if(e.length){
			allPhotos.push(e);
		}
	});

	photo.photo = allPhotos;
	

	if (allPhotos.length === 0 ){
		req.flash('failure', 'Nie dodałeś żadnego zdjęcia.');
		return res.redirect('back');
	}

	if (allPhotos.length > 5 ){
		req.flash('failure', 'Nie możesz dodać więcej niż 5 zdjęć.');
		return res.redirect('back');
	}

	Skatespot.findOne({_id: photo.spot.id}, function(err, spot){
		if (err) {
			return res.redirect('/spot/all');
		} else {
			photo.spot.name = spot.name
			TemporatyPhoto.create(photo, function(err, photo){
				if (err) {
					req.flash('failure', 'Błąd ścieżka spot all')
      				return res.redirect('/spot/all');
				} else {
					req.flash('success', 'Zdjęcia oczekują na weryfikacje.');
					return res.redirect('/');
				}
			});
		}
	});

	

	

});
	


module.exports = router;