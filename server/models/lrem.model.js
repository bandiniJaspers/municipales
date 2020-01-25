const mongoose = require("mongoose");

module.exports = mongoose.model("lrem", {
    nom: {required: true, type:String},
    prenom: {required: true, type:String},
    commune: String | null,
    hiddenLrem:Boolean | null,
    sources: [String] | null,
    affiliation: String | null,
    codeCommune: String | null
})
