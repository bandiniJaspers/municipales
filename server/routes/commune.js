const CommuneModel = require('../models/commune.model');
const PoliticModel = require('../models/lrem.model');

module.exports = [
    {
        method: "GET",
        path: "/commune",
        handler: async (request, h) => {
            try {
                const allCommune = await CommuneModel.find().exec();
                return h.response(allCommune);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "GET",
        path: "/commune/search",
        handler: async (request, h) => {
            try {
                let {search, hiddenLrem} = request.query;
                console.log("Query::", request.query);
                let populate = {path: 'lrems', match:{hiddenLrem:true}}
                let query = {}
                if (search) {
                    search = search.toLowerCase().trim();
                    query = {...query, nom: new RegExp(search, 'i')}
                }
                if (hiddenLrem) {
                   populate = {...populate, match:{hiddenLrem:true}}
                }
                const commune = await CommuneModel.find(query).populate(populate).exec();
                if (commune.length > 0)
                    console.log("Commune::", commune.length, commune[0]);
                else
                    console.log("lookupnotworking")
                return h.response(JSON.stringify(commune)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    }
]
