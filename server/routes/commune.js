const CommuneModel = require('../models/commune.model');

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
                let search = request.query.search;
                console.log("commune search::", search)
                search = search.toLowerCase().trim();

                let query = {nom: new RegExp(search, 'i')}

                let commune = await CommuneModel.find(query).exec();

                return h.response(JSON.stringify(commune)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    }
]
