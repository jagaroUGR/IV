//Libreria para administrar las valoraciones de empresas por parte de usuarios

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');




//Devuelve la lista de (empresa,calificacion,valor)
//`callback` funcion para que sea asíncrona la ejecución.

var mostrar = function(callback){
	var clas=[];
	db.each("SELECT * FROM empresa", function(err,row){
		clas.push(row);
	},function(){

	
	callback(clas);
	});
}


//Crea una empresa en la base de datos myslite3. El nombre de la tabla será empresa y se guarda en mydb.db
//`nombre` nombre de la empresa
//`calificacion` calificación de la empresa
//`usuario` persona que califica la empresa 
var crear = function(nombre,calificacion,usuario){

	db.run("CREATE TABLE if not exists empresa(nombre TEXT, valor INT, usuario TEXT)");
	var stmt = db.prepare("INSERT INTO empresa VALUES(?,?,?)");
	stmt.run(nombre,calificacion,usuario);
	stmt.finalize();


}


function nuevaCalificacion(usuario,empresa,callback){
	db.get("Select * from empresa where nombre=? and usuario=?", [empresa,usuario],function(err,row){
		if(row==undefined){
			callback(null,null);
		}else{
			callback(null,row);

		}});
		

}


//Califica una empresa
//`nombreEmpresa` nombre de la empresa
//`calificacion` calificación de la empresa
//`persona` persona que califica la empresa 
var calificar = function(nombreEmpresa,calificacion,persona){
	var emps=[];

		db.each("SELECT DISTINCT nombre FROM empresa", 
		function(err,row){
			emps.push(row.nombre);
		},function(){	
	
			if(emps.indexOf(nombreEmpresa)>-1){
				nuevaCalificacion(persona,nombreEmpresa,function(err,row){
					if(row==null){
						var insertar = db.prepare("INSERT INTO empresa values(?,?,?)");
						insertar.run(nombreEmpresa,calificacion,persona);
					}
			
				});
			}
		
		});

}

//Elimina una empresa del ranking
//`nombreEmpresa` Nombre de la empresa a eliminar
var eliminar = function(nombreEmpresa){
	var emps=[];
	db.each("SELECT DISTINCT nombre FROM empresa", 
		function(err,row){
			emps.push(row.nombre);
		},function(){	
		
			if(emps.indexOf(nombreEmpresa)>-1){
				var eliminar=db.prepare("Delete from empresa where nombre=?");
				eliminar.run(nombreEmpresa);	
				
			}

		});
	


}


//Devuelve una lista (empresa,media) con orden de la media decreciente 
//`callback` Para hacer asíncrona la petición y permitir que se ejecute la función una vez obtenido el resultado de la base de datos.
var ranking = function(callback){
	var tabla=[];
	db.each("select nombre,round(avg(valor),2) as av from empresa group by nombre order by av desc", function(err, row){
		tabla.push(row);
	},function(){
		callback(tabla);
	});
	

}

module.exports.mostrar=mostrar;
module.exports.crear=crear;
module.exports.calificar=calificar;
module.exports.eliminar=eliminar;
module.exports.ranking = ranking;

