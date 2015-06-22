#!/usr/local/bin/node

/**
 *  @name app.js
 *  @summary demo app for Nordstrom project
 *  @author Nils Whitmont <nils.whitmont@gmail.com>
 *
 */


// INIT NODE MODULES
var Hapi = require('hapi'),
    path = require('path'),

// INIT LOCAL MODULES
    productsController = require('./lib/productsController'),
    apiController = require('./lib/apiController'),

// INIT SERVER
    server = new Hapi.Server();

// INIT SERVER PORT
server.connection({ port: 3030 });

// INIT VIEW ENGINE
server.views({
    engines: { html: require('handlebars') },
    path: './views',
    layoutPath: './views/layout',
    layout: 'default'
});


// INIT ROUTE DEFINITIONS
var appRoutes = [
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
    },
    // ROUTE STATIC ASSETS
    {
        method: 'GET',
        path: '/static/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: false
            }
        }
    },
    // APP ROUTES
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