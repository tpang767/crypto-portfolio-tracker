const Portfolio = require("../models/Portfolio")
const Profile = require("../models/Profile")
const Holding = require("../models/Holding")
const asyncHandler = require("express-async-handler")
const ApiService = require("../service/cryptoCompare")

/**
 * Get All holdings
 */

exports.getHoldings = asyncHandler(async (req, res, next) => {
	const portfolio = await Portfolio.find({})

	res.status(200).json({
		status: "successful",
		data: portfolio
	})
})

/**
 * Get Holding By Id
 */

exports.getHoldingById = asyncHandler(async (req, res, next) => {
const result = await Portfolio.find(
    {
	  _id: req.params.id,
        'holdings.symbol': req.params.symbol
    },
    {
        'holdings.$': 1,
	  '_id': 0
    }
)

const holding = result[0].holdings[0]

	res.status(200).json(holding)
})

/**
 * Add Holding
 */

exports.postHolding = asyncHandler(async (req, res, next) => {
	
	const symbol = req.body.symbol
	const amount = req.body.amount
	const coinProfile = await Profile.findOne({
		symbol: symbol
	})
	const price = await ApiService.getPrice(symbol)
	const marketValue = amount * price
	const holding = {
            coinName: coinProfile.name,
		symbol: symbol,
		amount: amount,
		price: price,
		marketValue: marketValue
	}

	const insert = await Portfolio.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$addToSet: { holdings: holding },
                  $inc: {totalValue: marketValue, totalCoins: 1}
		},
		{ new: true }
	)
	res.status(200).json(insert)
})

/**
 * Update Holding Filed
 */

exports.updateHolding = asyncHandler(async (req, res, next) => {
	const amount = req.body.update.amount
	const price = await ApiService.getPrice(req.body.update.symbol)
	const marketValue = amount * price
	


      const update = await Portfolio.update(
		{
			_id: req.params.id,
			holdings: {
				$elemMatch: {
					symbol: req.body.symbol
				}
			}
		},
		{
			$set: {
				"holdings.$.amount": amount,
				"holdings.$.price": price,
				"holdings.$.marketValue": marketValue
			}
		}
	)

	res.status(200).json(update)
})

/**
 * Delete Holding By Symbol
 */

exports.deleteHolding = asyncHandler(async (req, res, next) => {
	const deletion = await Portfolio.update(
		{ _id: req.params.id },
		{
			$pull: {
				holdings: {
					symbol: req.body.symbol
				}
			}
		}
	)

	res.status(200).json(deletion)
})
