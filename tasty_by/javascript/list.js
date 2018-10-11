var ListApp = {
	init: function(){
		ListApp.UI.init();
	},
	Constants: {
	},
	Data: {	
		MainData: {}
		,getCafe: function(){
			var xhr = new XMLHttpRequest();
			var count = 0;
			xhr.open("GET", "cafe.json", false);
			xhr.onload = function(){
				ListApp.Data.MainData = JSON.parse(this.responseText);
			}
			xhr.send();
		}
		,getCuisine: function(){
			ListApp.Data.MainData.forEach(function(item){
				var xhr = new XMLHttpRequest();
				xhr.open("GET", item.pathtocuisine, false);
				xhr.onload = function(){
					item.cuisine = JSON.parse(this.responseText);			
				}
				xhr.send();
			})

		}
		,getFood: function(){
			ListApp.Data.MainData.forEach(function(item){
				for(var i = 0; i < item.cuisine.length; i++){
					var xhr = new XMLHttpRequest();
					xhr.open("GET", item.cuisine[i].pathtofood, false);
					xhr.onload = function(){
						item.cuisine[i].food = JSON.parse(this.responseText);
					}
					xhr.send();
				}
			})
		}
	},
	UI : { 
		init: function(){
			ListApp.Data.getCafe();
			ListApp.Data.getCuisine();
			ListApp.Data.getFood();
			switch (localStorage.getItem('show')){
				case 'cafe': ListApp.UI.showCafe(); break;
				case 'cuisine': ListApp.UI.showCuisine(ListApp.Data.MainData); break;
				case 'food' : ListApp.UI.showFood(); break;
			}
			
		}
		,showCafe: function(){
			document.getElementsByClassName("content-list")[0].innerHTML = 
				'<div class = "container">' +
					'<div class = "title">' +
						'<span class = "title-content"></span>' +
					'</div>' +
						'<div class = "list-of-current-title">' +
						'</div>' +
				'</div>';
			var str = ""; 
			ListApp.Data.MainData.forEach(function(item){
				var temp = "";
				for (var i = 0; i < item.cuisine.length; i++){
					temp += item.cuisine[i].name + " "; 
				}
				str += 
					'<div class = "element-of-list">' +
						'<img class = "image" src = "' + item.image + '" id = ' +  item.id + '>' +
						'<div class = "info">' +
							'<div class = "info-top-part">' +
								'<div class = "first-cell">' +
									'<span class = "first-cell-content">' + item.name + '</span>' +
								'</div class = "second-cell">' +
								'<div>' +
									'<span class = "second-cell-content">' + item.locate + '</span>' +
								'</div>' +
							'</div>' +
							'<div class = "info-bottom-part">' +
								'<div class = "third-cell">' +
									'<span class = "third-cell-content">' + temp + '</span>' +
								'</div>' +
								'<div class = "fourth-cell">' +
									'<span class = "fourth-cell-content">' + item.phone + '</span>' +
								'</div>' +
							'</div>' +
						'</div>	' +
					'</div>'
			})
			document.getElementsByClassName("title-content")[0].innerText = "Кафе Минска";
			document.getElementsByClassName("list-of-current-title")[0].innerHTML = str;
			ListApp.UI.clickOnElementFromPageCafe();
		}
		,showCuisine: function(arr){
			var count = 0;
			var nameofcuisine = "";
			var infoaboutfood = "";
			arr.forEach(function(item){
				for (var i = 0; i < item.cuisine.length; i++){
					nameofcuisine += 
					'<div class = "container">' +
						'<div class = "title">' +
							'<span class = "title-content">' + item.cuisine[i].name + " | " + item.name + '</span>' +
						'</div>' +
							'<div class = "list-of-current-title">' +
							'</div>' +
					'</div>';
				}
				
			})
			document.getElementsByClassName("content-list")[0].innerHTML = nameofcuisine;
			arr.forEach(function(item){
				for (var i = 0; i < item.cuisine.length; i++){
					var cuisine = item.cuisine[i];
					for(var j = 0; j < cuisine.food.length; j++){
						var food = cuisine.food[j];
						infoaboutfood += 
						'<div class = "element-of-list">' +
							'<img class = "image" src = "' + food.image + '" id = ' + food.id + '>' +
							'<div class = "info">' +
								'<div class = "info-top-part">' +
									'<div class = "first-cell">' +
										'<span class = "first-cell-content">' + food.name + '</span>' +
									'</div class = "second-cell">' +
									'<div>' +
										'<span class = "second-cell-content">' + food.category + '</span>' +
									'</div>' +
								'</div>' +
								'<div class = "info-bottom-part">' +
									'<div class = "third-cell">' +
										'<span class = "third-cell-content">' + food.price + '</span>' +
									'</div>' +
									'<div class = "fourth-cell">' +
										'<span class = "fourth-cell-content">' + food.rating + '</span>' +
									'</div>' +
								'</div>' +
							'</div>	' +
						'</div>'
					}
					document.getElementsByClassName("list-of-current-title")[count++].innerHTML = infoaboutfood;
					infoaboutfood = "";
				}
			});
			ListApp.UI.clickOnElementFromPageFood();
		}
		,showFood: function(){
			var count = 0;
			var nameofcafe = "";
			var infoaboutfood = "";
			ListApp.Data.MainData.forEach(function(item){
				nameofcafe += 
				'<div class = "container">' +
					'<div class = "title">' +
						'<span class = "title-content">' + item.name + '</span>' +
					'</div>' +
						'<div class = "list-of-current-title">' +
						'</div>' +
				'</div>'; 
			})
			document.getElementsByClassName("content-list")[0].innerHTML = nameofcafe;
			var k = 0;
			var arr = ListApp.Data.MainData;
			arr.forEach(function(item){
				for (var i = 0; i < item.cuisine.length; i++){
					var cuisine = item.cuisine[i];
					for(var j = 0; j < cuisine.food.length; j++){
						var food = cuisine.food[j];
						infoaboutfood += 
						'<div class = "element-of-list">' +
							'<img class = "image" src = "' + food.image + '" id = ' + food.id + '>' +
							'<div class = "info">' +
								'<div class = "info-top-part">' +
									'<div class = "first-cell">' +
										'<span class = "first-cell-content">' + food.name + '</span>' +
									'</div class = "second-cell">' +
									'<div>' +
										'<span class = "second-cell-content">' + food.category + '</span>' +
									'</div>' +
								'</div>' +
								'<div class = "info-bottom-part">' +
									'<div class = "third-cell">' +
										'<span class = "third-cell-content">' + food.price + '</span>' +
									'</div>' +
									'<div class = "fourth-cell">' +
										'<span class = "fourth-cell-content">' + food.rating + '</span>' +
									'</div>' +
								'</div>' +
							'</div>	' +
						'</div>'
					}	
				}
				document.getElementsByClassName("list-of-current-title")[count++].innerHTML = infoaboutfood;
				infoaboutfood = "";
			})
			ListApp.UI.clickOnElementFromPageFood();
		}
		,clickOnElementFromPageFood: function(){
			for (var i = 0; i < document.getElementsByClassName('image').length; i++){
				document.getElementsByClassName('image')[i].addEventListener('click', function(e){
					for (var j = 0; j < ListApp.Data.MainData.length; j++){
						var cafe = ListApp.Data.MainData[j];
						for (var k = 0; k < cafe.cuisine.length; k++){
							var cuisine = cafe.cuisine[k];
							for (var l = 0; l < cuisine.food.length; l++){
								var food = cuisine.food[l];
								if (food.id == +e.target.getAttribute('id')){
									var obj = {};
									obj.name = food.name;
									obj.image = "url(" +  food.image + ")";
									obj.price = food.price;
									obj.info = food.info;
									obj.count = 1;
									obj.from = "List";
									obj.id = food.id;
									localStorage.setItem('currentObject', JSON.stringify(obj));
									window.location.hash = "#about";
									return ;
								}
							}
						}
					};
				})
			}
		}
		,clickOnElementFromPageCafe: function(){
			for (var i = 0; i < document.getElementsByClassName('image').length; i++){
				document.getElementsByClassName('image')[i].addEventListener('click', function(e){
					ListApp.Data.MainData.forEach(function(item){
						if (item.id == +e.target.getAttribute('id')){
							document.getElementsByClassName("content-list")[0].innerHTML = "";
							//Создается похожий на MainData массив с объектом для универсальной работы функции .showCuisine();
							var arr = [];
							var obj = {};
							obj.name = item.name;
							obj.cuisine = item.cuisine;
							arr.push(obj);
							ListApp.UI.showCuisine(arr);
						}
					})	
				})
			}
		}
		,Elements: {
			
		}
	}
}