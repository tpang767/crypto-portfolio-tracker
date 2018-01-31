const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataService = require('../service/cryptoCompare')

const HoldingObj = {
    symbol: { 
        type: String, 
        required: true,
        unique: true, 
        toUpperCase: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    exchange: String,
    marketValue: Number,
    price: Number,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: Date
}

const PortfolioObj = {
  name: {
    type: String,
    required: true,
    toLowerCase: true
  },
  value: {
    type: Number,
    default: 0
  },
  holdings: [ HoldingObj ]
}

const HoldingSchema = new Schema(HoldingObj)
const PortfolioSchema = new Schema(PortfolioObj)

PortfolioSchema.query.byHolding = function(id, symbol) {
  return this.find({_id: id}, {
    "holdings": {
      $elemMatch: {
        symbol: symbol
      }
    }
  })
}

const Holding = mongoose.model("Holding", HoldingSchema);
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);





// const holdingsArray = () => {
  // return holdings.reduce((holdings, coin) => {
  //   return holdings.push(coin.symbol)
  // },[])
// }



module.exports = Portfolio

// PortfolioSchema.query.byName = function(name) {
//   return this.find({ name: name })
// }
