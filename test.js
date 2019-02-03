(function() {
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