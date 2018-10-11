var AboutApp = {
	init: function(){
		AboutApp.UI.init();
	},
	Constants: {
	},
	Data: {	
	},
	UI : {
		init: function(){
			AboutApp.UI.incCount();
			AboutApp.UI.decCount();
			AboutApp.UI.setTotalPrice();
			AboutApp.UI.showFood();
		}
		,addInCart: function(){
			document.getElementsByClassName('button-add-on-cart')[0].addEventListener('click', function(){
				var obj = {
					name: document.getElementsByClassName('span-text-title')[0].outerText,
					count: document.getElementsByClassName('input-count')[0].value,
					price: document.getElementsByClassName('span-total-price')[0].outerText,
					image: document.getElementsByClassName('image')[0].style.backgroundImage,
					info: document.getElementsByClassName('span-text-about')[0].outerText,
					id: JSON.parse(localStorage.getItem('currentObject')).id,
				}
				var arr = [];
				if (localStorage.getItem('array') != null) {
					arr = JSON.parse(localStorage.getItem('array')).concat();
				}
				arr.push(obj);
				localStorage.setItem('array', JSON.stringify(arr));
				document.getElementsByClassName('container-succesfull')[0].classList.add('on');
				setTimeout(function(){
					document.getElementsByClassName('container-succesfull')[0].classList.remove('on');
				}, 1000);
			})
		}
		,showFood: function(){
			var item = JSON.parse(localStorage.getItem('currentObject'));
			if (item.name != "") {
				document.getElementsByClassName("info")[0].style.display = 'block'
			};
			document.getElementsByClassName('image')[0].style.backgroundImage = item.image;
			document.getElementsByClassName('span-text-title')[0].innerText = item.name;
			document.getElementsByClassName('span-text-about')[0].innerText = item.info;
			document.getElementsByClassName('span-price')[0].innerText = (item.price / item.count) + " р.";
			document.getElementsByClassName('input-count')[0].value = item.count;
			document.getElementsByClassName('span-total-price')[0].innerText = item.price + " р.";
			if (item.from  == "MainPage" || item.from == "List" ) {
				document.getElementsByClassName('button-add-on-cart')[0].innerText = "В корзину";
				AboutApp.UI.addInCart();
			};	
			if (item.from == "Cart") {
				document.getElementsByClassName('button-add-on-cart')[0].innerText = "Сохранить";
				AboutApp.UI.saveChange(item.position);
			};
			
		}
		,saveChange: function(position){
			document.getElementsByClassName('button-add-on-cart')[0].addEventListener('click', function(){
				var obj = {
					name: document.getElementsByClassName('span-text-title')[0].outerText,
					count: document.getElementsByClassName('input-count')[0].value,
					price: document.getElementsByClassName('span-total-price')[0].outerText,
					image: document.getElementsByClassName('image')[0].style.backgroundImage,
					info: document.getElementsByClassName('span-text-about')[0].outerText,
				}
				var arr = JSON.parse(localStorage.getItem('array')).concat();
				arr[position] = obj;
				localStorage.setItem('array', JSON.stringify(arr));
				document.getElementsByClassName('container-succesfull')[0].classList.add('on');
				setTimeout(function(){
					document.getElementsByClassName('container-succesfull')[0].classList.remove('on');
					setTimeout(function(){
						window.location.hash = "#cart";
					}, 100);
				}, 1000);
			})
		}
		,setTotalPrice: function(){
			document.getElementsByClassName('input-count')[0].addEventListener('input', function(e){
				document.getElementsByClassName('span-total-price')[0].innerText = (+this.value * parseInt(document.getElementsByClassName('span-price')[0].outerText)) + " р.";
			})
		}
		,incCount: function(){
			document.getElementsByClassName('button-inc')[0].addEventListener('click', function(){
				document.getElementsByClassName('input-count')[0].value = +document.getElementsByClassName('input-count')[0].value + 1;
				document.getElementsByClassName('span-total-price')[0].innerText = (+document.getElementsByClassName('input-count')[0].value * parseInt(document.getElementsByClassName('span-price')[0].outerText)) + " р.";
			})
		}
		,decCount: function(){
			document.getElementsByClassName('button-dec')[0].addEventListener('click', function(){
				if (+document.getElementsByClassName('input-count')[0].value > 1) {
					document.getElementsByClassName('input-count')[0].value = +document.getElementsByClassName('input-count')[0].value - 1;
					document.getElementsByClassName('span-total-price')[0].innerText = (+document.getElementsByClassName('input-count')[0].value * parseInt(document.getElementsByClassName('span-price')[0].outerText)) + " р.";
				}
			})
		}
		,Elements: {
			button_inc: document.getElementsByClassName('button-inc')[0],
			button_dec: document.getElementsByClassName('button-dec')[0],
			input_count: document.getElementsByClassName('input-count')[0],
			price: document.getElementsByClassName('price')[0],
			total_price: document.getElementsByClassName('total-price')[0],
			button_in_cart: document.getElementsByClassName('button-add-on-cart')[0]
		}
	}
}