#!/usr/local/bin/node


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var db_url = 'mongodb://localhost:27017/nordstromdb';

// product data
var defaultProductData = [
     {
         "brand": "Zella",
         "formatted_regular_price": "$68.00",
         "image_url": "17/_8884657.jpg",
         "name": "Zella 'Run' Stripe Half Zip Pullover",
         "style_id": "3552410"
     },
     {
         "brand": "Hinge",
         "formatted_regular_price": "$26.00",
         "image_url": "7/_8904187.jpg",
         "name": "Hinge® Jersey Tank",
         "style_id": "3223974"
     },
     {
         "brand": "Trouve",
         "formatted_regular_price": "$68.00",
         "image_url": "7/_8547507.jpg",
         "name": "Trouvé Side Slit Tunic Sweater",
         "style_id": "3530925"
     },
     {
         "brand": "Halogen®",
         "formatted_regular_price": "$46.00",
         "image_url": "18/_8592178.jpg",
         "name": "Halogen® Three Quarter Sleeve Cardigan (Regular & Petite)",
         "style_id": "3320328"
     },
     {
         "brand": "Zella",
         "formatted_regular_price": "$58.00",
         "image_url": "4/_8889484.jpg",
         "name": "Zella 'All Shirred Up' Pullover",
         "style_id": "3460660"
     },
     {
         "brand": "Zella",
         "formatted_regular_price": "$58.00",
         "image_url": "14/_8680834.jpg",
         "name": "Zella 'Easy' Sweatshirt",
         "style_id": "3493124"
     },
     {
         "brand": "Hinge",
         "formatted_regular_price": "$26.00",
         "image_url": "7/_8904187.jpg",
         "name": "Hinge® Jersey Tank",
         "style_id": "3223974"
     },
     {
         "brand": "Trouve",
         "formatted_regular_price": "$38.00",
         "image_url": "7/_8803147.jpg",
         "name": "Trouvé 'Luxe' Tee",
         "style_id": "3530951"
     },
     {
         "brand": "Stem",
         "formatted_regular_price": "$38.00",
         "image_url": "2/_8736822.jpg",
         "name": "Stem Seamed Dolman Sleeve Tee",
         "style_id": "3530224"
     },
     {
         "brand": "Zella",
         "formatted_regular_price": "$52.00",
         "image_url": "13/_5917973.jpg",
         "name": "Zella 'Live In' Leggings",
         "style_id": "3035710"
     },
     {
         "brand": "Pleione",
         "formatted_regular_price": "$58.00",
         "image_url": "15/_8164075.jpg",
         "name": "Pleione Mixed Media Roll Sleeve Top (Regular & Petite)",
         "style_id": "3438286"
     },
     {
         "brand": "Paige Denim",
         "formatted_regular_price": "$158.00",
         "image_url": "10/_7163970.jpg",
         "name": "Paige Denim 'Skyline 12' Skinny Stretch Jeans (Twilight)",
         "style_id": "3128824"
     }
];


var insertDefaultProductData = function (db, callback) {
    var _configs = db.collection('productdb')
        _productCount = 12;
    // insert default configs
    _configs.insert(defaultProductData, function (err, result) {
        assert.equal(err, null);
        assert.equal(_productCount, result.result.n);
        assert.equal(_productCount, result.ops.length);
        console.log('Inserted ' + _productCount + ' products into the productsdb collection.');
        callback(result);
    });
}

MongoClient.connect(db_url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to MongoDb at: ' + db_url);

    insertDefaultProductData(db, function () {
        db.close();
    });

});