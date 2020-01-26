const mongoose = require("mongoose");
const Schema = mongoose.Schema



module.exports = mongoose.model("Lrem", {
    nom: String | null,
    prenom: String | null,
    commune: String | null,
    hiddenLrem:Boolean | null,
    vote: Number,
    sources: [String] | null,
    affiliation: String | null,
    codeCommune: String | null
})
