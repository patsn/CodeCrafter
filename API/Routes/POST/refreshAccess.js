module.exports = function (mongo) {
	const express = require("express");
	const router = express.Router();
	const jwt = require("jsonwebtoken");
	const genToken = require("../../Functions/genToken.js");

	router.post("/", async (req, res) => {
		const refreshToken = req.body.refreshToken;
		if (refreshToken == null) return res.sendStatus(401);
		if ((await mongo.collection("refreshTokens").findOne({ refreshToken: refreshToken })) == null) return res.sendStatus(403);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
			if (err) return res.sendStatus(403);
			const accessToken = genToken({ username: user.username }, process.env.SECRET_TOKEN, "10s");
			res.json({ accessToken: accessToken });
		});
	});

	return router;
};
