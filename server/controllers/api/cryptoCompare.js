global.fetch = require('node-fetch')
const cc = require('cryptocompare')

exports.fetchPrice = async (coin, denomination = ['USD']) => {
    return await cc.price(coin, ['USD'])
   
}

exports.fetchPrices = async (coins, denomination = ['USD']) => {
    return await cc.priceMulti(coins, denomination)
}