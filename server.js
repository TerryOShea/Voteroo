'use strict';

var express = require('express'),
    routes = require('./app/routes.js'), 
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'), 
    passport = require('passport'), 
    flash = require('connect-flash'), 
    session = require('express-session');

require('dotenv').config({ silent: true });

var Schema = mongoose.Schema;
var app = express();

var pollSchema = new Schema({
    title: String, 
    allvotes: Array
});

var Polls = mongoose.model('Polls', pollSchema);

mongoose.connect(process.env.MONGOLAB_URI, (err) => {
	if (err) return console.log(err)
	else console.log('Mongoose successfully connected.');
	
	require('./config/passport')(passport);
	
    app.set('view engine', 'ejs');
    
    app.use('/views', express.static(process.cwd() + '/views'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'gveikcisdxhbrmyedcazxyxdcrshhnduffu', resave: false, saveUninitialized: false }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    routes(app, Polls, passport);

    app.listen(process.env.PORT || 8080, () => {
        console.log('listening on 8080');
    });
});