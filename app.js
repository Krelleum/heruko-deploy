const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// IMPORT ROUTES
const createPostRoute = require('./api/routes/createpostroute');
const userRoute = require('./api/routes/userroute');
const commentRoute = require('./api/routes/commentsroute');
const imageRoute = require('./api/routes/imagesroute');


// Path from Mern Heroku Deploy Tutorial
//
//
const path = require("path")
// Connect to Mongo
mongoose.connect('mongodb://TheMongoExpress:TheMongoExpress@ds251598.mlab.com:51598/mongoexpress', err => {

if (err) {
  return console.log('there was a problem' + err);
}
console.log('connected!');
}
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS HANDLER

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// from Mern Heroku Deploy Tutorial
app.use(express.static(path.join(__dirname, "client", "build")))
// MIDDLEWARE ---- alle Requests müssen durch eine Middlewarefunktion. Sobald ein Request reinkommt
// kann ich hier eine Response zurücksenden. Ich kann den Request aber auch in der Funktion bearbeiten
// Registrierung der Routen!
app.use('/createpost', createPostRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);
app.use('/image', imageRoute);


app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;

    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
