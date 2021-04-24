

var Templates = require('../Templates');
var BoxCart = require('./BoxCart');
const API = require("../API");
var Pizza_List = API.getBoxList(initBoxList);


function initialiseMenu() {
    API.getBoxList(initBoxList);
}

function initBoxList(error, data) {
    if (error == null) {
        Pizza_List = data;
        showBoxList(Pizza_List);

    }
}


function showBoxList(list) {
   
    function nullify(box){
        $('#' + box.class).html('');
    }
    list.forEach(nullify);
    
    function showOneBox(box) {
        var html_code = Templates.BoxChoice_OneItem({ box: box });

        var $node = $(html_code);

        $node.find(".buy").click(function () {
            BoxCart.addToCart(box);
        });
       

        $('#'+box.class).append($node);
    }
    
    list.forEach(showOneBox);
}





exports.initialiseMenu=initialiseMenu;