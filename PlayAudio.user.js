// ==UserScript==
// @name         PlayAudio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  play audio in vk
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://vk.com/audios194032004
// ==/UserScript==

var inline_src = (<><![CDATA[
	import * from '../my_projects/smart_house_v0.0.1/src/App';
    alert(recognizer);
	let click = new Event('click');
	document.getElementsByClassName('_audio_row__play_btn')[0].dispatchEvent(click);

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);