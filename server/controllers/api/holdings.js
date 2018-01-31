// const asyncHandler = require('express-async-handler')
// const Portfolio = require('../models/Portfolio')
// const Holding = require('../models/Holding')
// // CREATE
// exports.addHolding = asyncHandler(async(req, res, next) => {
//     const portfolio = await Portfolio.findOne({name: req.params.name})
    
//     portfolio.holdings.push(req.body.holding)

//     const newAdd = await portfolio.save()
    
//     res.status(200).json(newAdd)
// })
// // READ
// exports.getAllHolding = asyncHandler(async(req, res, next) => {
//     const projection = {holdings: 1, _id:0}
//     const portfolio = await Portfolio.findOne({},projection).byName(req.params.name)
    
//     res.status(200).json(portfolio[0].holdings)
// })


// // UPDATE 
// exports.updateHolding = asyncHandler(async(req, res, next) => {
//     console.log(req.params.symbol)
    
//     const newUpdate = await Holding.findOneAndUpdate(
//         { "symbol": req.params.symbol.toLowerCase() }, 
//         { $set: req.body.update }, 
//         { returnNewDocument: true }
//     )
    
//     res.status(200).json(newUpdate)
// })

// // DELETE
// exports.deleteHolding = asyncHandler(async(req, res, next) => {
//     console.log(req.params.symbol)

//     const deletion = await Holding.findOneAndDelete({ "symbol": req.params.symbol.toLowerCase() })
    
//     res.status(200).json(deletion)
// })
