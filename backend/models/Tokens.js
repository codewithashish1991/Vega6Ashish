const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
	user_id: { type:  mongoose.Schema.Types.ObjectId, require: true, ref:'User' },
	token : { type: String, require: true },
	expire_in : { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

module.exports = mongoose.model('Token', tokenSchema);