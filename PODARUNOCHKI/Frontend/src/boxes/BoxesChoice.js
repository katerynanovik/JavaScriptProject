

var Templates = require('../Templates');
var BoxCart = require('./BoxCart');
const API = require("../API");




function initialiseMenu() {
    if (sessionStorage.getItem('user')!=null)
    console.log('here it comes');
    else
    console.log('not now');


    API.getItemList(iniItemList);
    API.getBoxList(initBoxList);
}


function iniItemList(error, data) {
    if (error == null) {
        item_List = data;
        showItemList(item_List);

    }
}

function showItemList(list) {
   
  
        $('#ItemsList').html('');
    
    
    function showOneItem(item) {
        var html_code = Templates.singleItem({singleItem:item});

        var $node = $(html_code);

        $node.find(".buy").click(function () {
            BoxCart.addToCart(item);
        });
       

        $('#ItemsList').append($node);
    }
    
    list.forEach(showOneItem);
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