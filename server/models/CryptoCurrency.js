const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoCurrencySchema = new Schema({
    market: String,
    symbol: String,
    denomination: String,
    price: Number,
    lastUpdate: Date,
    lastvolume: Number,
    lastvolumeto: Number,
    volumeDay: Number,
    volumeDayTo: Number,
    volume24Hour: Number,
    volume24HourTo: Number,
    openDay: Number,
    highDay: Number,
    lowDay: Number,
    open24Hour: Number,
    high24Hour: Number,
    low24Hour: Number
})

const CryptoCurrency = mongoose.model("CryptoCurrency", CryptoCurrencySchema);