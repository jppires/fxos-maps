var Index = {
	
		LAT_DEFAULT: -22.23412040,
		LONG_DEFAULT: -45.93325690,
		cidades: [],
	
		init: function(){
			//Index.getMap(Index.LAT_DEFAULT,Index.LONG_DEFAULT);
			CidadesDAO.carregar();
			Index.montaTabelaLista();
			Index.getForm();
			
		},
		
		setListner: function(){
			var form = document.getElementById("name");
		},
		//Insere o mapa com as coordenadas informadas
		getMap: function(lat,lon){
			var latlng = new google.maps.LatLng(lat,lon),
				prop = {
							zoom: 14,
							center: latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP
							},
				marcador = new google.maps.Marker({
						icon: 'image/marcador.png',
						position: latlng,
				}),
				map = new google.maps.Map(document.getElementById("map_canvas"),prop);

				marcador.setMap(map);		
		
		},
		
		
		//Setar os botões de adicionar cidades à tabela ou pesquisar por data
		getForm: function(){
			var newCity = document.getElementById('newCity'),
				search = document.getElementById('search');
			
			Index.novaCidade(newCity);
			Index.pesquisaData(search);
				
		},
		
		
		//Adicionar uma cidade e pega as coordenadas da mesma
		novaCidade: function(botao){
			botao.onclick = function(){
					var cidade = document.getElementById('name').value,
						data = document.getElementById('data').value,
						idCidade = document.getElementById('id_cidade').value,
						address = ""+cidade+", Brasil",
						lat = 0,
						lon = 0;
						
						if(Index.verificaCampos(cidade)){
								var geocoder = new google.maps.Geocoder();
								geocoder.geocode({ 'address': address }, function (results, status) {
									if (status == google.maps.GeocoderStatus.OK) {
										if (results[0]) {
											lat = results[0].geometry.location.lat();
											lon = results[0].geometry.location.lng();
											if(idCidade == ""){
												CidadesDAO.newCity(cidade,lat,lon, data);
											}else{
												CidadesDAO.atualiza(cidade,lat,lon,data,idCidade);
											}
											window.location.href=window.location.href;
										} else {
											alert("Nenhuma cidade encontrada.");
										}
									} else {
										alert("Cidade inválida ");
									}
								});
						
						}else{
							alert("valor incorreto");
						}
			};
		
		},
		
		//Busca registros por data
		pesquisaData: function(botao){
			botao.onclick = function(){
					var dateSearch = document.getElementById('dateSearch').value,
						cidades = [],
						cidade = null;
						
						if(Index.verificaCampos(dateSearch)){
								cidades = CidadesDAO.getDateList(dateSearch);
								Index.relatorio(cidades);
								
						
						}else{
							alert("valor incorreto");
						}
			};
		
		},
		//Valida se o campo da cidade não esta em branco ou se digitar numeros
		verificaCampos: function(cidade){
			var temp = 0;
			
			temp = (cidade*2) - 1;
			
			if(temp || cidade == ""){
				return false;
			}else{
				return true;
			}
		},
		
		//Mostra as cidades salvas na tabela
		montaTabelaLista: function() {
			var cidades = CidadesDAO.getList(),
				cidade = null;
			if(cidades) {
				for(var i=0, leng = cidades.length; i<leng; i++) {
					cidade = cidades[i];
					Table.add(cidade);
				}
			}		
		},

		//Mostra as cidades por data
		relatorio: function(cidades) {

				if(cidades.length > 0){
					alert("Cidades visitadas: "+cidades);
					}else{
						alert("Não há cidades nesta data");
					}
		}

			
};

Index.init();

window.onunload = function(){
	CidadesDAO.salvar();
};