module.exports = function (mongo) {
	const express = require("express");
	const router = express.Router();

	router.delete("/", async (req, res) => {
		await mongo.collection("refreshTokens").deleteOne({ refreshToken: req.body.refreshToken });
		res.sendStatus(204);
	});

	return router;
};
