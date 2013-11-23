
var CidadesDAO = {

		cidades: [],
		
		//retorna os dados da cidade a partir do id informado
	 get: function(cidadeId) {
		var cidadeIndex = CidadesDAO.getCidadeIndex(cidadeId),
		    cidade = null;
		
		if(cidadeIndex > -1) {
			cidade = CidadesDAO.cidades[cidadeIndex];
		}		
		
		return cidade;
	},
	
	//retorna o indece do objeto cidades onde esta a cidade informada
	getCidadeIndex: function(cidadeId) {
		var cidades = CidadesDAO.cidades,
		    cidade = null,
			cidadeIndex = cidades.length;
		
		while(cidadeIndex--) {
			cidade = cidades[cidadeIndex];
			if(cidade.id == cidadeId) {
				return cidadeIndex;
			}
		}
		
		return null;
	},
	
	salvar: function(){
		var cidadesStorage = CidadesDAO.cidades;
		localStorage.setItem('cidadesStorage', JSON.stringify(cidadesStorage));
	
	},
	
	remover: function(id) {
		var cidades = CidadesDAO.cidades,
			cidadeIndex = CidadesDAO.getCidadeIndex(id);
		
		if(cidadeIndex > -1) {
			cidades.splice(cidadeIndex,1);
			return true;
		}
		
		return false;
	},
	
	//Retorna as cidades salvas
	carregar: function() {
		var cidadeStr = localStorage.getItem('cidadesStorage');
		CidadesDAO.cidades = JSON.parse(cidadeStr);
		if(CidadesDAO.cidades) {
			return true;
		}
		CidadesDAO.cidades = [];
		return false;
	},
	
	getList: function(){
		return CidadesDAO.cidades;
	},





	//retorna lista de cidades a partir de uma data
	getDateList: function(date){
		var dateList = [],
			cont = 0;

			for(var i=0; i<CidadesDAO.cidades.length; i++) {
				if (CidadesDAO.cidades[i].date == date) {
						dateList[cont] = CidadesDAO.cidades[i].nome;
						cont++;
				}
			}	
		return dateList;
	},






	geraId: function() {
		var id = (new Date()).getTime();
		return id;
	},
	
	
	newCity: function(city,lat,lon, date){
		var cidade={};
		
		cidade.id = CidadesDAO.geraId();
		cidade.nome = city;
		cidade.lat = lat;
		cidade.lon = lon;
		cidade.date = date;
		
		CidadesDAO.cidades.push(cidade);

	
	},

	atualiza: function(cidade, lat, lon, date, id) {
		var cidadeIndex = CidadesDAO.getCidadeIndex(id);
		if(cidadeIndex > -1) {
			CidadesDAO.cidades[cidadeIndex].nome = cidade;
			CidadesDAO.cidades[cidadeIndex].lat = lat;
			CidadesDAO.cidades[cidadeIndex].lon = lon;
			CidadesDAO.cidades[cidadeIndex].date = date;		
		}
	
	}

};