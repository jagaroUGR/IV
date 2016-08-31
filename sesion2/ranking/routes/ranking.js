var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var rank = require('../lib/rankingempresa.js');
var async = require('async');

function ranking(){

}

router.get('/',function(req,res,next){
	//Para que sea síncrona
	rank.ranking(function(tabla){
		res.render('ranking',{ranking:tabla});});
	
});


module.exports=router;
