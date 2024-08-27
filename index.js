const express = require('express');
const {connectToMongoDB} = require('./connect');
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

    

app.use('/url', urlRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});