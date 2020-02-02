const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    text: {
        type: String,
        required: true,
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model ('Schedule', ScheduleSchema);