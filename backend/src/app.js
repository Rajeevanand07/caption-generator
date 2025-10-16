const express = require('express');
const authRoutes = require('./route/auth.route');
const cookieparser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use('/api/auth', authRoutes);


module.exports = app;