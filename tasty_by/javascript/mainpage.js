var MainPageApp = {
	init: function(){
		MainPageApp.UI.init();
	},
	Constants: {
		COUNT_OF_FOOD_ON_MAINPAGE: 3,
	},
	Data: {	
		TopData: []	
		,getTopData: function(f){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "food.json", true);
			xhr.onload = function(){
				MainPageApp.Data.TopData = JSON.parse(this.responseText);
				f();
			}
			xhr.send();
		}
	},
	UI : {
		init: function(){
			MainPageApp.Data.getTopData(this.startPageProcessing);
		}
		,startPageProcessing: function(){
			MainPageApp.UI.setOriginData();
			MainPageApp.UI.showSlide();
		}
		,setOriginData: function(){
			for (var i = 0; i < MainPageApp.Constants.COUNT_OF_FOOD_ON_MAINPAGE; i++){
				document.querySelectorAll('#slides .slide')[i].style.backgroundImage = "url(" +  MainPageApp.Data.TopData[i].image + ")";
				document.getElementsByClassName('top')[i].setAttribute('src', MainPageApp.Data.TopData[i].image);
				document.getElementsByClassName('top')[i].setAttribute('id', MainPageApp.Data.TopData[i].id);
				document.getElementsByClassName('text-of-category')[i].innerText = MainPageApp.Data.TopData[i].category;
				document.getElementsByClassName("text-of-name-of-food")[i].innerText = MainPageApp.Data.TopData[i].name;
			} 
			for (var i = 0; i < MainPageApp.Constants.COUNT_OF_FOOD_ON_MAINPAGE; i++){
				document.getElementsByClassName('top')[i].addEventListener('click', function(e){
					// MainPageApp.UI.Elements.currentID = this.getAttribute('id');
					MainPageApp.UI.onTopFood(e);
				})
			}
		}
		,showSlide: function(){
			var currentslide = 0;
			var nextSlide = function(){
				document.querySelectorAll('#slides .slide')[currentslide].className = 'slide';
    			currentslide = (currentslide + 1) % document.querySelectorAll('#slides .slide').length;
    			document.querySelectorAll('#slides .slide')[currentslide].className = 'slide showing';
			}	
			MainPageApp.UI.Elements.stopInterval = setInterval(nextSlide, 5000);
		}
		
		,onTopFood: function(value){
			window.location.hash = "#about";
			MainPageApp.Data.TopData.forEach(function(item){
				if (value.target.getAttribute('id') == item.id){
					var obj = {};
					obj.name = item.name;
					obj.image = "url(" +  item.image + ")";
					obj.price = item.price;
					obj.info = item.info;
					obj.count = 1;
					obj.from = "MainPage";
					obj.id = item.id;
					localStorage.setItem('currentObject', JSON.stringify(obj));
				}
			})

		}
		,Elements: {
			stopInterval : 0,
		}
	}
}