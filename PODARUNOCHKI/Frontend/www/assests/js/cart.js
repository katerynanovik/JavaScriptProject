var cartIsOpened=false;
$("#cartIcon").click(function () {
    if (!cartIsOpened){
    $('#BuyMenu').css('display','block');
    cartIsOpened=true;
    $('#shownCart').css('display','block');
    $('body').css('overflow','hidden');
    }
    else{
        cartIsOpened=false;
        $('#BuyMenu').css('display', 'none');
        $('#shownCart').css('display', 'none');
        $('body').css('overflow', 'auto');
    }
});

$("#shownCart").click(function()  {
    console.log($(event.target));
    console.log($(event.currentTarget));
    console.log(event.target == event.currentTarget)
    if (event.target==event.currentTarget){
        cartIsOpened = false;
        $('#BuyMenu').css('display', 'none');
        $('#shownCart').css('display', 'none');
        $('body').css('overflow', 'auto');
    }
    else{

        return;
    }
})