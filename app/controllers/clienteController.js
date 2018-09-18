var clienteModel = require('../models/clienteModel')();

module.exports.index = function(req,res){
	clienteModel.all(function(erro,resultado){
		res.render('site/home',{clientes:resultado});
	});
};

module.exports.save = function(req,res){
	var dados = req.body;

	req.assert('nome', 'Preencha um Nome.').notEmpty();
	req.assert('email', 'Preencha um E-mail.').notEmpty();
	req.assert('email', 'Preencha um E-mail.').isEmail();

	var errosForms = req.validationErrors();

	if(errosForms){
		console.log(errosForms);
		return;
	}

	clienteModel.save(dados,function(erro,resultado){
		if(!erro){
			res.redirect('/');
		}else {
			console.log("Erro ao Adicionar");
			res.redirect('/');
		}
	});
};

module.exports.showOne = function(req,res){
	clienteModel.find(req.params.id,function(erro,resultado){
		if(resultado[0] && !erro){
			res.render('site/detalhe',{cliente:resultado[0]});
		}else {
			console.log("Esse cliente não existe");
			res.redirect('/');
		}

	});
};

module.exports.edit = function(){

};

module.exports.delete = function(){

};
