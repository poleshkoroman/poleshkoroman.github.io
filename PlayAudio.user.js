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
// ==/UserScript==


var inline_src = (<><![CDATA[

    let radio_record_station = [
        {
			questions: "чилаут",
			answer: "",
			do: "send_station"
		},
		{
			questions: "классика",
			answer: "",
			do: "send_station"
		},
		{
			questions: "рок",
			answer: "",
			do: "send_station"
		},
        {
			questions: "Deep",
			answer: "",
			do: "send_station"
		},
                       {
			questions: "романтику",
			answer: "ууу, я закрываю глаза и уши",
			do: "send_station"
		},
        {
			questions: "русскую",
			answer: "",
			do: "send_station"
		},
        {
			questions: "OK",
			answer: "",
			do: "again"
		},
    ];

	let main_data = [
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
			questions: "Включи Radio Record",
			answer: "Какую станцию",
			do: "open_radiorecord"
		},
        {
			questions: "Выключи радио Record",
			answer: "",
			do: "close_radiorecord"
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
            questions: "дальше",
			answer: "",
			do: "next"
        },
        {
            questions: "назад",
			answer: "",
			do: "previous"
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

    const radiorecord = {
        state: false
    };

	const speech = (array) => {
		recognizer.onresult = (event) => {
		    const result = event.results[event.resultIndex];
		    if (result.isFinal) {
		   		caseEvent(result[0].transcript, array);
			}
	  	};
	};

    const newMessage = () => {
        setInterval(() => {
           if (document.getElementById("notifiers_wrap").children.length > 0) {
               const autor = document.getElementsByClassName("mem_link")[0].outerText;
               const synth = speechSynthesis;
	  		   const utterance = new SpeechSynthesisUtterance(`Новое сообщение от ${ autor }`);
	  		   synth.speak(utterance);
           }
        },7000);
    };

	const caseEvent = (text, arr) => {
		arr.forEach((item) => {
			if (item.questions === text) {
				const synth = speechSynthesis;
	  			const utterance = new SpeechSynthesisUtterance(item.answer);
	  			synth.speak(utterance);
		  		doSomething(item.do, item.questions);
			}
		})
	};

	const doSomething = (dosomething, questions) => {
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
					document.getElementsByClassName("top_audio_player_play")[0].dispatchEvent(click);
					break;
				}
				else alert("Ты не в вк!");
				speech(data);
				break;
			}
            case "open_radiorecord" : {
                speech(radio_record_station);
                break;
            }
            case "close_radiorecord" : {
                fetch("http://localhost:5000/radiorecord-close", {
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
                    .then((data) => {
                       radiorecord.state = data.state;
                    })
                const synth = speechSynthesis;
                const utterance = new SpeechSynthesisUtterance('Доступны все команды.');
                synth.speak(utterance);
                console.clear();
                console.log('Доступны все команды.');
                break;
            }
            case "send_station" : {
                fetch("http://localhost:5000/radiorecord", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                    ,body: JSON.stringify({ station: questions }),
                }).then((response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                    }
                    return response.json();
                })
                    .then((data) => {
                       const synth = speechSynthesis;
                       const utterance = new SpeechSynthesisUtterance('Включены команды управления из Радио Рекорд.');
                       console.clear();
                       console.log('Включены команды управления из Радио Рекорд.');
                       synth.speak(utterance);
                       if (!radiorecord.state) { window.open("https://www.radiorecord.fm/") };
                       radiorecord.state = data.state;
                })
                break;
            }
			case "off" : {
				speech(main_data);
                console.clear();
                console.log('Авторизируйтесь.');
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
                        let sign = data.temperature.slice(0, 1);
		                const synth = speechSynthesis;
                        const utterance = new SpeechSynthesisUtterance(`В ${ data.location } в ${ data.time } по ощущениям ${ sign === "+" ? "плюс" : "минус" } ${ data.temperature }`);
	  			        synth.speak(utterance);
		            });
				break;
			}
            case "next" : {
                let click = new Event("click");
                document.getElementsByClassName("top_audio_player_next")[0].dispatchEvent(click);
                break;
            }
            case "previous" : {
                let click = new Event("click");
                document.getElementsByClassName("top_audio_player_prev")[0].dispatchEvent(click);
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
                const synth = speechSynthesis;
                const utterance = new SpeechSynthesisUtterance('Доступны все команды.');
                synth.speak(utterance);
                console.clear();
                console.log('Доступны все команды.');
                newMessage();
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
    const synth = speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Леха активирован. Авторизируйтесь.");
    console.clear();
    console.log("Леха активирован. Авторизируйтесь.");
	synth.speak(utterance);
	speech(main_data);
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);