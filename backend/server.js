const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => { console.log('Database connected.') });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development'){
    app.use(cors({ origin: `${process.env.DATABASE_CLOUD}` }));
}

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || '8000';
app.listen(port, () => {
    console.log(`Server run on port ${port}`);
});