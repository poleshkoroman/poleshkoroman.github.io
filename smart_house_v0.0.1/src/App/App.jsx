import React, { Component } from 'react';
import { data } from '../data/data.js'
import { recognizer } from '../recognizer/init.js'

export default class App extends Component {

	state = {
		
	}

	componentDidMount() {
		recognizer.start();
		this.speech();
	  	recognizer.addEventListener('end', () => {
	  		recognizer.start();
	  	})
	}

	doSomething = (dosomething) => {
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
				recognizer.removeEventListener('end', () => {
			  		recognizer.start();
			  	});
			  	break;
			}
			case "weather" : {
				window.open("https:\/\/www.gismeteo.by/")
			}
			case "translate" : {
				window.open("https:\/\/translate.google.by/")
			}
		}
	} 

	caseEvent = (text) => {
		data.forEach((item) => {
			if (item.questions === text) {
				const synth = window.speechSynthesis;
	  			const utterance = new SpeechSynthesisUtterance(item.answer);
	  			synth.speak(utterance);
	  			this.doSomething(item.do);
			}
		})
	}

	speech = () => {
		recognizer.onresult = (event, recognizer) => {
		    const result = event.results[event.resultIndex];
		    if (result.isFinal) {
		   		this.caseEvent(result[0].transcript, recognizer);
		    }
	  	};
	}

	render(){
		return (
			<div className="wrapper">	
			</div>
		)
	}
}