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