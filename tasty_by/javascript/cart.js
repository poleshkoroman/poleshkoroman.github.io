var CartApp = {
	init: function(){
		CartApp.UI.init();
	},
	Constants: {
	},
	Data: {	
	},
	UI : {
		init: function(){
			CartApp.UI.showFoodInTheCart();
			CartApp.UI.setTotalPrice();
			CartApp.UI.changeObject();
			CartApp.UI.clearCart();
		}
		,showFoodInTheCart: function(){
			var arr = JSON.parse(localStorage.getItem('array')).concat();
			if (arr[0] != undefined && arr[0].name != "") {
				document.getElementsByClassName('clear-cart')[0].style.display = 'block';
				for (var i = 0; i < arr.length; i++){
					var obj = arr[i];
					document.getElementsByClassName('cart-all-food')[0].innerHTML += 
						'<div class = "cart-container-food" id = "' + i + '">' +
							'<div class = "food-image"></div>' +
							'<div class = "container-about-food">' +
								'<div class = "name-food">' +
									'<span class = "span-name-food">' + obj.name + '</span>' +
								'</div>' +
								'<div class = "count-of-food">' +
									'<span>Количество</span>' +
									'<span class = "span-count-of-food">' + obj.count + '</span>' +
								'</div>' +
								'<div class = "total-price">' +
									'<span>Цена</span>' +
									'<span class = "span-price">' + parseInt(obj.price) + " p." + '</span>' +
								'</div>' +
							'</div>' +
							'<button class = "delete-this">-</button>' +
						'</div>'
					CartApp.UI.Elements.image[i].style.backgroundImage = obj.image;
					CartApp.UI.Elements.info[i] = obj.info;
					CartApp.UI.setTotalPrice();
				}
				CartApp.UI.deleteRecord(arr.length);
			}
		}
		,setTotalPrice: function(){
			var summ = 0;
			for (var i = 0; i < CartApp.UI.Elements.price.length; i++){
				summ += parseInt(CartApp.UI.Elements.price[i].outerText);
			}
			document.getElementsByClassName('span-total-price')[0].innerText = summ + " p.";
		}
		,deleteRecord: function(item){
			var arr = JSON.parse(localStorage.getItem('array')).concat();
			for (var i = 0; i < item; i++){
				document.getElementsByClassName('delete-this')[i].addEventListener('click', function(e){
					e.stopPropagation();
					var delete_element = e.target.parentNode;
					delete_element.parentNode.removeChild(delete_element);
					CartApp.UI.setTotalPrice();
					arr.splice(arr.indexOf(+e.target.parentNode.getAttribute('id')), 1);
					localStorage.setItem('array', JSON.stringify(arr));
				})
			}
		}
		,changeObject: function(){
			for (var i = 0; i < document.getElementsByClassName('cart-container-food').length; i++){
				document.getElementsByClassName('cart-container-food')[i].addEventListener('click', function(e){
					CartApp.UI.getChangeableObject(e.target);
				})
			}
		}
		,getChangeableObject: function(pressed){
			var obj = {}
			if (document.getElementsByClassName('span-name-food')[+pressed.getAttribute('id')] != undefined){
				obj.name = document.getElementsByClassName('span-name-food')[+pressed.getAttribute('id')].outerText; 
				obj.image = document.getElementsByClassName('food-image')[+pressed.getAttribute('id')].style.backgroundImage; 
				obj.count = document.getElementsByClassName('span-count-of-food')[+pressed.getAttribute('id')].outerText;
				obj.price = parseInt(document.getElementsByClassName('span-price')[+pressed.getAttribute('id')].outerText);
				obj.info = CartApp.UI.Elements.info[+pressed.getAttribute('id')];
				obj.from = "Cart";
				obj.position = +pressed.getAttribute('id');
				localStorage.setItem('currentObject', JSON.stringify(obj));
				window.location.hash = "#about";
			}
		}
		,clearCart: function(){
			document.getElementsByClassName('clear-cart')[0].addEventListener('click', function(e){
				document.getElementsByClassName('cart-all-food')[0].innerHTML = "";
				localStorage.removeItem('array');
				document.getElementsByClassName('span-total-price')[0].innerText = "0 p.";
			})
		}
		,createUniqueArray: function(){
			
		}
		,Elements: {
			info: [],
			image: document.getElementsByClassName('food-image'),
			total_price: document.getElementsByClassName('span-total-price')[0],
			price: document.getElementsByClassName('span-price'),
			all_food: document.getElementsByClassName('all-cart-food')[0],
			container_fod: document.getElementsByClassName('cart-all-food')[0],
			buttom: document.getElementsByClassName('delete-this'),
		}
	}
}