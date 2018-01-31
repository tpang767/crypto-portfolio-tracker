const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const Portfolio = require('../models/Portfolio')
const DataService = require('../service/cryptoCompare')

//Find all Portfolios
router.get('/', asyncHandler(async(req, res, next) => {
    const portfolio = await Portfolio.find()
    
    res.status(200).json(portfolio)
}))

//Create Portfolio
router.post('/', asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const portfolio = new Portfolio(req.body.portfolio)
    const newPortfolio = await portfolio.save()
    
    res.status(200).json(newPortfolio)
}))    

//Get Portfolio By Id
router.get('/:id', asyncHandler(async(req, res, next) => {
    const portfolio = await Portfolio.findById(req.params.id)
    
    res.status(200).json(portfolio)
}))

//Update Portfolio By Id
router.put('/:id', asyncHandler(async(req, res, next) => {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body.update)

    res.status(200).json(portfolio)
}))

//Delete Portfolio By Id
router.delete('/:id', asyncHandler(async(req, res, next) => {
    const deleted = await Portfolio.findByIdAndRemove(req.params.id)

    res.status(200).json(deleted)
}))

//Add Holding By Id
router.post('/:id/holding', asyncHandler(async(req, res, next) => {
    console.log(req.params.id)

    const symbol = req.body.symbol.toUpperCase()
    const amount = req.body.amount
    const exchange = req.body.exchange.toUpperCase()
    const priceData = await DataService.fetchPrice([symbol])['USD']
    const price = priceData['USD']
    const marketValue = amount * price

    const holding = await Portfolio.findOneAndUpdate({'_id': req.params.id },
    {$push: { holdings: {
                symbol: symbol,
                amount: amount,
                exchange: exchange,
                price: price,
                marketValue: marketValue
            }
        }
    })
    
    res.status(200).json(holding)
}))

//Get Holding By Id
router.get('/:id/holding/:symbol', asyncHandler(async(req, res, next) => {
    const query = { _id: req.params.id }
    const projection = { 
        "holdings": { 
            $elemMatch: {
                symbol: req.params.symbol
            }
        }
    }
    const result = await Portfolio.find(query, projection)
    const holding = result[0]['holdings'][0]
    
    res.status(200).json(holding)
}))    

//Update Holding By Id
router.get('/:id/holding/:symbol', asyncHandler(async(req, res, next) => {
    console.log('Params:', req.params)
    console.log('Body:', req.body)
    const holding = await Portfolio.update({_id: req.params.id, "holdings.symbol": req.params.symbol},{
            $set: { "holdings.$" : req.body.update}
    }, {
        upsert: true
    })
    res.status(200).json(holding)
}))


module.exports = router


    // marketValue: Number,
    // price: Number,
    // updatedAt: Date