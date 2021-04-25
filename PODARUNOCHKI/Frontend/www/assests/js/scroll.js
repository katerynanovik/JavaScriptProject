$("#typesForScroll").on("click", "button", function (event) {
    event.preventDefault();
    var id = $(this).attr('data-href'),
        top = $(id).offset().top - 80;// find out the height from the beginning of the page to the block referenced by the anchor
    $('body,html').animate({ scrollTop: top }, 50);
});

$("#navBarClass").on("click", "a", function (event) {

    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top - 100;// find out the height from the beginning of the page to the block referenced by the anchor
    
    $('body,html').animate({ scrollTop: top }, 50);
});

$("#navBarClass").on("click", "button", function (event) {
    
    event.preventDefault();
    var id = $(this).attr('href');
    window.location.href = id;
});
