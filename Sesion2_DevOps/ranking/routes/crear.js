var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

var router = express.Router();


router.get('/',function (req,res,next){
	res.render('crear');	

});



router.post('/',function(req,res,next){
	//procesamos la creación de la empresa
	var nombre=req.body.empresa;
	var calificacion=req.body.calificacion;
	var usuario=req.body.usuario;

	db.serialize(function(){
		db.run("CREATE TABLE if not exists empresa(nombre TEXT, valor INT, usuario TEXT)");
		var stmt = db.prepare("INSERT INTO empresa VALUES(?,?,?)");
		stmt.run(nombre,calificacion,usuario);
		stmt.finalize();

		db.each("SELECT * from empresa", function(err, rows){
			console.log(rows.nombre+ " : " + rows.valor + "  usuario: " + rows.usuario);
			}); 

	});

	

	//devolvemos a la página principal
	res.render('crear');
	
});


module.exports = router; 
