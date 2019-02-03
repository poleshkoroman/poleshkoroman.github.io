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

	var recognizer = new webkitSpeechRecognition();
	recognizer.interimResults = true;
	recognizer.lang = 'ru-Ru';
	recognizer.onresult = function (event) {
	    var result = event.results[event.resultIndex];
	    if (result.isFinal) {
	      alert('Вы сказали: ' + result[0].transcript);
	    } 
	};

	recognizer.start();

})();