const PoliticModel = require('../models/lrem.model');

module.exports = [
    {
        method: "GET",
        path: "/lrem",
        handler: async (request, h) => {
            try {
                const allLrem = await PoliticModel.find().exec();

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
                if (!id)
                    return h.response(error).code(500)
                const fiche = await PoliticModel.findById(id).exec();

                return h.response(fiche);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "GET",
        path: "/lrem/commune",
        handler: async (request, h) => {
            try {
                let code = request.query.codeCommune;
                let query = {codeCommune: code}

                let lrems = await PoliticModel.find(query).exec();
                return h.response(JSON.stringify(lrems)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    },
    {
        method: "GET",
        path: "/lrem/search",
        handler: async (request, h) => {
            try {
                let {search, hiddenLrem} = request.query;

                let query = {}
                if (search) {
                    search = search.toLowerCase().trim();
                    query = {...query, nom: new RegExp(search, 'i')}
                }
                if (hiddenLrem) {
                    query = {...query, hiddenLrem: hiddenLrem === 'true'}
                }

                let lrem = await PoliticModel.find(query).exec();
                return h.response(JSON.stringify(lrem)).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    },
    {
        method: "POST",
        path: "/lrem",
        handler: async (request, h) => {
            try {
                const newPolitic = new PoliticModel({...request.payload})
                const req = await newPolitic.save();
                return h.response(req).code(200);
            } catch(error) {
                h.response(error).code(404)
            }
        }
    }
]
