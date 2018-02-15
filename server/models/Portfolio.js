const mongoose = require("mongoose")
const Schema = mongoose.Schema
const HoldingSchema = require("./Holding")
const ApiService = require("../service/cryptoCompare")

const PortfolioSchema = new Schema({
	name: {
		type: String,
		required: true,
		toLowerCase: true
	},
	totalValue: {
		type: Number,
		default: 0
	},
	totalCoins: {
		type: Number,
		default: 0
	},
	lastUpdate: {
		type: Date,
		default: Date.now()
	},
	holdings: [HoldingSchema]
})

PortfolioSchema.statics = {

	/**
   * Update Portfolio and Holdings
   *
   * @param {id} String
   * @api private
   */

	updatePortfolio: async function(id) {
		
		const portfolio = await this.findById(id)
		const holdingList = portfolio.holdings
		
		const symbolList = await holdingList.reduce((result, holding) => {
			result.push(holding.symbol)
			return result
		}, [])
		
		const prices = await ApiService.getPrices(symbolList)

		const updateAll = await holdingList.reduce(async (result, holding) => {
			let coin = portfolio.holdings.id(holding._id)
			let price = prices[holding.symbol]["USD"]
			let amount = coin.amount
			let marketValue = price * amount
			coin.price = price
			coin.marketValue = marketValue

			result.push({
				[holding.symbol]: {
					price: price,
					marketValue: marketValue
				}
			})
			return result
		}, [])

		const calcTotals = await holdingList.reduce(
			(result, holding) => {
				result.totalCoins += 1
				result.totalValue += holding.marketValue
				return result
			},
			{ totalValue: 0, totalCoins: 0 }
		)

		portfolio.totalCoins = calcTotals.totalCoins
		portfolio.totalValue = calcTotals.totalValue

		return await portfolio.save()
	
	},

	/**
   * Update Totals
   *
   * @param {id} String
   * @api private
   */

	updateTotals: async function(id) {
		const portfolio = await this.findById(id)
		const holdings = portfolio.holdings

		const calcTotals = await holdings.reduce(
			(calcs, curr) => {
				calcs.totalCoins += 1
				calcs.totalValue += curr.marketValue
				return calcs
			},
			{ totalValue: 0, totalCoins: 0 }
		)

		console.log(calcTotals)
		portfolio.totalCoins = calcTotals.totalCoins
		portfolio.totalValue = calcTotals.totalValue

		return await portfolio.save()
	},

	/**
   * Update Totals
   *
   * @param {id} String
   * @api private
   */

	updateHoldings: async function(id) {
		const portfolio = await this.findById(id)
		const holdingList = portfolio.holdings
		const symbolList = await holdingList.reduce((result, holding) => {
			result.push(holding.symbol)
			return result
		}, [])
		const prices = await ApiService.getPrices(symbolList)

		const updateAll = await holdingList.reduce((result, holding) => {
			let coin = portfolio.holdings.id(holding._id)
			let price = prices[holding.symbol]["USD"]
			let amount = coin.amount
			let marketValue = price * amount

			coin.price = price
			coin.marketValue = marketValue

			result.push({
				[holding.symbol]: {
					price: price,
					marketValue: marketValue
				}
			})
			return result
		}, [])


		return await portfolio.save()
	},
	getHoldingList: async function(opts) {
		const projection =
			opts.noId === true ? { holdings: 1, _id: 0 } : { holdings: 1 }

		const portfolio = await this.find({ _id: opts.id }, projection)
		const holdingList = portfolio[0].holdings

		if (opts.noId) {
			const symbolList = await holdingList.reduce(
				(result, holding) => {
					result.push(holding.symbol)
					return result
				},
				[]
			)

			return symbolList
		}

		return holdingList
	}
}

const Portfolio = mongoose.model("Portfolio", PortfolioSchema)

module.exports = Portfolio
