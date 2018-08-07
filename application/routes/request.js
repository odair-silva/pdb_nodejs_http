module.exports = function(app) {
    var api = app.api.request;
    app.route('/helpdesk/requests')
        .get(api.list);

    app.route('/helpdesk/requests/:id')
        .get(api.listById);
}