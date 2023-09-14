function genToken(user, envTOKEN, timer) {
	const jwt = require("jsonwebtoken");
	if (timer) {
		return jwt.sign(user, envTOKEN, { expiresIn: timer });
	} else {
		return jwt.sign(user, envTOKEN);
	}
}

module.exports = genToken;
