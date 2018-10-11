var PersonalAreaApp = {
	init: function(){
		PersonalAreaApp.UI.init();
	},
	Constants: {
	},
	Data: {	
	},
	UI : {
		init: function(){
			PersonalAreaApp.UI.startPageProcessing();
			PersonalAreaApp.UI.fillFields();
			PersonalAreaApp.UI.saveChange();
		}
		,startPageProcessing: function(){
			document.getElementsByClassName('personal-data')[0].addEventListener('click', function(){
				document.getElementsByClassName('personal-data-content')[0].classList.add('on');
				document.getElementsByClassName('history-content')[0].classList.remove('on');
				document.getElementsByClassName('favorites-content')[0].classList.remove('on');
				document.getElementsByClassName('delete-account-content')[0].classList.remove('on');
				this.style.background = "rgba(0, 0, 0, 0.7)";
				document.getElementsByClassName('history')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('favorites')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('delete-account')[0].style.background = "rgba(0, 0, 0, 0)";
			});
			document.getElementsByClassName('history')[0].addEventListener('click', function(){
				document.getElementsByClassName('personal-data-content')[0].classList.remove('on');
				document.getElementsByClassName('history-content')[0].classList.add('on');
				document.getElementsByClassName('favorites-content')[0].classList.remove('on');
				document.getElementsByClassName('delete-account-content')[0].classList.remove('on');
				this.style.background = "rgba(0, 0, 0, 0.7)";
				document.getElementsByClassName('personal-data')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('favorites')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('delete-account')[0].style.background = "rgba(0, 0, 0, 0)";
			});
			document.getElementsByClassName('favorites')[0].addEventListener('click', function(){
				document.getElementsByClassName('personal-data-content')[0].classList.remove('on');
				document.getElementsByClassName('history-content')[0].classList.remove('on');
				document.getElementsByClassName('favorites-content')[0].classList.add('on');
				document.getElementsByClassName('delete-account-content')[0].classList.remove('on');
				this.style.background = "rgba(0, 0, 0, 0.7)";
				document.getElementsByClassName('personal-data')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('history')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('delete-account')[0].style.background = "rgba(0, 0, 0, 0)";
			});
			document.getElementsByClassName('delete-account')[0].addEventListener('click', function(){
				document.getElementsByClassName('personal-data-content')[0].classList.remove('on');
				document.getElementsByClassName('history-content')[0].classList.remove('on');
				document.getElementsByClassName('favorites-content')[0].classList.remove('on');
				document.getElementsByClassName('delete-account-content')[0].classList.add('on');
				this.style.background = "rgba(0, 0, 0, 0.7)";
				document.getElementsByClassName('personal-data')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('favorites')[0].style.background = "rgba(0, 0, 0, 0)";
				document.getElementsByClassName('history')[0].style.background = "rgba(0, 0, 0, 0)";
			});
		}
		,fillFields: function(){
			var obj = JSON.parse(localStorage.getItem('status'));
			var arr = JSON.parse(localStorage.getItem('array_of_users'));
			if (obj.status == "online"){
				document.querySelectorAll(' .form-personalarea > div > input')[0].value = arr[+obj.id-1].name;
				document.querySelectorAll(' .form-personalarea > div > input')[1].value = arr[+obj.id-1].sername;
				document.querySelectorAll(' .form-personalarea > div > input')[2].value = arr[+obj.id-1].phone;
				document.querySelectorAll(' .form-personalarea > div > input')[3].value = arr[+obj.id-1].age;
				document.querySelectorAll(' .form-personalarea > div > input')[4].value = arr[+obj.id-1].locate;
				document.querySelectorAll(' .form-personalarea > div > input')[5].value = arr[+obj.id-1].email;
			}
		}
		,saveChange: function(){
			document.getElementsByClassName('save')[0].addEventListener('click', function(){
				var obj = JSON.parse(localStorage.getItem('status'));
				var arr = JSON.parse(localStorage.getItem('array_of_users'));
				arr[+obj.id-1].name = document.querySelectorAll(' .form-personalarea > div > input')[0].value;
				arr[+obj.id-1].sername = document.querySelectorAll(' .form-personalarea > div > input')[1].value;
				arr[+obj.id-1].phone = document.querySelectorAll(' .form-personalarea > div > input')[2].value;
				arr[+obj.id-1].age = document.querySelectorAll(' .form-personalarea > div > input')[3].value;
				arr[+obj.id-1].locate = document.querySelectorAll(' .form-personalarea > div > input')[4].value;
				arr[+obj.id-1].email = document.querySelectorAll(' .form-personalarea > div > input')[5].value;
				arr[+obj.id-1].password = document.querySelectorAll(' .form-personalarea > div > input')[6].value;
				localStorage.setItem('array_of_users', JSON.stringify(arr));
				console.log(arr);
			})
		}	
		,Elements: {
		}
	}
}