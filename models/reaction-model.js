const mongoose = require('mongoose')
const formatDateStamp = require('../utils/date-format')
    
const reactionSchema = new mongoose.Schema({
    reactionId: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Schema.Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280},
    username: {type: String, required: true},
    createdAt: { type: Date, default: Date.now, get: date => formatDateStamp(date) },
},{
    toJSON:{
        virtuals:true
    },
    id:false
})

module.exports = reactionSchema