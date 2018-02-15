const Profile = require("../models/Profile");
const ApiService = require("../service/cryptoCompare");
const asyncHandler = require("express-async-handler");
const async = require("async");

/**
 * Get Profiles
 */

exports.getProfiles = asyncHandler(async(req, res, next) => {
      const profiles = await Profile.find().sort({fullName: 1}).select({__v:0})
      
      res.status(200).json(profiles)
})


/**
 * Get Profiles From DataService Then Save
 */

exports.postProfiles = asyncHandler(async (req, res, next) => {
      const profiles = await ApiService.fetchCoinList();
      const bulkInsert = await Profile.insertMany(profiles)

      res.status(200).json(bulkInsert)
})

/**
 * Get Profiles , Options Available
 */

// exports.getProfile = asyncHandler(async(req, res, next) => {
//       const field = req.body.field || {}
//       const selection = req.body.selection || {}
//       const sort = req.body.sort || {fullName: 1}

//       const profiles = await Profile.find(field).sort(sort).select(selection)
//       res.status(200).json(profiles)
// })
/**
 * Profile Schema
 */

// exports.addSnapshots = asyncHandler(async (req, res, next) => {
// const coinList = await ApiService.getCoinList();
//   async function snapShots(coinList) {
//         try{
//               const snapshots = await Promise.all(coinList.map(async (coin) => {
//                   let coinId = coin.coinId
//                   const snap = await ApiService.getSnapshot(coinId)
//                   // console.log(snap)
//                   return snap
//               }))

//               snapshots.forEach(snapShot => {console.log(snapShot) })

//               return snapshots
//         } catch(err) {
//               console.log(err)
//         }
//   }

//   const snaps = await snapShots(coinList)
//   console.log(snaps)

// })

// const url =`https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${coin.coinId}`;

// const funcs = coinList.map(coin => () => getSnapshot(coin.coinId))

// const mergeTwo = (coin, snapShot) => Promise.resolve(Object.assign(coin, snapShot))

// promiseSerial(funcs).then(result => {console.log(result)})
// const Profiles = await coinList.reduce((promiseChain, currentCoin) => {
//       let func = new Promise((resolve,reject) => {
//             try {
//                   getFullProfile(currentCoin).then(mergeObj => {
//                         resolve(mergeObj)
//                   })

//             } catch(err) {
//                   reject(err)
//             }
//       })
//       promiseChain.push(func)
//       return promiseChain
// },[])

// Promise.all(Profiles).then(result => {
//       console.log(result)
// })

// const coinList = response.data.coinList

// const Profile = await getFullProfile(coinList[0])
// console.log(Profiles)

// async function getSnapshots(coinList) {
//       return await coinList.reduce(async (funcList, coin) => {
//             let snapShot =
//       },[])
// }
//       return await ApiService.getSnapShot(coinId)

// const promisfy = function(fn) {
//       return new Promise((resolve, reject) => {
//             try{
//                   fn().then(data => {
//                         resolve(data)
//                   })
//             } catch(err) {
//                   reject(err)
//             }
//       })
// }

// const promiseList = coinList.



// const coinSymbols = response.coinSymbols

// res.status(200).json({
//       status: 'successful',
//       data: {
//             coinList: response.coinList,
//             coinSymbols: response.coinSymbols
//       }
// })
