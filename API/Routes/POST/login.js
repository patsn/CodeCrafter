module.exports = function (mongo) {
	require("dotenv").config();
	const express = require("express");
	const router = express.Router();
	const genToken = require("../../Functions/genToken.js");
	const bcrypt = require("bcrypt");

	router.post("/", async (req, res) => {
		const userData = await mongo.collection("user").findOne({ username: req.body.username });
		if (!userData) {
			return res.status(400).send("Cannot find user");
		}
		try {
			if (await bcrypt.compare(req.body.password, userData.password)) {
				const accessToken = genToken({ username: userData.username }, process.env.SECRET_TOKEN, "10s");
				const refreshToken = genToken({ username: userData.username }, process.env.REFRESH_TOKEN, "3d");
				await mongo.collection("refreshTokens").insertOne({ refreshToken: refreshToken });
				res.json({ accessToken: accessToken, refreshToken: refreshToken });
			} else {
				res.send("Not Allowed");
			}
		} catch {
			res.sendStatus(500);
		}
	});
	return router;
};
