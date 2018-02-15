"use strict"
const mongoose = require("mongoose")
const Schema = mongoose.Schema
/**
 * Profile Schema
 */
const ProfileSchema = new Schema({
	coinId: {
		type: String,
		unique: true
	},
	websiteUrl: String,
	imageUrl: String,
	name: String,
	fullName: String,
	symbol: String,
	description: String,
	features: String,
	technology: String,
	algorithm: String,
	proofType: String,
	totalProfileSupply: String,
	startDate: Date,
	twitter: String,
	affiliateUrl: String,
	website: String,
	lastBlockExplorerUpdateTS: String,
	difficultyAdjustment: String,
	blockRewardReduction: String,
	blockNumber: Number,
	blockTime: Number,
	netHashesPerSecond: Number,
	totalProfilesMined: Number,
	blockReward: Number
})

/**
 * Statics
 */

ProfileSchema.statics = {
	load: async function(options) {
		const criteria = options.criteria || {}
		const select = options.select || {}
		const params = { criteria, select }

		return await this.find(params)
	}
}
/**
 * Virtual Methods
 */

// ProfileSchema.virtual("snapshot").get(function() {

//   return `${config.snapshotFull}` + `${this.ProfileId}`

// })

/**
 * Custom Query Methods
 */

ProfileSchema.query.bySymbol = async function(symbol) {
	return await this.find({ symbol: symbol })
}

/**
 * Instance Methods
 */

ProfileSchema.methods = {}

const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile
