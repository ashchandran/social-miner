var graph = new GraphBuilder();

// Graph Builder
function GraphBuilder() {
    
}

GraphBuilder.prototype.init = function () {

    // Display graph selector
    var $graphSelect = this.dropdown("Graph", [
        {value: "scatter", label: "Scatter Plot"}
    ], "graph-form");

    $graphSelect.on("click", function () {
        
    })
}

GraphBuilder.prototype.dropdown = function (label, options, container) {
    var $options = [];

    $options.push($("<option></option>").attr("disabled", true).attr("selected", true).text("Choose Option"))
    options.forEach(function (option) {
        $option = $("<option></option>").val(option.value).text(option.label);
        $options.push($option);
    });


    var $dropdown = $("<li></li>").append(
        $("<select></select>").append($options),
        $("<label></label>").html(label)
    );

    $("#"+container).append($dropdown);
    $dropdown.children().first().material_select();
    return $dropdown.children().first();
}


// Document Init
$(document).on("dash-init", function () {
    $graphs = $(".graphs");
    // $(".btn-floating").sidenav();

    if ($graphs.length == 0) {
        $("#add-graph").addClass("pulse");
    }

    $("#add-graph").on("click", function () {
        $(this).removeClass("pulse");
        $("#graph-builder").toggle();

        graphTest({});
    });

    graph.init();
});

function graphTest(opt) {
    var graphEle = opt.element || "graph-area";
    var data = opt.data || [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16],
        mode: 'markers',
        type: "scatter"
    }];

	Plotly.plot(graphEle, data);
}

