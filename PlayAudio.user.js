// ==UserScript==
// @name         PlayAudio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  play audio in vk
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require		 https://poleshkoroman.github.io/VoiceAssistant.js
// @match        https://vk.com/feed
// ==/UserScript==


var inline_src = (<><![CDATA[

	let main_data = [
		{
			questions: "Лёха",
			answer: "кто это?",
			do: "login_again"
		},
		{
			questions: "Рома",
			answer: "Добро пожаловать Роман Олегович",
			do: "status_ok"
		},
		{
			questions: "Даша",
			answer: "Добро пожаловать Дарья Вячеславовна",
			do: "status_ok"
		}
	];

    let data = [
    	{
			questions: "Лёха",
			answer: "чё?",
			do: "again"
		},
		{
			questions: "Здорово",
			answer: "даров",
			do: "again"
		},
		{
			questions: "Обнови",
			answer: "",
			do: "refresh"
		},
		{
			questions: "Включи музыку",
			answer: "какую",
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
			answer: "пасиба",
			do: "again"
		},
		{
			questions: "Спасибо",
			answer: "не за что братан",
			do: "again"
		},
		{
			questions: "Как дела",
			answer: "как всегда заебись",
			do: "again"
		},
		{
			questions: "понял",
			answer: "красава",
			do: "again"
		},
		{
			questions: "выход",
			answer: "Лёха деактивэйтэд",
			do: "off"
		},
		{
			questions: "ничего",
			answer: "кек",
			do: "again"
		},
		{
			answer: "не понял",
			do: "again"
		}
	]

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
                window.open("https://www.gismeteo.by/");
				fetch("http://localhost:5000/weather", {
		            method: "GET",
		            headers: {
		                "Content-Type": "application/json"
		            }
		        }).then(
		            function (response) {
		                if (response.status !== 200) {
		                    console.log('Looks like there was a problem. Status Code: ' +
		                        response.status);
		                }
		                return response.json();
		            })
		            .then(function (data) {
                        console.log(data);
                        let sign = data.temperature.slice(0, 1);
		                const synth = speechSynthesis;
                        const utterance = new SpeechSynthesisUtterance(`В ${ data.location } в ${ data.time } ${ sign === "+" ? "плюс" : "минус" } ${ data.temperature }`);
	  			        synth.speak(utterance);
		            });
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
			case "refresh" : {
				location.reload();
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
		
	const func = () => {
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