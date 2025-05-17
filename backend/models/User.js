const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, require: true, trim:true },
	username : { type: String, require: true, unique: true },
	password : { type: String, require: true },
	age: { type: Number, require: true, default: 0, min: 0, max: 140 },
	profile_pic: { type: String, require : false },
	is_active : { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

module.exports = mongoose.model('User', userSchema);