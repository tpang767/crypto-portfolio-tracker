const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HoldingSchema = new Schema({
  coinName: {
    type:String
  },
	symbol: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	marketValue: Number,
	price: {
		type: Number
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = HoldingSchema

// HoldingSchema.statics.updateAll = async function updateAll(id) {
//   const holdings = await this.find({owner: id}, 'symbol amount price marketValue')
//   holdings.map(holding => {

//   })
//   const updates = await ApiService.fetchPrice()
// }
