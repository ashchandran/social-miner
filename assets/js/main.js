$(document).ready(function () {
    // Default initializations
    $(".button-collapse").sideNav();
    $('select').material_select();

    if(window.location.pathname == "/") {
        $(document).trigger("home-init");
    } else if (window.location.pathname == "/dashboard") {
        $(document).trigger("dash-init");
    }
})