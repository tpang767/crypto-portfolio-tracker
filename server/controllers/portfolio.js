const Portfolio = require('../models/Portfolio')
const asyncHandler = require('express-async-handler')
const ApiService = require('../service/cryptoCompare')

exports.getPortfolio = asyncHandler(async(req, res, next) => {
      const portfolio = await Portfolio.find({})
      res.status(200).json(portfolio)
})

exports.getPortfolioById = asyncHandler(async(req, res, next) => {
      const updateHoldings = await Portfolio.updateHoldings(req.params.id)
      const updateTotals = await Portfolio.updateTotals(req.params.id)
      const portfolio = await Portfolio.findById(req.params.id)
      res.status(200).json(portfolio)
})

exports.createPortfolio = asyncHandler(async(req, res, next) => {
      console.log(req.body)
      const portfolio = new Portfolio(req.body.portfolio)
      const newPortfolio = await portfolio.save()
      res.status(200).json(newPortfolio)
})

exports.updatePortfolio = asyncHandler(async(req, res, next) => {
      const update = await Portfolio.updateOne(
            {'_id': req.params.id}, 
            {$set: req.body.update},
            { new: true}
      )
      res.status(200).json(update)
})

exports.deletePortfolio = asyncHandler(async(req, res, next) => {
      const deletion = await Portfolio.findByIdAndRemove(
            {'_id': req.body.delete}
      )
      res.status(200).json(deletion)
})