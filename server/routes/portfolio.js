const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/Portfolio");
const DataService = require("../controllers/api/cryptoCompare");

//Find all Portfolios
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.find();

    res.status(200).json(portfolio);
  })
);

//Raname field all Portfolios
router.put("/", asyncHandler(async (req, res, next) => {
    const field = req.body.update.field
    const update = await Portfolio.updateMany({}, {$rename: {field: req.body.update.new}});

    res.status(200).json(update);
  })
);


//Create Portfolio
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const portfolio = new Portfolio(req.body.portfolio);
    const newPortfolio = await portfolio.save();

    res.status(200).json(newPortfolio);
  })
);

//Get Portfolio By Id
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findById(req.params.id);
    const calcStats = await portfolio.holdings.reduce((sum, holding) => {
        sum.totalValue += holding.marketValue
        sum.count += 1
        return sum
    }, {totalValue: 0, count: 0})
    portfolio.totalValue = calcStats.totalValue
    portfolio.totalCoins = calcStats.count

    res.status(200).json(portfolio);
  })
);

//Update Portfolio By Id
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body.update
    );

    res.status(200).json(portfolio);
  })
);

//Delete Portfolio By Id
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const deleted = await Portfolio.findByIdAndRemove(req.params.id);

    res.status(200).json(deleted);
  })
);

//Add Holding By Id
router.post(
  "/:id/holding",
  asyncHandler(async (req, res, next) => {
    console.log(req.params.id);

    const symbol = req.body.symbol.toUpperCase();
    const amount = req.body.amount;
    const exchange = req.body.exchange.toUpperCase();
    const priceData = await DataService.fetchPrice([symbol]);
    const price = priceData["USD"];
    const marketValue = amount * price;

    const holding = await Portfolio.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          holdings: {
            symbol: symbol,
            amount: amount,
            exchange: exchange,
            price: price,
            marketValue: marketValue
          }
        }
      },
      { new: true }
    );

    res.status(200).json(holding);
  })
);

//Get Holding By Id
router.get(
  "/:id/holding/:symbol",
  asyncHandler(async (req, res, next) => {
    const query = { _id: req.params.id };
    const projection = {
      holdings: {
        $elemMatch: {
          symbol: req.params.symbol
        }
      }
    };
    const result = await Portfolio.find(query, projection);
    const holding = result[0]["holdings"][0];

    res.status(200).json(holding);
  })
);

//Update Holding By Id
router.put(
  "/:id/holding/:symbol",
  asyncHandler(async (req, res, next) => {
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    const holding = await Portfolio.update(
      { _id: req.params.id, "holdings.symbol": req.params.symbol },
      {
        $set: {
          "holdings.$.amount": req.body.update.amount,
          "holdings.$.exchange": req.body.update.exchange
        }
      },
      {
        upsert: true
      }
    );
    res.status(200).json(holding);
  })
)

//Delete Holding By Id
router.delete("/:id/holding/:symbol", asyncHandler(async (req, res, next) => {
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    const holdingRemoval = await Portfolio.findOneAndUpdate({ _id: req.params.id },{$pull: {holdings: { symbol: req.params.symbol }}},{safe: true})
    res.status(200).json(holdingRemoval)
  })
)

module.exports = router;
