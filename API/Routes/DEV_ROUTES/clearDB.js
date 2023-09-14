module.exports = function (mongo) {
	const express = require("express");
	const router = express.Router();
	router.get("/", async (req, res) => {
		try {
			await mongo.collection("user").deleteMany({});
			await mongo.collection("skills").deleteMany({});
			await mongo.collection("refreshTokens").deleteMany({});
		} catch {
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	});
	return router;
};
