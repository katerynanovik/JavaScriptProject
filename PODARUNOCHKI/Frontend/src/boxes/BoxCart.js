var Templates = require('../Templates');


var Cart = [];

var $cart = $('#cart');

function addToCart(box){
    var contains=false;
    for(var i=0;i<Cart.length;i++){
        if(Cart[i].box==box){
            contains=true;
            Cart[i].quantity++;
            break;
        }
    }

    if(!contains){
        Cart.push({
            box:box,
            quantity:1
        });
    }

    updateCart();

}

function removeFromCart(cart_item) {
    

    var ind = Cart.indexOf(cart_item);
    Cart.splice(ind, 1);
    
    updateCart();
}



function updateCart() {
    $('#countBougthItems').html(Cart.length);
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.BoxCart_OneItem({cart_item: cart_item});

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            $node.find(".price").html("");
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function () {
            //Збільшуємо кількість замовлених піц
            if (cart_item.quantity > 1) {
                cart_item.quantity -= 1;
            } else {
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".X").click(function () {
            removeFromCart(cart_item);
        });

        $cart.append($node);
    }
    
    Cart.forEach(showOnePizzaInCart);
}



exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.Cart=Cart;
