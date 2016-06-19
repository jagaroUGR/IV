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

//Hacemos callback para que se obtengan los valores correctos de la consulta.
// Necesitamos un callback para forzar el orden de ejecución.
function nuevaCalificacion(usuario,empresa,callback){
	db.get("Select * from empresa where nombre=? and usuario=?", [empresa,usuario],function(err,row){
		if(row==undefined){
			callback(null,null);
		}else{
			callback(null,row);

		}});
		

}


router.get('/',function(req,res,next){
	console.log(emps);
	
	res.render('calificar',{empresas:emps});
});

router.post('/',function(req,res,next){
	//calificamos una empresa
	//La empresa debe de existir y además el usuario no puede calificar 2 veces la misma empresa.
	var nombreEmpresa=req.body.empresa,
		calificacion=req.body.calificacion,
		persona=req.body.usuario;

	if(emps.indexOf(nombreEmpresa)>-1){
		console.log("primera parte");
		nuevaCalificacion(persona,nombreEmpresa,function(err,row){
			if(row==null){
				var insertar = db.prepare("INSERT INTO empresa values(?,?,?)");
				insertar.run(nombreEmpresa,calificacion,persona);
			}
			
		});
		
	}
	
	
	res.render('calificar',{empresas:emps});	
	
	

});

module.exports =router;
