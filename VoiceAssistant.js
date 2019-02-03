(function() {

    var data = [
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
			answer: "sek",
			do: "youtube"
		},
		{
			questions: "ВК",
			answer: "sek",
			do: "music"
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
			questions: "что по погоде",
			answer: "sek",
			do: "weather"
		},
		{
			questions: "погода",
			answer: "sek",
			do: "weather"
		},
		{
			questions: "переводчик",
			answer: "sek",
			do: "translate"
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
			questions: "вырубай",
			answer: "bb",
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

	// const recognizer = new window.webkitSpeechRecognition();
	// recognizer.interimResults = true;
	// recognizer.lang = 'ru-Ru';

	// const speech = () => {
	// 	recognizer.onresult = (event, recognizer) => {
	// 	    const result = event.results[event.resultIndex];
	// 	    if (result.isFinal) {
	// 	   		caseEvent(result[0].transcript, recognizer);
	// 		}
	//   	};
	// };
	// const caseEvent = (text) => {
	// 	console.log(text);
	// 	data.forEach((item) => {
	// 		if (item.questions === text) {
	// 			const synth = window.speechSynthesis;
	//   			const utterance = new SpeechSynthesisUtterance(item.answer);
	//   			synth.speak(utterance);
	// 	  		doSomething(item.do);
	// 		}
	// 	})
	// };
	// const doSomething = (dosomething) => {
	// 	switch (dosomething) {
	// 		case "again" : {
	// 			this.speech();
	// 			break;
	// 		}
	// 		case "music" : {
	// 			window.open("https:\/\/vk.com\/audios194032004");
	// 			break;
	// 		}
	// 		case "off" : {
	// 			recognizer.removeEventListener('end', this.func);
	// 		  	break;
	// 		}
	// 		case "weather" : {
	// 			window.open("https:\/\/www.gismeteo.by/");
	// 			break;
	// 		}
	// 		case "translate" : {
	// 			window.open("https:\/\/translate.google.by/");
	// 			break;
	// 		}
	// 		case "youtube" : {
	// 			window.open("https:\/\/www.youtube.com/");
	// 			break;
	// 		}
	// 	}
	// };

	var recognizer = new webkitSpeechRecognition();
	recognizer.interimResults = true;
	recognizer.lang = 'ru-Ru';
	function speech(){
		recognizer.onresult = function (event) {
		    var result = event.results[event.resultIndex];
		    if (result.isFinal) {
		      caseEvent(result[0].transcript, recognizer);
		    } 
		};
	}; 

	function doSomething(dosomething){
		switch (dosomething) {
			case "again" : {
				this.speech();
				break;
			}
			case "music" : {
				window.open("https:\/\/vk.com\/audios194032004");
				break;
			}
			case "off" : {
				recognizer.removeEventListener('end', func);
			  	break;
			}
			case "weather" : {
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
		}
	};

	function caseEvent (text) {
		console.log(text);
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			if (item.questions === text) {
				var synth = window.speechSynthesis;
	  			var utterance = new SpeechSynthesisUtterance(item.answer);
	  			synth.speak(utterance);
		  		doSomething(item.do);
			}
		}
			
	};
		
	function func() {
		recognizer.start();	
	};

	document.addEventListener('DOMContentLoaded', function(){
		recognizer.start();
		speech();
	  	recognizer.addEventListener('end', func);
	});

})();