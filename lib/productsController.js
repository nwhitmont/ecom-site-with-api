#!/usr/local/bin/node

/**
*   @name productsController.js
*   @summary controller for product views
*   @author Nils Whitmont <nils.whitmont@gmail.com>
*
*/


// INIT NODE MODULES
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),

// INIT LOCAL MODULES
    apiController = require('./apiController'),
    dbController = require('./dbController'),

// INIT LOCAL VARS
    db_url = 'mongodb://localhost:27017/nordstromdb';


module.exports = {
    viewAllProducts: {
        handler: function (req, reply) {
            // load product metadata from db
            MongoClient.connect(db_url, function (err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to server at: " + db_url);

                dbController.findAllProducts(db, function (productsData) {
                    db.close();

                    console.log('Done loading products metadata.');

                    var productsJson = {
                        products: productsData
                    }
                    reply.view('products', productsJson);
                });
            });
        }
    },
    viewProductById: {
        handler: function (req, reply) {
            var productId = encodeURIComponent(req.params.id);
            console.log(productId);

            // load product metadata from db
            MongoClient.connect(db_url, function (err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to server at: " + db_url);

                dbController.findProductById(db, productId, function (productData) {
                    db.close();
                    console.log('Done loading product metadata.');
                    reply.view('productDetail', productData[0]);
                });
            });
        }
    }
}

//END OF LINE