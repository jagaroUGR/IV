var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var ranking = require('../lib/rankingempresa.js');
var router = express.Router();


router.get('/',function (req,res,next){
	res.render('crear');	

});



router.post('/',function(req,res,next){
	//procesamos la creación de la empresa
	var nombre=req.body.empresa;
	var calificacion=req.body.calificacion;
	var usuario=req.body.usuario;

	ranking.crear(nombre,calificacion,usuario);
	res.render('crear');
	
});


module.exports = router; 
