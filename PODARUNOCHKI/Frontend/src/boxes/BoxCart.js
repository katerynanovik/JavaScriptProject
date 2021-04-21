var Templates = require('../Templates');


var Cart = [];

var $cart = $('#cart');

function addToCart(box){
    var contains=false;
    for(var i=0;i>Cart.length;i++){
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


function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plusB").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            $node.find(".price").html("");
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minusB").click(function () {
            //Збільшуємо кількість замовлених піц
            if (cart_item.quantity > 1) {
                cart_item.quantity -= 1;
            } else {
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".deleteButton").click(function () {
            removeFromCart(cart_item);
        });

        $cart.append($node);
    }
    basil.set("cartSt", Cart);
    updatePriceAndOrder();
    Cart.forEach(showOnePizzaInCart);
}



exports.Cart=Cart;