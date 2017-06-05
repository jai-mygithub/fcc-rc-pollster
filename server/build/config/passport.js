'use strict';

var passport = require('passport');
var User = require('../models/user');
var configAuth = require('./auth');
var jwt = require('jwt-simple');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var TwitterStrategy = require('passport-twitter');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, configAuth.secret);
}

console.log(configAuth);

// =========================================================================
// JWT =====================================================================
// =========================================================================

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: configAuth.secret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

// =========================================================================
// TWITTER =================================================================
// =========================================================================

passport.use(new TwitterStrategy({
  consumerKey: configAuth.twitterAuth.consumerKey,
  consumerSecret: configAuth.twitterAuth.consumerSecret,
  callbackURL: configAuth.twitterAuth.callbackURL,
  passReqToCallback: true
}, function (req, token, tokenSecret, profile, done) {
  User.findOne({ 'socialId': profile.id }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      req.session.access_token = tokenForUser(user);
      return done(null, user);
    } else {
      var newUser = new User();
      newUser.socialId = profile.id;
      newUser.displayName = profile.displayName;
      newUser.photo = profile.photos[0].value || 'http://identicon.org?t=' + profile.id + '&s=256';
      newUser.save(function (err) {
        if (err) {
          throw err;
        }
        req.session.access_token = tokenForUser(user);
        return done(null, newUser);
      });
    }
  });
}));

// used to serialize the user for the session : https://stackoverflow.com/a/27637668/3684211
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize user (based on data id on the database)
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;