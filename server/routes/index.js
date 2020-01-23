const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach(file => {
    console.log('READ ROUTE::', file);
    routes = routes.concat(require(`./${file}`))
})

module.exports = routes;
