var express = require('express'),
    ranking = require('../lib/rankingempresa.js'),
    assert = require('assert');

describe('Ranking',function(){
	describe('Carga',function(){
		it('should be loaded',function(){
			assert(ranking,"Cargado");
		});
	});

	describe('Nueva calificación',function(){
		it('debe de calificar una empresa',function(){
			var resultado = ranking.calificar('empresita',7,'agapito',function(resultado){
				assert.equal(resultado,"empresita 7 agapito","No es posible crear la calificación");

				});
			
		});
	});
});

