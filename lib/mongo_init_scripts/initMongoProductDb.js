#!/usr/local/bin/node

/**
*   @name initMongoProductDb.js
*   @summary initializes mongodb with default product metadata
*   @author Nils Whitmont <nils.whitmont@gmail.com>
*
*/


// INIT NODE MODULES
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),

// INIT LOCAL VARS
    db_url = 'mongodb://localhost:27017/nordstromdb',
// load product metadata from file
    defaultProductData = require('./productData').productdb;


function insertDefaultProductData (db, callback) {
    var productdb = db.collection('productdb'),
        productCount = 12;
    // insert default product data
    productdb.insert(defaultProductData, function (err, result) {
        // verify no errors
        assert.equal(err, null);
        assert.equal(productCount, result.result.n);
        assert.equal(productCount, result.ops.length);

        // log debug info
        console.log(defaultProductData);
        console.log('Inserted ' + productCount + ' products into the productsdb collection.');

        // return metadata
        callback(result);
    });
}

// connect to mongodb and insert default data
MongoClient.connect(db_url, function(err, db) {
    // verify no errors
    assert.equal(null, err);

    // log debug
    console.log('Connected correctly to MongoDb at: ' + db_url);

    // insert default data into collection
    insertDefaultProductData(db, function () {
        db.close();
    });
});

// END OF LINE