var IndexApp = {
	init: function(){
		IndexApp.UI.init();
	},
	Constants: {
		COUNT_OF_FOOD_ON_MAINPAGE: 3,
	},
	Data: {	
	},
	UI : {
		init: function(){
			IndexApp.UI.startPageProcessing();
			IndexApp.UI.checkToken();
		}
		,startPageProcessing: function(){
			IndexApp.UI.onScrollPage();
			IndexApp.UI.onTheTop();
			IndexApp.UI.showSubMenu();
			IndexApp.UI.showLoginFromFullHeader();
			IndexApp.UI.showRegistrationFromFullHeader();
			IndexApp.UI.showLoginFromSmallHeader();
			IndexApp.UI.showRegistrationFromSmallHeader();
			IndexApp.UI.closeLoginWindow();
			IndexApp.UI.closeRegistrationWindow();
			IndexApp.UI.goToRegistrationFromLogin();
			IndexApp.UI.onLogo();
			IndexApp.UI.showTop();
			IndexApp.UI.closeTop();
			IndexApp.UI.showList();
			IndexApp.UI.toRegister();
			IndexApp.UI.toLogin();
		}
		,checkToken: function(){
			var obj = JSON.parse(localStorage.getItem('status'));
			if (obj.status == "online"){
				IndexApp.UI.Elements.fullheader_login.innerText = "Личный кабинет";
				IndexApp.UI.Elements.fullheader_registration.innerText = "Выход";
				IndexApp.UI.Elements.smallheader_login.innerText = "Личный кабинет";
				IndexApp.UI.Elements.smallheader_registration.innerText = "Выход";
			}
			else {
				IndexApp.UI.Elements.fullheader_login.innerText = "Вход";
				IndexApp.UI.Elements.fullheader_registration.innerText = "Регистрация";
				IndexApp.UI.Elements.smallheader_login.innerText = "Вход";
				IndexApp.UI.Elements.smallheader_registration.innerText = "Регистрация";
			}
		}
		,onScrollPage: function(){
			window.addEventListener("scroll", function() {
				if ((window.pageYOffset || document.documentElement.scrollTop) >= 700) {
						IndexApp.UI.Elements.main_backontop.classList.add('on');
				}
				else { IndexApp.UI.Elements.main_backontop.classList.remove('on'); };
			})
		}
		,onTheTop: function(){
			IndexApp.UI.Elements.main_backontop.addEventListener("click", function(){
				window.scrollTo(0, 0);
			})
		}
		,showSubMenu: function(){
			IndexApp.UI.Elements.smallheader_bar.addEventListener("click", function(){
				IndexApp.UI.Elements.smallheader_submenu.classList.toggle('on');
			})
		}
		,showLoginFromFullHeader: function(){
			IndexApp.UI.Elements.fullheader_login.addEventListener('click', function(e){
				e.preventDefault();
				if (e.target.outerText == "Вход"){
					IndexApp.UI.Elements.fullfixedscreen.classList.add('on');
					IndexApp.UI.Elements.window_login.classList.add('on');
					IndexApp.UI.Elements.formlogin_login.value = "";
					IndexApp.UI.Elements.formlogin_password.value = "";
				}
				else {
					window.location.hash = "#personalarea";
				}
			})
		}
		,showRegistrationFromFullHeader: function(){
			IndexApp.UI.Elements.fullheader_registration.addEventListener('click', function(e){
				e.preventDefault();
				if (e.target.outerText == "Регистрация"){
					IndexApp.UI.Elements.fullfixedscreen.classList.add('on');
					IndexApp.UI.Elements.window_registration.classList.add('on');
					for (var i = 0; i < IndexApp.UI.Elements.formregistration_arrayofinput.length; i++){
						IndexApp.UI.Elements.formregistration_arrayofinput[i].value = "";
					}
				}
				else {
					IndexApp.UI.Elements.fullheader_login.innerText = "Вход";
					IndexApp.UI.Elements.fullheader_registration.innerText = "Регистрация";
					IndexApp.UI.Elements.smallheader_login.innerText = "Вход";
					IndexApp.UI.Elements.smallheader_registration.innerText = "Регистрация";
					var obj = JSON.parse(localStorage.getItem('status'));
					obj.status = "offline";
					localStorage.setItem('status', JSON.stringify(obj));
					window.location.hash = "";
				}
			})
		}
		,showLoginFromSmallHeader: function(){
			IndexApp.UI.Elements.smallheader_login.addEventListener('click', function(e){
				e.preventDefault();
				if (e.target.outerText == "Вход"){
					IndexApp.UI.Elements.fullfixedscreen.classList.add('on');
					IndexApp.UI.Elements.window_login.classList.add('on');
					IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
					IndexApp.UI.Elements.formlogin_login.value = "";
					IndexApp.UI.Elements.formlogin_password.value = "";
				}
				else {
					window.location.hash = "#personalarea";
				}
				
			})
		}
		,showRegistrationFromSmallHeader: function(){
			IndexApp.UI.Elements.smallheader_registration.addEventListener('click', function(e){
				e.preventDefault();
				if (e.target.outerText == "Регистрация"){
					IndexApp.UI.Elements.fullfixedscreen.classList.add('on');
					IndexApp.UI.Elements.window_registration.classList.add('on');
					IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
					for (var i = 0; i < IndexApp.UI.Elements.formregistration_arrayofinput.length; i++){
						IndexApp.UI.Elements.formregistration_arrayofinput[i].value = "";
					}
				}
				else {
					IndexApp.UI.Elements.fullheader_login.innerText = "Вход";
					IndexApp.UI.Elements.fullheader_registration.innerText = "Регистрация";
					IndexApp.UI.Elements.smallheader_login.innerText = "Вход";
					IndexApp.UI.Elements.smallheader_registration.innerText = "Регистрация";
					var obj = JSON.parse(localStorage.getItem('status'));
					obj.status = "offline";
					localStorage.setItem('status', JSON.stringify(obj));
					window.location.hash = "";

				}
			})
		}
		,closeLoginWindow: function(){
			IndexApp.UI.Elements.formlogin_closelogin.addEventListener('click', function(){
				IndexApp.UI.Elements.fullfixedscreen.classList.remove('on');
				IndexApp.UI.Elements.window_login.classList.remove('on');
			})
		}
		,closeRegistrationWindow: function(){
			IndexApp.UI.Elements.formregistration_closeregistration.addEventListener('click', function(){
				IndexApp.UI.Elements.fullfixedscreen.classList.remove('on');
				IndexApp.UI.Elements.window_registration.classList.remove('on');
			})
		}
		,goToRegistrationFromLogin: function(){
			IndexApp.UI.Elements.formlogin_registration.addEventListener('click', function(e){
				e.preventDefault();
				IndexApp.UI.Elements.window_login.classList.remove('on');
				IndexApp.UI.Elements.window_registration.classList.add('on');
			})
		}
		,onLogo: function(){
			document.getElementsByClassName('logo')[0].addEventListener('click', function(){
				window.location.hash = "";
			})
			document.getElementsByClassName('logo')[1].addEventListener('click', function(){
				window.location.hash = "";
			})
		}
		,showTop: function(){
			IndexApp.UI.Elements.button_showtop[0].addEventListener('click', function(){
				IndexApp.UI.Elements.window_top.classList.add("on");
			});
			IndexApp.UI.Elements.button_showtop[1].addEventListener('click', function(){
				IndexApp.UI.Elements.window_top.classList.add("on");
			});
		}
		,closeTop: function(){
			IndexApp.UI.Elements.close_window_top.addEventListener('click', function(){
				IndexApp.UI.Elements.window_top.classList.remove("on");
			})
		}
		,showList: function(){
			for (var i = 0; i < IndexApp.UI.Elements.showcafe.length; i++) {
				IndexApp.UI.Elements.showcafe[i].addEventListener('click', function(e){
					// IndexApp.UI.Elements.show = e.target.getAttribute('class');
					localStorage.setItem('show', e.target.getAttribute('class'));
					window.location = "#";
					window.location = "#list";
					IndexApp.UI.Elements.window_top.classList.remove("on");
				})
				IndexApp.UI.Elements.showcuisine[i].addEventListener('click', function(e){
					// IndexApp.UI.Elements.show = e.target.getAttribute('class');
					localStorage.setItem('show', e.target.getAttribute('class'));
					window.location = "#";
					window.location = "#list";
					IndexApp.UI.Elements.window_top.classList.remove("on");
				})
				IndexApp.UI.Elements.showfood[i].addEventListener('click', function(e){
					// IndexApp.UI.Elements.show = e.target.getAttribute('class');
					localStorage.setItem('show', e.target.getAttribute('class'));
					window.location = "#";
					window.location = "#list";
					IndexApp.UI.Elements.window_top.classList.remove("on");
				})
			}
			
		}
		,toRegister: function(){
			IndexApp.UI.Elements.button_to_register.addEventListener('click', function(){
				var flag = false, arr;
				if (localStorage.getItem('array_of_users') == null) arr = [];
				else arr = JSON.parse(localStorage.getItem('array_of_users'));
				var obj = {};
				obj.id = arr.length + 1;
				obj.name = IndexApp.UI.Elements.formregistration_arrayofinput[0].value;
				obj.sername = IndexApp.UI.Elements.formregistration_arrayofinput[1].value;
				obj.login = IndexApp.UI.Elements.formregistration_arrayofinput[2].value;
				obj.password = IndexApp.UI.Elements.formregistration_arrayofinput[3].value;
				obj.repeat_password = IndexApp.UI.Elements.formregistration_arrayofinput[4].value;
				obj.email = IndexApp.UI.Elements.formregistration_arrayofinput[5].value;
				for (var prop in obj){
					if (obj[prop] == ""){
						alert('Поле ' + prop + ' не заполнено!');
						flag = true;
					}
				}
				if (obj.password != obj.repeat_password) {
					flag = true;
					alert('Пароли не совпадают');
				}
				if (!flag) { 
					arr.push(obj); 
					localStorage.setItem('array_of_users', JSON.stringify(arr));
					IndexApp.UI.Elements.window_registration.classList.remove('on');
					IndexApp.UI.Elements.window_login.classList.add('on'); 
				};
			})
		}
		,toLogin: function(){
			IndexApp.UI.Elements.formlogin_to_login.addEventListener('click', function(e){
				e.preventDefault();
				var arr = JSON.parse(localStorage.getItem('array_of_users')).concat();
				arr.forEach(function(item){
					if (item.login == IndexApp.UI.Elements.formlogin_login.value && item.password == IndexApp.UI.Elements.formlogin_password.value){
						IndexApp.UI.Elements.window_login.classList.remove('on');
						IndexApp.UI.Elements.fullfixedscreen.classList.remove('on');
						var obj = {};
						obj.id = item.id;
						obj.status = "online";
						localStorage.setItem('status', JSON.stringify(obj));
						IndexApp.UI.Elements.fullheader_login.innerText = "Личный кабинет";
						IndexApp.UI.Elements.fullheader_registration.innerText = "Выход";
						IndexApp.UI.Elements.smallheader_login.innerText = "Личный кабинет";
						IndexApp.UI.Elements.smallheader_registration.innerText = "Выход";
					}
					// else {
					// 	alert("Введены неверные данные!");
					// }
				})
			})
		}
		,Elements: {
			stopInterval : 0,
			show: "",
			main_backontop : document.getElementsByClassName('back-on-top')[0],
			fullheader_login: document.getElementsByClassName('login')[0],
			fullheader_registration: document.getElementsByClassName('registration')[0],
			smallheader_bar: document.getElementsByClassName('bar')[0],
			smallheader_submenu: document.getElementsByClassName('container-list-submenu')[0],
			smallheader_login: document.getElementsByClassName('submenu-login')[0],
			smallheader_registration: document.getElementsByClassName('submenu-registration')[0],
			fullfixedscreen: document.getElementsByClassName('cover-div')[0],
			window_login: document.getElementsByClassName('div-login')[0],
			window_registration: document.getElementsByClassName('div-registration')[0],
			formlogin_login: document.getElementsByClassName('login-name')[0],
			formlogin_password: document.getElementsByClassName('login-password')[0],
			formlogin_to_login: document.getElementsByClassName('button-login')[0],
			formlogin_registration: document.getElementsByClassName('button-registration')[0],
			formlogin_closelogin: document.getElementsByClassName('close-login')[0],
			formregistration_closeregistration: document.getElementsByClassName('close-registration')[0],
			formregistration_arrayofinput: document.querySelectorAll('.form-registration > input'),
			button_showtop: document.getElementsByClassName('showtop'),
			window_top: document.getElementsByClassName('container-main-top')[0],
			close_window_top: document.getElementsByClassName('back')[0],
			showcafe: document.getElementsByClassName('cafe'),
			showcuisine: document.getElementsByClassName('cuisine'),
			showfood: document.getElementsByClassName('food'),
			button_to_register: document.getElementsByClassName('button-registration-finally')[0],
		}
	}
}

IndexApp.init();