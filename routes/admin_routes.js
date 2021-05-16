var express = require('express'),
router 		= express.Router(),
Skatespot   = require('../models/skatespot_model'),
TemporarySkatespot   = require('../models/temporarySkatespot_model'),
TemporatyPhoto = require('../models/temporaryPhoto_model'),
mongoose = require('mongoose');

let translate = require("../get_translation");

function isAdmin(req, res, next){
  if (req.user && req.user.isAdmin){
    return next();
  }
  req.flash('notLoggedIn', translate(req.cookies, "not-admin"));
  res.redirect('/');
}

router.get('/submitSpot', isAdmin ,function(req, res){
  TemporarySkatespot.find({}, function(err, spots){
    if(err) {
      req.flash('failure', translate(req.cookies, "admin-route-error"))
      return res.redirect('/');
    } else {
      TemporatyPhoto.find({}, function(err, photos){
        if(err) {
          req.flash('failure', translate(req.cookies, "admin-route-error"))
          return res.redirect('/');
        } else {
          res.render('admin', {spots: spots, photos: photos});
        }
      });
    }
  });
});

router.post('/submitSpot', isAdmin ,function(req, res){
  var id = req.body.id
  if (req.body.add) {
    Skatespot.create(req.body.spot, function(err, created){
      if(err) {
        req.flash('failure', translate(req.cookies, "admin-route-error"))
        return res.redirect('/');
      } else {
        TemporarySkatespot.deleteOne({_id: id}, function(err){
          if (err) {
            req.flash('failure', translate(req.cookies, "admin-route-error"))
            return res.redirect('/');
          } else {
            res.redirect('/admin/submitSpot')
          }
        });
      }
    });
  } else if (req.body.delete) {
    TemporarySkatespot.deleteOne({_id: id}, function(err){
          if (err) {
            req.flash('failure', translate(req.cookies, "admin-route-error"))
            return res.redirect('/');
          } else {
            res.redirect('/admin/submitSpot')
          }
        });
  }
  

});

router.post('/submitPhoto', isAdmin, function(req, res){
  editorId = {id: req.body.editorId};
  if(req.body.add){
    Skatespot.findByIdAndUpdate(req.body.spotId, {photo: req.body.photo, photoEditor: editorId}, function(err , updated){
      if (err){
        console.log(err);
        req.flash('failure', translate(req.cookies, "admin-route-error"))
        return res.redirect('/');
      } else {
        TemporatyPhoto.deleteOne({_id: req.body.id}, function(err){
          if (err) {
            req.flash('failure', translate(req.cookies, "admin-route-error"))
            return res.redirect('/');
          } else{
            return res.redirect('/admin/submitSpot');
          }
        })
      }
    });
  } else if (req.body.delete){
    TemporatyPhoto.deleteOne({_id: req.body.id}, function(err){
      if (err) {
        req.flash('failure', translate(req.cookies, "admin-route-error"))
        return res.redirect('/');
      } else {
        return res.redirect('/admin/submitSpot')
      }
    })
  }
});


module.exports = router;