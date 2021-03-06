var Templates = require('../Templates');

var Cart;
function initialiseCart() {
    if (localStorage.getItem('Cart') != null) {
        Cart = JSON.parse(localStorage.getItem('Cart'));
    }
    else
        Cart = [];
    updateCart();
}
    

var $cart = $('#cart');

$('#h2Clear').click(function () {
    Cart = [];
    updateCart();
})



function addToCart(box){
    var contains=false;
    console.log(Cart);
    for(var i=0;i<Cart.length;i++){
        if(Cart[i].box.id==box.id){
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
    var count=0;
    for(var i=0; i<Cart.length;i++){
        count+=Cart[i].quantity;
    }
    $('#countBougthItems').html(count);
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
    localStorage.setItem('Cart', JSON.stringify(Cart));
    
    Cart.forEach(showOnePizzaInCart);
}

function getCart() {
    return Cart;
}


exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.initialiseCart=initialiseCart;

exports.getCart=getCart;
