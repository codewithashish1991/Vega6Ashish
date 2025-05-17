const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ashishkumarbijalwan786:B1PaoJS5jm892ZNm@test.cafebhe.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});