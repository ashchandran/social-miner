$(document).on("home-init", function () {
    $.ajax("/getData")
        .done(function (data) {
            addRecords(data);
        })
});

var hiddenFields = [
    "index",
    "status_id",
    "status_type",
    "status_link"
]

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

// var fieldMapping = [
//     {label: "Post", id: "status_message"},
//     {label: "Date Published", id: "status_published"},
//     {label: "Reactions", id: "num_reactions"},
//     {label: "Comments", id: "num_comments"},
//     {label: "Shares", id: "num_shares"},
//     {label: "Likes", id: "num_likes"},
//     {label: "Loves", id: "num_loves"},
//     {label: "Wows", id: "num_wows"},
//     {label: "Hahas", id: "num_hahas"},
//     {label: "Sads", id: "num_sads"},
//     {label: "Angrys", id: "num_angrys"},
//     {label: "Likes Score", id: "num_likes_score"},
//     {label: "Loves Score", id: "num_loves_score"},
//     {label: "Wows Score", id: "num_wows_score"},
//     {label: "Hahas Score", id: "num_hahas_score"},
//     {label: "Sads Score", id: "num_sads_score"},
//     {label: "Angrys Score", id: "num_angrys_score"},
//     {label: "Negativity", id: "neg"},
//     {label: "Positivity", id: "pos"},
//     {label: "Neutral", id: "neu"},
// ]

function addRecords(records) {

    // Iterate through each record
    records.forEach(function (record) {
        
        // Add Row
        var $row = $("<div class='row card'></div>");
        
        // Add Data to row
        for (var key in record) {
            if (record.hasOwnProperty(key)) {

                // Check if field is hidden
                var hidden = false;
                hiddenFields.forEach(function (field) {
                    hidden = (field == key) ? true : hidden;
                });

                // If field is hidden
                if (hidden) {
                    $row.attr("data-"+key, record[key]);
                } 

                // Else add value to row
                else {
                    var element = record[key];
                    var $col = $("<div class='col "+key+"'><span class='label'>"+fieldMapping[key]+"</span><span class='value'>"+record[key]+"</span></div>");
                    $row.append($col);
                }
            }
        }
        $("#record-container").append($row);
    })
}