const asyncHandler = require('express-async-handler');
const Token = require('../models/Tokens');
const Blog = require('../models/Blogs');


async function  tokenValid(token){
	const tok = await Token.findOne({ token: token});
	if (tok) {
		return "";
	} else {
		return "token not found!";
	}
}


exports.index = asyncHandler( async(req, res, next) => {
	const blogs = await Blog.find().sort({ created_at: -1 });
	res.status(200).send({"blogs": blogs});
});

exports.create = asyncHandler( async(req, res, next) => {


	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	if(!token) res.status(401).send("token required! ");
	const tok_res = await tokenValid(token);
	if(tok_res) res.status(401).send(tok_res);

	const blogData = new Blog({
        title: (req.body.title) ? req.body.title : "",
        description: (req.body.description) ? req.body.description : "",
        picture: (req.body.picture) ? req.body.picture : "",
        is_active: (req.body.is_active) ? true : false,
    });

    try {
    	const result = await blogData.save();
    	res.status(200).send({
			"res": "Blog saved successfully!",
			"status": 200
		});
    } catch (err){
    	res.status(500).send({
			"error": err,
			"status": 500
		});
    }
});

exports.update = asyncHandler( async(req, res, next) => {

	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	if(!token) res.status(401).send("token required! ");
	const tok_res = await tokenValid(token);
	if(tok_res) res.status(401).send(tok_res);

	const blogData = {
		title: (req.body.title) ? req.body.title : "",
		description: (req.body.description) ? req.body.description : "",
		is_active: (req.body.is_active) ? true : false,
	};

    try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
		console.log(blogData);
    	if (!blog) return res.status(404).json({ error: 'Blog not found' });
    	res.status(200).send({
			"res": "Blog updated successfully!",
			"record": blog
		});
    } catch (err){
    	res.status(500).send({
			"error": err,
			"status": 500
		});
    }
});

exports.get = asyncHandler( async(req, res, next) => {

    try {
		const blog = await Blog.findOne({ _id: req.params.id});
    	if (!blog) return res.status(404).json({ error: 'Blog not found' });
    	res.status(200).send({
			"res": "Blog found",
			"record": blog
		});
    } catch (err){
    	res.status(500).send({
			"error": err,
			"status": 500
		});
    }
});


exports.delete = asyncHandler( async(req, res, next) => {

	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	if(!token) res.status(401).send("token required! ");
	const tok_res = await tokenValid(token);
	if(tok_res) res.status(401).send(tok_res);

    try {
        const blog = await Blog.findOne({_id : req.params.id });
        if (!blog) return res.status(404).send({ error: 'Blog not found' });
        const del = await blog.deleteOne();
        res.send({ status: 200, message: "blog delete successfully! " });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});