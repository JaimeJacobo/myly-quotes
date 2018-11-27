


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
name: String,
song: String,
artist: String}, {timestamps: true})

module.exports = mongoose.model('Quote', quoteSchema);