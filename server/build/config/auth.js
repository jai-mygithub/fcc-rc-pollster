'use strict';

module.exports = {
  twitterAuth: {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    callbackURL: process.env.CALLBACKURL
  },
  databaseUrl: process.env.DATABASEURL,
  secret: process.env.SECRET
};