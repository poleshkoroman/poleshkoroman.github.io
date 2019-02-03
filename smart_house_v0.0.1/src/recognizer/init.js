const recognizer = new window.webkitSpeechRecognition();
recognizer.interimResults = true;
recognizer.lang = 'ru-Ru';

export { recognizer }