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

	function init(){
		console.log('microphone activated');
		recognizer.start();
	};

	setTimeout(init(), 2000);

})();