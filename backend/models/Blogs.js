const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: { type: String, require: true, trim:true },
	description : { type: String, require: true },
	picture: { type: String, require : false },
	is_active : { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

module.exports = mongoose.model('Blog', blogSchema);