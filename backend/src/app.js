const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
const authRoutes = require('./route/auth.route');
const postRoutes = require('./route/post.route');

app.use(express.json());
app.use(cookieparser());

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


module.exports = app;