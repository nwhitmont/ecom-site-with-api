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
    productsController = require('./lib/productsController'),
    apiController = require('./lib/apiController');

// INIT SERVER
var server = new Hapi.Server();

server.connection({ port: 3000 });

// INIT VIEW ENGINE
server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    layout: 'default'
});

// INIT ROUTE DEFINITIONS
var appRoutes = [
    // ROUTE STATIC ASSETS
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
    // APP ROUTES
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
        path: '/products',
        config: productsController.viewAllProducts
    },
    {
        method: 'GET',
        path: '/product/{id}',
        config: productsController.viewProductById
    },
    // API ROUTES
    {
        method: 'GET',
        path: '/api/v1/products',
        config: apiController.getAllProducts
    },
    {
        method: 'GET',
        path: '/api/v1/product/{id}',
        config: apiController.getProductById
    }
];

// LOAD SERVER ROUTES
server.route(appRoutes);

// START SERVER
server.start(function () {
    // debug info
    console.log('Server running at:', server.info.uri);
});

// END OF LINE