var graph = new GraphBuilder();

// Graph Builder
function GraphBuilder() {
    
}

GraphBuilder.prototype.init = function () {
    var self = this;

    // Get data
    self.getData();

    // Display graph selector and hide the rest
    $("#xaxis").parent().hide();
    $("#yaxis").parent().hide();
    $("#create-graph-btn").parent().hide();

    var $graphSelect = this.dropdown("select-graph", "Graph", [
        {value: "scatter", label: "Scatter Plot"}
    ]);

    var rows = [];

    // Display data options
    for (var key in fieldMapping) {
        if (fieldMapping.hasOwnProperty(key)) {
            var label = fieldMapping[key];
            var row = {
                value: key, label: label
            }
            rows.push(row);
        }
    }

    // Show additional fields based on graph
    $graphSelect.on("change", function () {
        self.dropdown("xaxis", "X - Axis",rows).parent().show();
        self.dropdown("yaxis", "Y - Axis",rows).parent().show();
        $("#create-graph-btn").parent().show();
    });

    // Create graph click event
    $("#create-graph-btn").on("click",function () {
        var $xaxis = $("#xaxis");
        var $yaxis = $("#yaxis");

        if ($xaxis.val() && $yaxis.val()) {
            var data = [{}];
            data[0].x = self.data.map(function(a) {return a[$xaxis.val()];});
            data[0].y = self.data.map(function(a) {return a[$yaxis.val()];});

            data[0].mode= 'markers';
            data[0].type= "scatter";

            self.plot({data:data})
        } else {
            toastContainer.toast("Select the rows to build the chart with");
        }
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

GraphBuilder.prototype.plot = function (opt) {
    var graphEle = opt.element || "graph-area";
    var data = opt.data || [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16],
        mode: 'markers',
        type: "scatter"
    }];

    Plotly.purge(graphEle);
	Plotly.plot(graphEle, data);
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
        graph.plot({});
    });
    graph.init();
});
