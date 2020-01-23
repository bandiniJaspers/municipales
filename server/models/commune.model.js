const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommuneSchema = new Schema({
    nom: String,
    codeCommune: String,
    popmun:Number | String,
    poppart:Number | String,
    poptotal: Number | String,
})

module.exports = mongoose.model('Commune', CommuneSchema);
