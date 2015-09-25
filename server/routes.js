var models = require('./database/models');
var _ = require('underscore');
var router = require('express').Router();

var api = {
	users: {
		get: function(req, res) {
			models.User.findAll().then(function(users) {
				res.json(users);
			})
		},
		post: function(req, res,cb) {
			console.log('request', req);
			models.User.findOrCreate({ 
				where: {username: req.body.username}
			}).then(function(user) {
				models.User.create({
					username: req.body.username,
					password: req.body.password
				})
			}).then(function(user) {
				console.log('User created: ', user);
				res.sendStatus(201);
			})
		}
	},
	prompts: {
		get: function(req, res) {
			models.Prompt.findAll().then(function(posts) {
				res.json(posts);
			})
		},

		post: function(req, res) {
			models.Prompt.create({
				text: req.body.text
			}).then(function(prompt) {
				console.log('Prompt created: ', prompt);
				res.sendStatus(201);
			})
		}
	}, 
	feels: {
		get: function(req, res) {
			models.Feel.findAll().then(function(feels) {
				res.json(feels);
			})
		},

		post: function(req, res) {
			models.Feel.create({
				emotion: req.body.emotion,
				text: req.body.text
			}).then(function(feel) {
				console.log('Feel created: ', feel);
				res.sendStatus(201);
			})
		}
	}
};
_.each(api, function(route, key) {
	router.route('/' + key)
		.get(route.get)
		.post(route.post);
});

module.exports = router;



