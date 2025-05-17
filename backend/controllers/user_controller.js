const User = require('../models/User');
const Token = require('../models/Tokens');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes } = require("node:crypto");

function randomString(length) {
  if (length % 2 !== 0) {
    length++;
  }

  return randomBytes(length / 2).toString("hex");
}

exports.login = asyncHandler( async(req, res, next) => {
	const user = await User.findOne({ username: req.body.username });
	try {
		const match = await bcrypt.compare(req.body.password, user.password);
		const accessToken = jwt.sign(JSON.stringify(user), randomString(8));
		if(match){
			const expDate = new Date();
  			expDate.setDate(expDate.getDate() + 7);
			const tokenData = {
				user_id: user._id,
				token: accessToken,
				expire_in: expDate
			};
			const token = new Token(tokenData);
			const result = await token.save();
            res.json({ "accessToken": accessToken, "user_details" : user });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
	} catch(err) {
		res.status(501).send({ message : "User not found", status: 501 });
	}
});

exports.registerUser = asyncHandler( async(req, res, next) => {
	const pass = req.body.password.toString();
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const userReg = new User({
        name: (req.body.name) ? req.body.name : "",
        username: (req.body.username) ? req.body.username : "",
        password: (req.body.password) ? hashedPassword : "",
        profile_pic: (req.body.profile_pic) ? req.body.profile_pic : "",
        age: (req.body.age) ? req.body.age : 0,
        is_active: (req.body.is_active) ? true : false,
    });

    try {
    	const result = await userReg.save();
    	res.status(200).send({
			"res": "user register successfully!",
			"staus": 200
		});
    } catch (err){
    	res.status(500).send({
			"error": err,
			"staus": 500
		});
    }
});

exports.logout = asyncHandler(async(req, res, next) => {
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	const tok = await Token.findOne({ token: token});

	if (tok) {
		const del = await tok.deleteOne();
		res.status(200).send({ message: "logout successfully" });
	} else {
		console.log("No record deleted");
		res.status(404).send({ message: "Record not found" });
	}
});