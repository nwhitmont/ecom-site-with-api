#!/usr/local/bin/node


// INIT NODE MODULES
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),

// INIT LOCAL MODULES
    dbController = require('./dbController'),

// INIT LOCAL VARS
    db_url = 'mongodb://localhost:27017/nordstromdb';;


module.exports = {
    getAllProducts: {
        handler: function (req, reply) {
            // connect to mongodb
            MongoClient.connect(db_url, function (err, db) {
                // verify no db connection errors
                assert.equal(null, err);

                // log to server
                console.log('[dbController] Connected correctly to mongodb endpoint at: ' + db_url);

                // get data from db
                dbController.findAllProducts(db, function (products) {
                    db.close();
                    reply(products);
                });
            });
        }
    },
    viewAllProducts: {
        handler: function (req, reply) {
            reply.view('products', this.getAllProducts);
        }
    },
    getProductById: {
        handler: function (req, reply) {
            var product = dbController.findProductById();
            reply.view('productDetail', product);

        }
    }
}
//END OF LINE