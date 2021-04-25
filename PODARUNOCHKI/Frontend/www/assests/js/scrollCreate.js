$("#typesForScroll").on("click", "button", function (event) {
    event.preventDefault();
    var id = $(this).attr('data-href');
    var link = 'http://localhost:3050/' + id;
    console.log(link);
    window.location.href = link;
});

$("#navBarClass").on("click", "a", function (event) {

    event.preventDefault();
    var id = $(this).attr('href');
    var link = 'http://localhost:3050/' + id;
    window.location.href = link;
});

$("#navBarClass").on("click", "button", function (event) {

    event.preventDefault();
    var id = $(this).attr('href');
    window.location.href = id;
});