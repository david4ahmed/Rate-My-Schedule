const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleID: profile.id})
            .then(user => {
                if(user) {
                    done(null, user);
                } else {
                    new User ({
                        googleID: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value.split('?')[0]
                    })
                    .save()
                    .then(user => done(null, user))
                    .catch(err => console.log(err));
                }
            })

        console.log(profile);
    }
));
