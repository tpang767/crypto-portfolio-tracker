const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
      firstName: String,
      lastName: String,
      email: String,
      portfolio: {
            type: Schema.Types.ObjectId,
            ref: 'Portfolio'
      },
      createdAt: {
            type: Date,
            default: Date.now()
      }
})

const User = mongoose.model('User', UserSchema)
module.exports = User

// HoldingSchema.statics.updateAll = async function updateAll(id) {
//   const holdings = await this.find({owner: id}, 'symbol amount price marketValue')
//   holdings.map(holding => {

//   })
//   const updates = await ApiService.fetchPrice()
// }
