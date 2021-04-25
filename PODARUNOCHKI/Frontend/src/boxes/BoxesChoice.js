

var Templates = require('../Templates');
var BoxCart = require('./BoxCart');
const API = require("../API");




function initialiseMenu() {
    if (sessionStorage.getItem('user')!=null)
    console.log('here it comes');
    else
    console.log('not now');
    API.getBoxList(initBoxList);
    API.getItemList(iniItemList);
}


function iniItemList(error, data) {
    if (error == null) {
        item_List = data;
        showItemList(item_List);

    }
}

function showItemList(list) {


    function nullify(item) {
        $('.' + item.class).html('');
    }
    list.forEach(nullify);


    function showOneItem(item) {
        var html_code = Templates.singleItem({ singleItem: item });

        var $node = $(html_code);

        $node.find(".buy").click(function () {
            BoxCart.addToCart(item);
        });
      


        $('.'+item.class).append($node);
    }

    list.forEach(showOneItem);
}

function initBoxList(error, data) {
    
    if (error == null) {
        var box_list = data;
        showBoxList(box_list);

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


        $node.find('.details').click(function () {
          
            if (document.getElementById(box.id).style.display=='block')
            var opened=true;
            $('#' + box.id).css('display', 'none');
            if(!opened){
            opened=true;
            $('#' + box.id).css('display','block');
            }
        })
       

        $('#'+box.class).append($node);
    }
    
    list.forEach(showOneBox);
}





exports.initialiseMenu=initialiseMenu;