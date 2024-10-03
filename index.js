const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect');

// middlewares
const {checkForAuthentication, restrictTo} = require('./middlewares/auth');

// models
const URL = require('./models/url');

// routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 3000;

// Connect to MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(checkForAuthentication);

// Routes
app.use('/url',restrictTo(["NORMAL", "ADMIN"]) ,urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

// Redirect to the original URL
app.get('/url/:shortId', async (req, res) => {
    const shortid = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true } // This option returns the updated document
        );

        if (!entry) {
            return res.status(404).send('URL not found');
        }

        res.redirect(entry.redirectUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});