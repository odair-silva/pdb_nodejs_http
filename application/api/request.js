var mongoose = require('mongoose');

var model = mongoose.model('Request');
var api = {
    list: function(req, res) {
        model.find()
            .then(function(helpdesk_requests) {
                res.json(helpdesk_requests);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },
    listById: function(req, res) {
        model.findById(req.params.id)
            .then(function(helpdesk_request) {
                res.json(helpdesk_request);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }
}

module.exports = api;