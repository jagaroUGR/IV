var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

router.get('/',function(req,res,next){
	var tabla=[];
	db.each("select nombre,round(avg(valor),2) as av from empresa group by nombre order by av desc", function(err, row){
			tabla.push(row);
	},function(){
		console.log(tabla);
		res.render('ranking',{ranking:tabla});
	});
});


module.exports=router;
