const mongoose = require('mongoose')
const formatDateStamp = require('../utils/date-format')
const reactionSchema = require('./reaction-model')
    
const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280},
    createdAt: { type: Date, default: Date.now, get: date => formatDateStamp(date) },
    username: {type: String, required: true},
    reactions: [reactionSchema]
},{
    toJSON:{
        virtuals:true
    },
    id:false
})
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = Thought