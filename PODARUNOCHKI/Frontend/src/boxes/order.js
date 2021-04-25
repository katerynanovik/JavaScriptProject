const API = require('../API');
var BoxCart = require('./BoxCart');

function sendToBack(error, data) {
    let receipt_details = data;
    console.log('receipt_details');
    console.log(receipt_details);
    if (!error) {
        LiqPayCheckout.init({
            data: receipt_details.data,
            signature: receipt_details.signature,
            embedTo: "#liqpay",
            mode: "popup"	//	embed	||	popup
        }).on("liqpay.callback", function (data) {
            console.log(data.status);
            console.log(data);
        }).on("liqpay.ready", function (data) {
            //	ready
        }).on("liqpay.close", function (data) {
            //	close
        });
    }
    else {
        console.log('some error');
    }
}


$('#submit-order').click(function () {
    var cart=BoxCart.getCart();
    var phoneNumber = $('#PhoneField').val();
    var address = $('#CityField').val() + '№' + $('#numberField').val();
    var name = $('#NameField').val();
    var order_info = {
        phoneNumber: phoneNumber,
        name: name,
        address: address,
        cart: cart
    }
   
    API.createOrder(order_info, sendToBack);
})