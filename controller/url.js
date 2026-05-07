const { nanoid } = require("nanoid")
const URL = require('../models/ulr')

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if(!body.url) return res.status(400).json({error: 'url is required'})
   const shortID = nanoid(4)
   await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
   });
   return res.json({id:shortID})
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId})
  return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
}