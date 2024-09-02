const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect');

const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth');

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortid = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortid
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })
        res.redirect(entry.redirectUrl);
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});