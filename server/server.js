const Hapi = require("@hapi/hapi");
const next = require("next");
const Mongoose = require("mongoose");
const routes = require('./routes/index');

const { defaultHandlerWrapper, nextHandlerWrapper, pathWrapper} = require('./nextWrapper');
const app = next({dev: true})
const server = new Hapi.Server({host:process.env.HOST, port:process.env.PORT, routes:{cors:true}});

Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);

server.route(routes.concat(
    {
        method: "GET",
        path:"/{p*}",
        handler: defaultHandlerWrapper(app)
    },
    {
        method: 'GET',
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app),
    },
    {
        method: "GET",
        path: "/fiche/{id}",
        // This method get the request from the client and return
        // the result of the about.js file
        handler: async (request, h) => {
            return pathWrapper(app, "/fiche")
        }
    }
));

(async () => {
    await app.prepare();


    await server.start();
    console.log('Server running on %s', server.info.uri);
})();
