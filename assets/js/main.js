var toastContainer = new ToastContainer({});

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

var fieldMapping = {
    status_message: "Post", 
    status_published: "Date Published", 
    num_reactions: "Reactions", 
    num_comments: "Comments", 
    num_shares: "Shares", 
    num_likes: "Likes", 
    num_loves: "Loves", 
    num_wows: "Wows", 
    num_hahas: "Hahas", 
    num_sads: "Sads", 
    num_angrys: "Angrys", 
    num_likes_score: "Likes Score", 
    num_loves_score: "Loves Score", 
    num_wows_score: "Wows Score", 
    num_hahas_score: "Hahas Score", 
    num_sads_score: "Sads Score", 
    num_angrys_score: "Angrys Score", 
    neg: "Negativity", 
    pos: "Positivity", 
    neu: "Neutral", 
}