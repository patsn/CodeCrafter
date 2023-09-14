module.exports = function (mongo) {
	require("dotenv").config();
	const express = require("express");
	const router = express.Router();

	function handleAccess(req, res, next) {
		const jwt = require("jsonwebtoken");
		const authHeaders = req.headers.authorization;
		const accessToken = authHeaders && authHeaders.split(" ")[1];
		if (accessToken == null) return res.sendStatus(401);

		jwt.verify(accessToken, process.env.SECRET_TOKEN, (err, user) => {
			if (err) return res.sendStatus(403);
			req.body.username = user.username;
			next();
		});
	}

	router.get("/", handleAccess, async (req, res) => {
		let tmp = await mongo.collection("skills").find({ username: req.body.username }).toArray();
		res.json(tmp);
	});

	return router;
};
