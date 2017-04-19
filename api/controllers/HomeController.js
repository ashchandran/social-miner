/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var data = require("../data/data.json");

module.exports = {
	index: function (req, res) {
        return res.view("homepage", {
            header: {home:true}
        });
    },

    getData: function (req, res) {
        var graphData = JSON.parse(JSON.stringify(data));
        return res.send(graphData);
    }
};

