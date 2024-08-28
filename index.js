const express = require('express');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const urlRoute = require('./routes/url');

const app = express();
const port = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());    

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
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