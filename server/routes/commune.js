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

                let query = {};

                if (search) {
                    search = search.toLowerCase().trim();
                    query = {...query, nom: new RegExp(search, 'i')}
                }

                if (hiddenLrem) {
                    query = {...query, "politics.0": {$exists:true}}
                }
                let communes;
                if (!hiddenLrem)
                    communes = await CommuneModel.find(query).populate('politics').limit(100).exec();
                else {
                    communes = await CommuneModel.find(query).populate('politics').exec();
                    communes = communes.filter((c) => c.politics.findIndex((p) => p.hiddenLrem === true) > -1);
                }
                return h.response(JSON.stringify(communes)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    }
]
