#!/usr/local/bin/node

/**
*
*   @name dbController.js
*   @summary controller for database access functions
*   @author Nils Whitmont <nils.whitmont@gmail.com>
*
*/


// INIT NODE MODULES
var assert = require('assert');


// EXPORT DB FUNCTION DEFINITIONS
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
        this.productdb = db.collection('productdb');

        this.productdb.find({ style_id: id }).toArray( function (err, result) {
            // verify no errors
            assert.equal(err, null);

            // log debug info
            console.log('[dbController] Found the following product id[' + id + ']:');
            console.log(result);

            // close db connection
            db.close();

            // return product data
            callback(result);
        });
    },
}

// END OF LINE