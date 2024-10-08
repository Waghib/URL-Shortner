const shortid = require("shortid");
const URL = require("../models/url");

// function to handle the generation of a new short URL
async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortId });
}

// function to handle the retrieval of analytics for a short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId: shortId });
  if (!result) return res.status(404).json({ message: "Short URL not found" });
  return res.json({
    totalVisits: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
const shortId = shortid.generate();
