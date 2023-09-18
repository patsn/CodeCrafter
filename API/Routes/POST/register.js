module.exports = function (mongo) {
	const express = require("express");
	const router = express.Router();
	const bcrypt = require("bcrypt");
	const saltRounds = 10;

	router.post("/", async (req, res) => {
		const username = req.body.username;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		const userData = { username: username, password: hashedPassword };

		if (userData.username == null || userData.password == null)
			return res.sendStatus(400);
		if (await mongo.collection("user").findOne({ username: userData.username }))
			return res.sendStatus(409);
		if (
			await mongo.collection("skills").findOne({ username: userData.username })
		)
			return res.sendStatus(409);
		try {
			mongo.collection("user").insertOne(userData);
			mongo
				.collection("skills")
				.insertOne({ username: userData.username, skills: [] });
		} catch {
			return res.sendStatus(500);
		}
		res.sendStatus(201);
	});
	return router;
};
