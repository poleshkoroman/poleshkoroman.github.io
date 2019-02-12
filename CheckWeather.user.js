// ==UserScript==
// @name         CheckWeather
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  check weather on gismeteo
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://www.gismeteo.by/
// ==/UserScript==


var inline_src = (<><![CDATA[
    window.onload = () => {
        const location = document.getElementsByClassName("weather_current_link no_border")[0].outerText + "е";
        const temperature = document.getElementsByClassName("unit_temperature_c")[1].outerText;
        const time = document.getElementById("time").children[0].outerText.slice(-5);
        const obj = {
            location,
            temperature,
            time
        };
        fetch("http://localhost:5000/weather", {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        }
	            ,body: JSON.stringify(obj),
	        }).then((response) => {
	           if (response.status !== 200) {
	               console.log('Looks like there was a problem. Status Code: ' +
	               response.status);
	           }
	           return response.json();
	           })
	         .then((data) => {
                  window.close();
             })
    }
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);