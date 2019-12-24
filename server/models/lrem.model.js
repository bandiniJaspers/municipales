const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LremSchema = new Schema({
    nom: {required: true, type:String},
    prenom: {required: true, type:String},
    sedissimule:Boolean | null,
    sources: [String] | null,
    affiliation: String | null,
    commune: String | null
})

module.exports = mongoose.model('Lrem', LremSchema);
