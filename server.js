#!/usr/local/bin/node

/**
 *  @name server.js
 *  @summary demo app for Norstrom project
 *  @author Nils Whitmont <nils.whitmont@gmail.com>
 *
 */


// INIT NODE MODULES
var Hapi = require('hapi'),
    path = require('path'),

// INIT LOCAL MODULES
    productsController = require('./lib/productsController');


// INIT SERVER
var server = new Hapi.Server();

server.connection({ port: 3000 });

// INIT VIEW ENGINE
server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: './views'
});

// INIT ROUTE DEFINITIONS
var routes = [
    // handle static assets, img etc.
    {
        method: 'GET',
        path: '/static/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: true,
                index: false
            }
        }
    },
    // app index page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            var context = {
                pageTitle: 'Nordstrom Demo',
                welcomeMessage: 'Hello Nordstrom Team!'
            }
            reply.view('index', context);
        }
    },
    {
        method: 'GET',
        path: '/api/v1/products',
        config: productsController.getAllProducts
    },
    {
        method: 'GET',
        path: '/products',
        config: productsController.viewAllProducts
    },
    {
        method: 'GET',
        path: '/api/v1/product/{id}',
        config: productsController.getProductById
    }
];

// LOAD SERVER ROUTES
server.route(routes);

// START SERVER
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
// END OF LINE