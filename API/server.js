require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const { mongo } = require("./mongoDBConnector");

//==============APP
app.use(express.json());
app.use(cors());
app.use(helmet());

//==============ROUTES
app.use("/getData", require("./Routes/GET/getData.js")(mongo));
app.use("/register", require("./Routes/POST/register.js")(mongo));
app.use("/refreshAccess", require("./Routes/POST/refreshAccess.js")(mongo));
app.use("/login", require("./Routes/POST/login.js")(mongo));
app.use("/logout", require("./Routes/DELETE/logout.js")(mongo));
app.use("/commitData", require("./Routes/POST/commitData.js")(mongo));

//==============DEV ROUTES
if (process.env.NODE_ENV === "development") {
	app.use("/mongo_clear", require("./Routes/DEV_ROUTES/clearDB.js")(mongo));
}

//==============LISTEN
app.listen(3001);
