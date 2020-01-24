const mongoose = require("mongoose");

module.exports = mongoose.model("lrem", {
    nom: {required: true, type:String},
    prenom: {required: true, type:String},
    hiddenLrem:Boolean | null,
    sources: [String] | null,
    affiliation: String | null,
    codeCommune: String | null
})
