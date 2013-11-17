
var Table = {
	
	add: function(cidade){
		var tabela = document.getElementById('cidades'),
			tbody = document.createElement('tbody'),
			trow = document.createElement('tr'),
			tdNome = document.createElement('td'),
			tdData = tdNome.cloneNode(false),
			tdAcoes = tdNome.cloneNode(false);
			
			tdNome.innerHTML = cidade.nome;
			tdData.innerHTML = cidade.date;
			tdAcoes.className = "acoes";
			
			Table.setAcao(tdAcoes,cidade);
			
			trow.appendChild(tdNome);
			trow.appendChild(tdData);
			trow.appendChild(tdAcoes);
			
			tbody.appendChild(trow);
			tabela.appendChild(tbody);
	},
	
	setAcao: function(tdAcoes,cidade){
			var imagemOk = new Image(),
				imagemDel = new Image(),
				imagemEdit = new Image();
			
			imagemOk.src = 'image/ok.gif';
			imagemOk.alt = cidade.id;
			
			imagemDel.src = 'image/delete.png';
			imagemDel.alt = cidade.id;

			imagemEdit.src = 'image/edit.png';
			imagemEdit.alt = cidade.id;
			
			Table.setBotaoOk(imagemOk);
			Table.setBotaoDel(imagemDel);
			Table.setBotaoEdit(imagemEdit);
			
			tdAcoes.appendChild(imagemOk);
			tdAcoes.appendChild(imagemDel);
			tdAcoes.appendChild(imagemEdit);
	},
	
	setBotaoOk: function(imagemOk){
	       imagemOk.onclick = function(){
				var cidade = CidadesDAO.get(this.alt),
					lat = cidade.lat,
					lon = cidade.lon;
				
				Index.getMap(lat,lon);
		   
		   };
	},
	
	setBotaoDel: function(imagemDel){
		imagemDel.onclick = function(){
			      var tr = this.parentNode.parentNode,
					  id = this.alt,
					  tbody = tr.parentNode;
					  
				CidadesDAO.remover(id);
				tbody.removeChild(tr);
		};
	},

	setBotaoEdit: function(imagemEdit) {
		imagemEdit.onclick = function() {
		
				var cidadeId = this.alt,
				    cidade = CidadesDAO.get(cidadeId),
					name = document.getElementById('name'),
					data = document.getElementById('data'),
					id = document.getElementById('id_cidade');

				name.value = cidade.nome;
				data.value = cidade.date;
				id.value = cidadeId;
			
			
		};
		
	}
	

};