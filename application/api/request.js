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
    },
    listByOpen: function(req, res) {
        model.find({ 'status' : 'OPENED'})
            .sort({'priority' : '-1'}) //decrescente
            .then(function(helpdesk_request) {
                res.json(helpdesk_request);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },
    insert: function(req, res) {
        item = req.body;
        novoItem = {
            priority : item.priority,
            status : item.status,
            created_at : new Date,
            updated_at : new Date,
            opened_by : item.opened_by,
            description : item.description
        }
        model.create(novoItem)
            .then(function(helpdesk_request) {
                res.json(helpdesk_request);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },
    //fiz para pegar por id mas pode ser mudado para qualquer parametro facilmente
    //mas id é o que é único para cada chamado
    modify: function(req, res) {
        chamado = req.body;
        atualizaChamado = {
            status : chamado.status,
            updated_at : new Date,
            closed : {
                by : chamado.closed.by,
                worked_minutes : chamado.closed.worked_minutes
            },
            _id : chamado._id
        }

        req.assert("atualizaChamado.closed.by",
        "Nome do técnico obrigatório.").notEmpty();

        req.assert("atualizaChamado.closed.worked_minutes",
        "O tempo gasto na solução é obrigatório.").notEmpty();

        var erros = req.validationErrors();

        if (erros){
            console.log('Erros de validação encontrados.');
            res.status(400).send(erros);
            return;
        }
        
        model.update({_id : atualizaChamado._id}, { $set: 
            {status : atualizaChamado.status, 
            updated_at : atualizaChamado.updated_at,
            closed : {by : atualizaChamado.closed.by,
                      worked_minutes : atualizaChamado.closed.worked_minutes
                     }
            }})
            .then(function(helpdesk_request) {
                res.json(helpdesk_request);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }
}

module.exports = api;