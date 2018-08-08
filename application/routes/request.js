module.exports = function(app) {
    var api = app.api.request;
    app.route('/helpdesk/requests')
        .get(api.list);

    app.route('/helpdesk/requests/:id')
        .get(api.listById);

    app.route('/helpdesk/abertos')
        .get(api.listByOpen);

    app.route('/helpdesk/insere')
        .post(api.insert);

    app.route('/helpdesk/modifica')
        .put(api.modify);
}