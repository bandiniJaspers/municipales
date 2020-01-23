const Hapi = require("@hapi/hapi");
const next = require("next");
const path = require('path');
const Inert = require("@hapi/inert");
const Mongoose = require("mongoose");
const routes = require('./routes/index');
console.log("Routes::", routes);
const { defaultHandlerWrapper, nextHandlerWrapper, pathWrapper} = require('./nextWrapper');
const app = next({dev: true})

const server = new Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        },
        cors: true
    }
})

console.log("AssetPatsddsh::", path.join(__dirname, 'public'))
Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);
console.log("Servesddsr Read::");
(async () => {
    await server.register(Inert);

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
            // the result of the fiche.js file
            handler: async (request, h) => {
                return pathWrapper(app, "/fiche")
            }
        },
        /*{
            method: "GET",
            path: "/admin",
            handler: async (request, h) => {
                console.log("Get admin pagdsdse")
                return pathWrapper(app, "/admin")
            }
        },*/
        {
            method: 'GET',
            path: '/public/{file*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true,
                }
            }
        }
    ));

    await app.prepare();


    await server.start();
    console.log('Server runnidsng on %s', server.info.uri);
})();
