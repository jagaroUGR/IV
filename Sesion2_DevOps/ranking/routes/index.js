var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');



//La creamos para que se actualice cada vez que llamamos a la página
//Necesitamos callback para que se ejecute de manera ordenada.
function mostrar(callback){
        var clas=[];
	db.each("SELECT * FROM empresa", function(err,row){
		clas.push(row);
	},function(){

	
	callback(null,clas);
	});

}




/* GET home page. */
/* Muestra la página inicial de la aplicación */
router.get('/', function(req, res, next) {

  mostrar(function(err,clas){
  res.render('index', { title: 'Ranking de empresas', clasificacion: clas });
  });
});





module.exports = router;

