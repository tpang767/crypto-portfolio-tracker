// const asyncHandler = require('express-async-handler')
// const Transaction = require('../../models/Transaction')
// const Portfolio = require('../../models/Portfolio')

// exports.addTransaction = asyncHandler(async(req, res, next) => {
//     const transaction = new Transaction(req.body.transaction)
//     transaction._portfolio = req.query.id
    
//     const newAdd = await transaction.save()
    
//     const portfolio = await Portfolio.findByIdAndUpdate(req.query.id,{
//         $addToSet: { transactions: transaction._id }
//     })

//     res.status(200).json(newAdd)
// })

// exports.getAllTransactions = asyncHandler(async(req, res, next) => {
//     const transactions = await Transaction.find({'_portfolio': req.query.id})

//     res.status(200).json(transactions)
// })

// exports.getTransactionById = asyncHandler(async(req, res, next) => {
//     console.log(req.params.id)
//     const transaction = await Transaction.findById(req.params.id)

//     res.status(200).json(transaction)
// })

// exports.deleteTransaction = asyncHandler(async(req, res, next) => {
//     console.log(req.params.id)
//     const transactions = await Transaction.findByIdAndRemove(req.params.id)

//     res.status(200).json(transactions)
// })

// exports.updateTransaction = asyncHandler(async(req, res, next) => {

//     const update = await Transaction.findByIdAndUpdate(req.params.id, req.body.transaction)

//     res.status(200).json(update)
// })

