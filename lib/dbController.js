#!/usr/local/bin/node


// INIT NODE MODULES
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


// EXPORT FUNCTION DEFINITIONS
module.exports = {
    // FIND ALL PRODUCT DATA
    findAllProducts: function (db, callback) {
        // load productdb collection
        this.productDb = db.collection('productdb');
        // find all results
        this.productDb.find({}).toArray( function (err, results) {
            // verify no errors
            assert.equal(err, null);

            // log debug info
            console.log('[dbController] Found the following products:');
            console.log(results);

            // close db connection
            db.close();

            // return product data
            callback(results);
        });

    },
    // FIND PRODUCT BY ID
    findProductById: function (db, id, callback) {
        this.comparison_results = db.collection('comparison_results');

        this.comparison_results.find({ guid: guid }).toArray( function (err, result) {
            assert.equal(err, null);

            console.log('[dbController] Found the following product:');
            console.log(result);
            callback(result);
        });
    },
}
// END OF LINE