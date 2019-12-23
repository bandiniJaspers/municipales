const LremModel = require('../models/lrem.model');

module.exports = [
    {
        method: "GET",
        path: "/lrem",
        handler: async (request, h) => {
            try {
                const allLrem = await LremModel.find().exec();
                return h.response(allLrem);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "GET",
        path: "/lrem/{id}",
        handler: async (request, h) => {
            try {
                const id = request.params.id;
                const fiche = await LremModel.findById(id).exec();
                return h.response(fiche);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "GET",
        path: "/lrem/search",
        handler: async (request, h) => {
            try {
                let search = request.query.search;
                search = search.toLowerCase().trim();

                let query = {nom: new RegExp(search, 'i')}

                let lrem = await LremModel.find(query).exec();

                return h.response(JSON.stringify(lrem)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    }
]
