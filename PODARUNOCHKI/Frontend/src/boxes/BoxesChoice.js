function initialiseMenu(){

}

var Templates = require('../Templates');
var BoxCart = require('./BoxCart');
const API = require("../API");
var Pizza_List = API.getPizzaList(initPizzaList);


exports.initialiseMenu=initialiseMenu;