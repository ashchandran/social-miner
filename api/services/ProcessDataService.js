/**
 * ProcessDataService
 *
 * @description :: Server-side logic for processing data
 */
var hiddenFields = [
    "status_id",
    "status_type",
    "status_link"
]

module.exports = {

    //Process the result set and append attrute to it to display on homepage
    process: function (data, callback) {
        data.forEach(function (row) {

            // Add hidden Field param
            // hiddenFields.forEach(function (field) {
            //     if (field.)
            // })
        })
    }
}
     