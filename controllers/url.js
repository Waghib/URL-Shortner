const {nanoid} = require('nanoid')
const URL = require('../models/url')


async function handleGenerateNewShortUrl(req, res) {

    const body = req.body;
    if (!body.url) return res.status(400).json({ message: 'URL is required' });


    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ Id: shortId });
}

module.exports = {handleGenerateNewShortUrl};