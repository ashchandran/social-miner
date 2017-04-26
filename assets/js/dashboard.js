var graph = new GraphBuilder();

// Graph Builder
function GraphBuilder() {
    
}

GraphBuilder.prototype.init = function () {
    var self = this;

    // Display graph selector
    // $("#xaxis", "#yaxis").parent().hide();
    $("#xaxis").parent().hide();
    $("#yaxis").parent().hide();
    $("#create-graph-btn").parent().hide();

    var $graphSelect = this.dropdown("select-graph", "Graph", [
        {value: "scatter", label: "Scatter Plot"}
    ]);

    var rows = [];

    for (var key in fieldMapping) {
        if (fieldMapping.hasOwnProperty(key)) {
            var label = fieldMapping[key];
            var row = {
                value: key, label: label
            }
            rows.push(row);
        }
    }

    $graphSelect.on("change", function () {
        self.dropdown("xaxis", "X - Axis",rows).parent().show();
        self.dropdown("yaxis", "Y - Axis",rows).parent().show();
        $("#create-graph-btn").parent().show();
    })
}

GraphBuilder.prototype.dropdown = function (id, label, options) {
    var $options = [];
    var $dropdown = $("#" + id);
    $dropdown.html("");

    $options.push($("<option></option>").attr("disabled", true).attr("selected", true).text("Choose Option"))
    options.forEach(function (option) {
        $option = $("<option></option>").val(option.value).text(option.label);
        $options.push($option);
    });
    $dropdown.append($options);
    $dropdown.material_select();
    $dropdown.parent().next().text(label);
    return $dropdown;
}

GraphBuilder.prototype.getData = function () {
    var self = this;
    if (self.data) {return};
    $.ajax("/getData")
        .done(function (data) {
            self.data = data;
        })
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
    });
    graphTest({});
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

