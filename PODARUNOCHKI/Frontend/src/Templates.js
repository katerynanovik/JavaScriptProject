var fs = require('fs');
var ejs = require('ejs');

exports.BoxChoice_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/item.ejs', "utf8"));

exports.BoxCart_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/cartItem.ejs', "utf8"));