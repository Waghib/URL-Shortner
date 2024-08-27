const shortid = require('shortid')
const URL = require('../models/url')


async function handleGenerateNewShortUrl(req, res) {

    const body = req.body;
    if (!body.url) return res.status(400).json({ message: 'URL is required' });


    const shortId = shortid;
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ Id: shortId });
}

module.exports = {handleGenerateNewShortUrl};