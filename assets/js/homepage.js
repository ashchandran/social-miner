$(document).on("home-init", function () {

    $("#filter-1").on("change", function () {
        console.log($(this).val())
        if ($(this).val() == "facebook") {
            $.ajax("/getData")
            .done(function (data) {
                addRecords(data);
            })
        }
    })
});

var hiddenFields = [
    "index",
    "status_id",
    "status_type",
    "status_link"
]

function addRecords(records) {
    var filterList = [];
    var rows = [];

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
        rows.push($row);
    });
    $("#record-container").append(rows);

    // Add filter
    for (var key in records[0]) {
        if (fieldMapping.hasOwnProperty(key)) {
            var $filter = $('<li class="padding">\
                                <input type="checkbox" id="'+key+'" class="filled-in col-filters" checked="checked" value="'+key+'"/>\
                                <label for="'+key+'">'+ fieldMapping[key] +'</label>\
                            </li>');

            filterList.push($filter);
        }
    }
    $("#slide-out").append(filterList);
    $(".col-filters").on("change", function () {
        $("."+this.value).toggle(this.checked);
    })
}