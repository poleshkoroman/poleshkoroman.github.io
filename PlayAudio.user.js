// ==UserScript==
// @name         PlayAudio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  play audio in vk
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://vk.com/romanpoleshko
// ==/UserScript==


var inline_src = (<><![CDATA[

 	// data

	const data = {
		radiorecord_station : [
			{
				request: "чилаут",
				result: "",
				action: chooseRadioRecordStation("чилаут")
			},
			{
				request: "классика",
				result: "",
				action: chooseRadioRecordStation("классика")
			},
			{
				request: "рок",
				result: "",
				action: chooseRadioRecordStation("рок")
			},
	        {
				request: "Deep",
				result: "",
				action: chooseRadioRecordStation("Deep")
			},
	                       {
				request: "романтику",
				result: "ууу, я закрываю глаза и уши",
				action: chooseRadioRecordStation("романтику")
			},
	        {
				request: "русскую",
				result: "",
				action: chooseRadioRecordStation("русскую")
			},
	        {
				request: "OK",
				result: "",
				action: again()
			}
		],
		users : [
			{
				request: "Рома",
				result: "Добро пожаловать Роман Олегович",
				action: userIsVerified()
			},
			{
				request: "Даша",
				result: "Добро пожаловать Дарья Вячеславовна",
				action: userIsVerified()
			}
		],
		opportunities : [
	    	{
				request: "Лёха",
				result: "чё?",
				action: again()
			},
			{
				request: "Здорово",
				result: "даров",
				action: again()
			},
			{
				request: "Обнови",
				result: "",
				action: refresh()
			},
			{
				request: "Включи Radio Record",
				result: "Какую станцию",
				action: playRadioRecord()
			},
	        {
				request: "Выключи радио Record",
				result: "",
				action: closeRadioRecord()
			},
			{
				request: "YouTube",
				result: "",
				action: openYoutube()
			},
			{
				request: "Включи музыку VK",
				result: "",
				action: playVkMusic()
			},
	        {
	            request: "дальше",
				result: "",
				action: nextTrackInVk()
	        },
	        {
	            request: "назад",
				result: "",
				action: previousTrackInVk()
	        },
			{
				request: "Выключи музыку VK",
				result: "",
				action: playVkMusic()
			},
			{
				request: "погода",
				result: "",
				action: checkWeather()
			},
			{
				request: "переводчик",
				result: "",
				action: openTranslate()
			},
			{
				request: "красавчик",
				result: "пасиба",
				action: again()
			},
			{
				request: "Спасибо",
				result: "не за что братан",
				action: again()
			},
			{
				request: "Как дела",
				result: "как всегда заебись",
				action: again()
			},
			{
				request: "понял",
				result: "красава",
				action: again()
			},
			{
				request: "выход",
				result: "Лёха деактивэйтэд",
				action: offAlexey()
			},
			{
				request: "ничего",
				result: "кек",
				action: again()
			},
			{
				result: "не понял",
				action: again()
			}
		]
	};

  //   let radiorecord_station = [
  //       {
		// 	request: "чилаут",
		// 	result: "",
		// 	action "send_station"
		// },
		// {
		// 	request: "классика",
		// 	result: "",
		// 	action "send_station"
		// },
		// {
		// 	request: "рок",
		// 	result: "",
		// 	action "send_station"
		// },
  //       {
		// 	request: "Deep",
		// 	result: "",
		// 	action "send_station"
		// },
  //                      {
		// 	request: "романтику",
		// 	result: "ууу, я закрываю глаза и уши",
		// 	action "send_station"
		// },
  //       {
		// 	request: "русскую",
		// 	result: "",
		// 	action "send_station"
		// },
  //       {
		// 	request: "OK",
		// 	result: "",
		// 	action "close_radiorecord"
		// },
  //   ];

	// let main_data = [
	// 	{
	// 		request: "Рома",
	// 		result: "Добро пожаловать Роман Олегович",
	// 		action "status_ok"
	// 	},
	// 	{
	// 		request: "Даша",
	// 		result: "Добро пожаловать Дарья Вячеславовна",
	// 		action "status_ok"
	// 	}
	// ];

 //    let data = [
 //    	{
	// 		request: "Лёха",
	// 		result: "чё?",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "Здорово",
	// 		result: "даров",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "Обнови",
	// 		result: "",
	// 		action "refresh"
	// 	},
	// 	{
	// 		request: "Включи Radio Record",
	// 		result: "Какую станцию",
	// 		action "open_radiorecord"
	// 	},
 //        {
	// 		request: "Выключи радио Record",
	// 		result: "",
	// 		action "close_radiorecord_page"
	// 	},
	// 	{
	// 		request: "YouTube",
	// 		result: "",
	// 		action "youtube"
	// 	},
	// 	{
	// 		request: "Включи музыку VK",
	// 		result: "",
	// 		action "vk_music"
	// 	},
 //        {
 //            request: "дальше",
	// 		result: "",
	// 		action "next"
 //        },
 //        {
 //            request: "назад",
	// 		result: "",
	// 		action "previous"
 //        },
	// 	{
	// 		request: "Выключи музыку VK",
	// 		result: "",
	// 		action "vk_music"
	// 	},
	// 	{
	// 		request: "что по погоде",
	// 		result: "",
	// 		action "weather"
	// 	},
	// 	{
	// 		request: "погода",
	// 		result: "",
	// 		action "weather"
	// 	},
	// 	{
	// 		request: "переводчик",
	// 		result: "",
	// 		action "translate"
	// 	},
	// 	{
	// 		request: "красавчик",
	// 		result: "пасиба",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "Спасибо",
	// 		result: "не за что братан",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "Как дела",
	// 		result: "как всегда заебись",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "понял",
	// 		result: "красава",
	// 		action "again"
	// 	},
	// 	{
	// 		request: "выход",
	// 		result: "Лёха деактивэйтэд",
	// 		action "off"
	// 	},
	// 	{
	// 		request: "ничего",
	// 		result: "кек",
	// 		action "again"
	// 	},
	// 	{
	// 		result: "не понял",
	// 		action "again"
	// 	}
	// ];

    const radiorecord = {
        state: false
    };

    // actions

    const again = () => {
		speech(data.opportunities);
		changeAlexeyStateAndMode("Леха активирован", "Доступны все команды.");
	}

	const playRadioRecord = () => {
		changeAlexeyStateAndMode("Леха активирован", "Включены команды управления из Радио Рекорд.");
		speech(data.radiorecord_station);
	}

	const closeRadioRecord = () => {
		fetch("http://localhost:5000/radiorecord-close", {
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(
		    function (response) {
		        if (response.status !== 200) {
		            console.log('Looks like there was a problem. Status Code: ' + response.status);
		        }
		        return response.json();
		    })
            .then((res) => {
                radiorecord.state = res.state;
            })
	}

	const chooseRadioRecordStation = (request) => {
		fetch("http://localhost:5000/radiorecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
                ,body: JSON.stringify({ station: request }),
        }).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.json();
        }).then((data) => {
            if (!radiorecord.state) { window.open("https://www.radiorecord.fm/") };
            radiorecord.state = data.state;
        })
	}

	const offAlexey = () => {
		speech(data.users);
        changeAlexeyStateAndMode("Леха активирован", "Авторизируйтесь");
	}

	const checkWeather = () => {
		window.open("https://www.gismeteo.by/");
		fetch("http://localhost:5000/weather", {
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function (response) {
		    if (response.status !== 200) {
		      	console.log('Looks like there was a problem. Status Code: ' + response.status);
		    }
		    return response.json();
		}).then(
		  	function (res) {
                let sign = res.temperature.slice(0, 1);
		        const synth = speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(`В ${ res.location } в ${ res.time } по ощущениям ${ sign === "+" ? "плюс" : "минус" } ${ res.temperature }`);
	  		    synth.speak(utterance);
			});
	}

	const playVkMusic = () => {
		let href = location.href;
		let reg = /vk.com/;
		let host = href.match(reg);
		if (host[0] === "vk.com") {
			let click = new Event("click");
			document.getElementsByClassName("top_audio_player_play")[0].dispatchEvent(click);
		}
		else alert("Ты не в вк!");
		speech(data.opportunities);
	}

	const nextTrackInVk = () => {
		let click = new Event("click");
        document.getElementsByClassName("top_audio_player_next")[0].dispatchEvent(click);
	}

	const previousTrackInVk = () => {
		let click = new Event("click");
        document.getElementsByClassName("top_audio_player_prev")[0].dispatchEvent(click);
	}	

	const openTranslate = () => {
		window.open("https:\/\/translate.google.by/");
	}

	const openYoutube = () => {
		window.open("https:\/\/www.youtube.com/");
	}

	const refresh = () => {
		location.reload();
	}

	// const userIsNotVerified = () => {
	// 	speech(main_data);
	// }

	const userIsVerified = () => {
		changeAlexeyStateAndMode("Леха активирован", "Доступны все команды");
        newMessage();
		speech(data.opportunities);
	}

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
               if (document.getElementsByClassName("mem_link")[0].outerText !== undefined) {
                   const autor = document.getElementsByClassName("mem_link")[0].outerText;
                   const synth = speechSynthesis;
	  		       const utterance = new SpeechSynthesisUtterance(`Новое сообщение от ${ autor }`);
	  		       synth.speak(utterance);
               };
           }
        },7900);
    };

	const caseEvent = (text, arr) => {
		arr.forEach((item) => {
			if (item.request === text) {
				const synth = speechSynthesis;
	  			const utterance = new SpeechSynthesisUtterance(item.result);
	  			synth.speak(utterance);
		  		item.action;
			}
		})
	};

	// const doSomething = (action, request) => {
	// 	switch (action) {
	// 		case "again" : {
	// 			speech(data);
	// 			break;
	// 		}
	// 		case "vk_music" : {
	// 			let href = location.href;
	// 			let reg = /vk.com/;
	// 			let host = href.match(reg);
	// 			if (host[0] === "vk.com") {
	// 				let click = new Event("click");
	// 				document.getElementsByClassName("top_audio_player_play")[0].dispatchEvent(click);
	// 				break;
	// 			}
	// 			else alert("Ты не в вк!");
	// 			speech(data);
	// 			break;
	// 		}
 //            case "open_radiorecord" : {
 //                speech(radiorecord_station);
 //                changeAlexeyStateAndMode("Леха активирован", "Включены команды управления из Радио Рекорд.");
 //                break;
 //            }
 //            case "close_radiorecord" : {
	// 			speech(data);
 //                changeAlexeyStateAndMode("Леха активирован", "Доступны все команды.");
	// 			break;
	// 		}
 //            case "close_radiorecord_page" : {
 //                fetch("http://localhost:5000/radiorecord-close", {
	// 	            method: "GET",
	// 	            headers: {
	// 	                "Content-Type": "application/json"
	// 	            }
	// 	        }).then(
	// 	            function (response) {
	// 	                if (response.status !== 200) {
	// 	                    console.log('Looks like there was a problem. Status Code: ' +
	// 	                        response.status);
	// 	                }
	// 	                return response.json();
	// 	            })
 //                    .then((data) => {
 //                       radiorecord.state = data.state;
 //                    })
 //                break;
 //            }
 //            case "send_station" : {
 //                fetch("http://localhost:5000/radiorecord", {
 //                    method: "POST",
 //                    headers: {
 //                        "Content-Type": "application/json"
 //                    }
 //                    ,body: JSON.stringify({ station: request }),
 //                }).then((response) => {
 //                    if (response.status !== 200) {
 //                        console.log('Looks like there was a problem. Status Code: ' +
 //                                    response.status);
 //                    }
 //                    return response.json();
 //                })
 //                    .then((data) => {
 //                       if (!radiorecord.state) { window.open("https://www.radiorecord.fm/") };
 //                       radiorecord.state = data.state;
 //                })
 //                break;
 //            }
	// 		case "off" : {
	// 			speech(main_data);
 //                changeAlexeyStateAndMode("Леха активирован", "Авторизируйтесь");
	// 		  	break;
	// 		}
	// 		case "weather" : {
 //                window.open("https://www.gismeteo.by/");
	// 			fetch("http://localhost:5000/weather", {
	// 	            method: "GET",
	// 	            headers: {
	// 	                "Content-Type": "application/json"
	// 	            }
	// 	        }).then(
	// 	            function (response) {
	// 	                if (response.status !== 200) {
	// 	                    console.log('Looks like there was a problem. Status Code: ' +
	// 	                        response.status);
	// 	                }
	// 	                return response.json();
	// 	            })
	// 	            .then(function (data) {
 //                        let sign = data.temperature.slice(0, 1);
	// 	                const synth = speechSynthesis;
 //                        const utterance = new SpeechSynthesisUtterance(`В ${ data.location } в ${ data.time } по ощущениям ${ sign === "+" ? "плюс" : "минус" } ${ data.temperature }`);
	//   			        synth.speak(utterance);
	// 	            });
	// 			break;
	// 		}
 //            case "next" : {
 //                let click = new Event("click");
 //                document.getElementsByClassName("top_audio_player_next")[0].dispatchEvent(click);
 //                break;
 //            }
 //            case "previous" : {
 //                let click = new Event("click");
 //                document.getElementsByClassName("top_audio_player_prev")[0].dispatchEvent(click);
 //                break;
 //            }
	// 		case "translate" : {
	// 			window.open("https:\/\/translate.google.by/");
	// 			break;
	// 		}
	// 		case "youtube" : {
	// 			window.open("https:\/\/www.youtube.com/");
	// 			break;
	// 		}
	// 		case "refresh" : {
	// 			location.reload();
	// 			break;
	// 		}
	// 		case "login_again" : {
	// 			speech(main_data);
	// 			break;
	// 		}
	// 		case "status_ok" : {              
 //                changeAlexeyStateAndMode("Леха активирован", "Доступны все команды");
 //                newMessage();
	// 			speech(data);
	// 			break;
	// 		}
	// 	}
	// };
		
	const infiniteRecognition = () => {
		recognizer.start();
	};

    const showControlPanel = (state = "", mode = "") => {
        const page = document.getElementsByClassName('scroll_fix_wrap')[2];
        const panelContainer = document.createElement('div');
        const alexeyState = document.createElement('span');
        const alexeyMode = document.createElement('span');
        // panelContainer.style.width = 50 + 'px';
        // panelContainer.style.height = 50 + 'px';
        panelContainer.style.position = 'fixed';
        panelContainer.style.top = 100 + 'px';
        panelContainer.style.right = 70 + 'px';
        panelContainer.style.backgroundColor = '#4a76a8';
        panelContainer.style.padding = 10 + 'px';
        panelContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        panelContainer.style.display = 'flex';
        panelContainer.style.flexDirection = 'column';
        alexeyState.classList.add('alexey-state');
        alexeyState.innerText = state;
        alexeyState.style.textAlign = "center";
        alexeyState.style.color = 'white';
        alexeyMode.classList.add('alexey-mode');
        alexeyMode.innerText = mode;
        alexeyMode.style.textAlign = "center";
        alexeyMode.style.color = 'white';
        panelContainer.appendChild(alexeyState);
        panelContainer.appendChild(alexeyMode);
        page.appendChild(panelContainer);
    };

    const changeAlexeyStateAndMode = (state = "", mode = "") => {
        document.getElementsByClassName('alexey-state')[0].innerText = state;
        document.getElementsByClassName('alexey-mode')[0].innerText = mode;
    };

    const initAlexey = () => {
    	const recognizer = new webkitSpeechRecognition();
		recognizer.interimResults = true;
		recognizer.lang = 'ru-Ru';
		recognizer.start();
	    showControlPanel("Леха активирован", "Авторизируйтесь");
		recognizer.addEventListener('end', infiniteRecognition);
		speech(data.users);
    }

    initAlexey();

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);