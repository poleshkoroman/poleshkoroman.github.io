// ==UserScript==
// @name         PlayRadiorecord
// @namespace    kek
// @version      0.1
// @description  play music on radiorecord
// @author       Roman Poleshko
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://www.radiorecord.fm/
// ==/UserScript==

var inline_src = (<><![CDATA[
    window.onload = () => {

        const all_station = document.getElementById("but_stations");
        const rock_station = document.getElementsByClassName("station_button")[6];
        const chillout_station = document.getElementsByClassName("station_button")[18];
        const classic_station = document.getElementsByClassName("station_button")[35];
        const deep_station = document.getElementsByClassName("station_button")[17];
        const romantic_station = document.getElementsByClassName("station_button")[23];
        const russian_station = document.getElementsByClassName("station_button")[69];
        const click = new Event("click");

        setInterval(() => {
             fetch("http://localhost:5000/radiorecord-check", {
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
                        if (!data.state) {
                            window.close();
                        }
		            });
            fetch("http://localhost:5000/radiorecord", {
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
                 switch (data.station) {
                     case "рок" : {
                         all_station.dispatchEvent(click);
                         rock_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                     case "чилаут" : {
                         all_station.dispatchEvent(click);
                         chillout_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                     case "классика" : {
                         all_station.dispatchEvent(click);
                         classic_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                     case "Deep" : {
                         all_station.dispatchEvent(click);
                         deep_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                     case "романтику" : {
                         all_station.dispatchEvent(click);
                         romantic_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                     case "русскую" : {
                         all_station.dispatchEvent(click);
                         russian_station.dispatchEvent(click);
                         all_station.dispatchEvent(click);
                         break;
                     }
                 }
             });
        },1000)
    };


]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);