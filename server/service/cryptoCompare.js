const axios = require("axios");
const config = require("./config");
const async = require('async')
/**
 * Get Price
 */

exports.getPrice = async (coinSymbol) => {
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbol}&tsyms=USD`
  const apiCall = await axios.get(url)
  const result = apiCall.data
  const price = result[`${coinSymbol}`]['USD']
  console.log(price)
  return price
}
/**
 * Get Prices
 */

exports.getPrices = async (coinList) => {
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD`
  const apiCall = await axios.get(url)
  
  return apiCall.data
}

/**
 * Get CoinList
 */

exports.fetchCoinList = async () => {
  const url = 'https://www.cryptocompare.com/api/data/coinlist/'
  const apiCall = await axios.get(url)
  const data = apiCall.data
  
  return await getCoinArray(data);

  async function getCoinArray(result) {
    const data = result["Data"];
    const symbols = Object.keys(data);

    const coinList = await symbols.reduce((coins, name) => {
      let profile = data[name];
      coins.push({
        coinId: profile["Id"],
        url: profile["Url"],
        imageUrl: profile["ImageUrl"],
        name: profile["Name"],
        symbol: profile["Symbol"],
        coinName: profile["CoinName"],
        fullName: profile["FullName"],
        algorithm: profile["Algorithm"],
        proofType: profile["ProofType"],
        totalCoinSupply: profile["totalCoinSupply"]
      });
      return coins;
    }, []);

    return coinList
  }
}

// /**
//  * Get Snapshots
//  */

// exports.getSnapshot = async (coinId) => {
//     const url = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${coinId}`
//     return await axios.get(url)
//         .then(response => {
//             const data = response.data['Data']['General']
//             return {
//                 startDate: data["StartDate"],
//                 twitter: data["Twitter"],
//                 affiliateUrl: data["AffiliateUrl"],
//                 website: data["Website"],
//                 lastBlock: data["LastBlockExplorerUpdateTS"],
//                 diffAdjustment: data["DifficultyAdjustment"],
//                 blockRewardReduction: data["BlockRewardReduction"],
//                 blockNumber: data["blockNumber"],
//                 blockTime: data["BlockTime"],
//                 netHashesPerSec: data["NetHashesPerSecond"],
//                 totalCoinsMined: data["TotalCoinsMined"],
//                 blockReward: data["BlockReward"]
//             }
//     })
// }

