const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommuneSchema = new Schema({
    nom: String,
    codeCommune: String,
    popmun:Number | String,
    poppart:Number | String,
    poptotal: Number | String,
    latitude: String,
    longitude: String,
    politics: [{ type: Schema.Types.ObjectId, ref: 'Lrem' }],
})

module.exports = mongoose.model('Commune', CommuneSchema);
