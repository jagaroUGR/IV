var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var ranking = require('../lib/rankingempresa.js');



//Funcion get de la página principal
router.get('/', function(req, res, next) {

  ranking.mostrar(function(clas){
  		res.render('index', { title: 'Ranking de empresas', clasificacion: clas });
	}
  );
});





module.exports = router;

