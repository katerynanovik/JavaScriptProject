$(function () {

    var comment=require('./comment/comment');
    var loginPage = require('./login/login');
    var signUpPage = require('./signUp/signUp');
    //This code will execute when the page is ready
    var BoxesChoice = require('./boxes/BoxesChoice');
    var order =require('./boxes/order');
    var BoxCart = require('./boxes/BoxCart')
  
    BoxCart.initialiseCart();
    BoxesChoice.initialiseMenu();
    comment.initialiseComments();


  

});