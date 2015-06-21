#!/usr/local/bin/node

/**
*
*   @name apiController.js
*   @summary controller for API functions
*   @author Nils Whitmont <nils.whitmont@gmail.com>
*
*/


// INIT NODE MODULES
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),

// INIT LOCAL MODULES
    dbController = require('./dbController'),

// INIT LOCAL VARS
    db_url = 'mongodb://localhost:27017/nordstromdb';


module.exports = {
    getAllProducts: {
        handler: function (req, reply) {
            // connect to mongodb
            MongoClient.connect(db_url, function (err, db) {
                // verify no db connection errors
                assert.equal(null, err);

                // log to server
                console.log('[apiController] Connected correctly to mongodb endpoint at: ' + db_url);

                // get data from db
                dbController.findAllProducts(db, function (products) {
                    db.close();
                    reply(products);
                });
            });
        }
    },
    getProductById: {
        handler: function (req, reply) {
            var productId = req.params.id;

            // connect to mongodb
            MongoClient.connect(db_url, function (err, db) {
                // verify no db connection errors
                assert.equal(null, err);

                // log to server
                console.log('[apiController] Connected correctly to mongodb endpoint at: ' + db_url);

                // get data from db
                dbController.findProductById(db, productId, function (productData) {
                    db.close();
                    reply(productData[0]);
                });
            });
        }
    }
}
//END OF LINE