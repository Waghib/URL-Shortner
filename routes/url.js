const express = require('express');
const { handleGenerateNewShortUrl, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

// POST /url
router.post('/', handleGenerateNewShortUrl);
// GET /url/analytics/:shortId
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;