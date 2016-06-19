var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');


var emps=[];
db.serialize(function(){
	db.each("SELECT DISTINCT nombre FROM empresa", function(err,row){
		emps.push(row.nombre);
	});	
	
	
});



router.get('/',function(req,res,next){
	res.render('eliminar',{empresas:emps});
});




router.post('/',function(req,res,next){
	var nombreEmpresa= req.body.empresa;
	console.log(nombreEmpresa);
	
	if(emps.indexOf(nombreEmpresa)>-1){
		var eliminar=db.prepare("Delete from empresa where nombre=?");
		eliminar.run(nombreEmpresa);
		
	}

	res.render('eliminar',{empresas:emps});

});



module.exports=router;
