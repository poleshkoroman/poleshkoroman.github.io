// ==UserScript==
// @name         PlayAudio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  play audio in vk
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require		 https://poleshkoroman.github.io/VoiceAssistant.js
// @match        https://vk.com/romanpoleshko
// @match		 https://www.youtube.com/
// @match		 https://www.gismeteo.by/
// ==/UserScript==


var inline_src = (<><![CDATA[

	let main_data = [
		{
			questions: "Лёха",
			answer: "kto eto?",
			do: "login_again"
		},
		{
			questions: "Рома",
			answer: "dobro pojalovat' Roman Olegovich",
			do: "status_ok"
		},
		{
			questions: "Даша",
			answer: "dobro pojalovat' Dar'ya Vyacheslavovna",
			do: "status_ok"
		}
	];

    let data = [
    	{
			questions: "Лёха",
			answer: "sho?",
			do: "again"
		},
		{
			questions: "Здорово",
			answer: "darov",
			do: "again"
		},
		{
			questions: "Включи музыку",
			answer: "kakuy",
			do: "again"
		},
		{
			questions: "YouTube",
			answer: "",
			do: "youtube"
		},
		{
			questions: "Включи музыку VK",
			answer: "",
			do: "vk_music"
		},
		{
			questions: "Выключи музыку VK",
			answer: "",
			do: "vk_music"
		},
		{
			questions: "что по погоде",
			answer: "",
			do: "weather"
		},
		{
			questions: "погода",
			answer: "",
			do: "weather"
		},
		{
			questions: "переводчик",
			answer: "",
			do: "translate"
		},
		{
			questions: "красавчик",
			answer: "pasiba",
			do: "again"
		},
		{
			questions: "Спасибо",
			answer: "ne za chto braatan",
			do: "again"
		},
		{
			questions: "Как дела",
			answer: "kak vsegda za ebis",
			do: "again"
		},
		{
			questions: "понял",
			answer: "krasava",
			do: "again"
		},
		{
			questions: "выход",
			answer: "Aleksey deactivated",
			do: "off"
		},
		{
			questions: "ничего",
			answer: "kek",
			do: "again"
		},
		{
			answer: "ne ponyal",
			do: "again"
		}
	]

	console.log(localStorage.getItem("weather"));

	const speech = (array) => {
		recognizer.onresult = (event) => {
		    const result = event.results[event.resultIndex];
		    if (result.isFinal) {
		   		caseEvent(result[0].transcript, array);
			}
	  	};
	};

	const caseEvent = (text, arr) => {
		console.log(text);
		arr.forEach((item) => {
			if (item.questions === text) {
				const synth = speechSynthesis;
	  			const utterance = new SpeechSynthesisUtterance(item.answer);
	  			synth.speak(utterance);
		  		doSomething(item.do);
			}
		})
	};
	const doSomething = (dosomething) => {
		switch (dosomething) {
			case "again" : {
				speech(data);
				break;
			}
			case "vk_music" : {
				let href = location.href;
				let reg = /vk.com/;
				let host = href.match(reg);
				if (host[0] === "vk.com") {
					let click = new Event("click");
					document.getElementsByClassName("_audio_row__play_btn")[0].dispatchEvent(click);
					break;
				}
				else alert("Ты не в вк!");
				speech(data);
				break;
			}
			case "off" : {
				speech(main_data);
			  	break;
			}
			case "weather" : {
				localStorage.setItem("weather", "true");
				window.open("https:\/\/www.gismeteo.by/");
				break;
			}
			case "translate" : {
				window.open("https:\/\/translate.google.by/");
				break;
			}
			case "youtube" : {
				window.open("https:\/\/www.youtube.com/");
				break;
			}
			case "login_again" : {
				speech(main_data);
				break;
			}
			case "status_ok" : {
				speech(data);
				break;
			}
		}
	};
		
	function func(){
		recognizer.start();	
	};

	const recognizer = new webkitSpeechRecognition();
	recognizer.interimResults = true;
	recognizer.lang = 'ru-Ru';
	
	recognizer.start();
	recognizer.addEventListener('end', func);
	speech(main_data);

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);