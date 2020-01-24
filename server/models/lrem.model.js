const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LremSchema = new Schema({
    nom: {required: true, type:String},
    prenom: {required: true, type:String},
    hiddenLrem:Boolean | null,
    sources: [String] | null,
    affiliation: String | null,
    codeCommune: String | null
})

module.exports = mongoose.model('Lrem', LremSchema);

/*
nom:data.Prenom,
        prenom:data.Nom,
        hiddenLrem:data.hiddenLrem,
        sources:data.sources,
        codeCommune: data.codeCommune,
        affiliation:data.affiliation
 */
