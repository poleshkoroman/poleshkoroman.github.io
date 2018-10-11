var wrapper = document.getElementsByClassName("wrapper")[0];
var settings = {
	"" : {
		path : "html/mainpage.html",
		event : function(){
			MainPageApp.init();
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	}, 
	"#personalarea" : {
		path : "html/personalarea.html",
		event : function(){
			PersonalAreaApp.init();
			clearInterval(MainPageApp.UI.Elements.stopInterval);
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	}, 
	"#cart" : {
		path : "html/cart.html",
		event : function(){
			CartApp.init();
			clearInterval(MainPageApp.UI.Elements.stopInterval);
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	}, 
	"#list" : {
		path : "html/list.html",
		event : function(){
			ListApp.init();
			clearInterval(MainPageApp.UI.Elements.stopInterval);
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	}, 
	"#about" : {
		path : "html/about.html",
		event : function(){
			AboutApp.init();
			clearInterval(MainPageApp.UI.Elements.stopInterval);
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	},
	"#top" : {
		path : "html/top.html",
		event : function(){
			clearInterval(MainPageApp.UI.Elements.stopInterval);
			if (IndexApp.UI.Elements.smallheader_submenu.classList.contains('on')){
				IndexApp.UI.Elements.smallheader_submenu.classList.remove('on');
			}
		}
	}
}

var change = function(){
	var path = settings[location.hash].path;
	var events = settings[location.hash].event;
	var xhr = new XMLHttpRequest; 
	xhr.open("GET", path, true);
	xhr.onload = function(){
		wrapper.innerHTML = this.responseText;
		events();
	}
	xhr.send(null);
}

window.onhashchange = function(){
	change();
}
if (location.hash in settings){
	change();
}