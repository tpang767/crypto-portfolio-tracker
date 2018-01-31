// const asyncHandler = require('express-async-handler')
// const Portfolio = require('../../models/Portfolio')

// // CREATE PORTFOLIO
// exports.createPortfolio = asyncHandler(async(req, res, next) => {
//     console.log(req.body)
//     const portfolio = new Portfolio(req.body.portfolio)
//     const newPortfolio = await portfolio.save()
    
//     res.status(200).json(newPortfolio)
// })

// // READ PORTFOLIO
// exports.getAllPortfolios = asyncHandler(async(req, res, next) => {
//     const portfolio = await Portfolio.find()
    
//     res.status(200).json(portfolio)
// })

// exports.getPortfolioById = asyncHandler(async(req, res, next) => {
//     const portfolio = await Portfolio.findById(req.query.id)
    
//     res.status(200).json(portfolio)
// })

// // UPDATE PORTFOLIO
// exports.updatePortfolio = asyncHandler(async(req, res, next) => {
//     // const update = req.body.update
//     const portfolio = await Portfolio.findByIdAndUpdate(req.query.id, req.body.update)

//     res.status(200).json(portfolio)
// })

// // DELETE
// exports.deletePortfolio = asyncHandler(async(req, res, next) => {
//     console.log(req.querys)
//     const deleted = await Portfolio.findByIdAndRemove(req.query.id)

//     res.status(200).json(deleted)
// })
