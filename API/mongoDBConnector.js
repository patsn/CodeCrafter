const { MongoClient } = require("mongodb");

//==============MONGO
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoDB = process.env.MONGO_DB;
const mognoUrl =
	"mongodb://" + mongoUser + ":" + mongoPass + "@" + mongoDB + "/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6";
const mongoClient = new MongoClient(mognoUrl);
const mongo = mongoClient.db("CodeCraft");

module.exports = { mongo };
