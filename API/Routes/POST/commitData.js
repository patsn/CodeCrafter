module.exports = function (mongo) {
	require("dotenv").config();
	const express = require("express");
	const router = express.Router();
	const jwt = require("jsonwebtoken");

	router.post("/", async (req, res) => {
		const authHeaders = req.headers.authorization;
		const accessToken = authHeaders && authHeaders.split(" ")[1];
		if (accessToken == null) return res.sendStatus(401);

		jwt.verify(accessToken, process.env.SECRET_TOKEN, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			} else {
				mongo.collection("skills").updateOne(
					{ username: user.username },
					{
						$set: {
							skills: req.body.skills,
						},
					},
					{ upsert: true },
				);
				res.sendStatus(200);
			}
		});
	});
	return router;
};
