$(document).on("dash-init", function () {
    $graphs = $(".graphs");
    // $(".btn-floating").sidenav();

    if ($graphs.length == 0) {
        $("#add-graph").addClass("pulse");
    }

    $("#add-graph").on("click", function () {
        $(this).removeClass("pulse");
    });
});