import React, { Component } from 'react';
import Photo from './img/tut_by.jpg';
import './contact.css';

class Contact extends Component {
  render() {
    return (
    	<div className="contact-container">
    	 <img src={ Photo }/>
       <a className="social-vk" href="https://vk.com/romanpoleshko" target="_blank">Poleshko Roman</a>
       <a href="tel:3752592751529">+375 (29) 275-15-29</a>
       <a href="mailto:romanpolesko@gmail.com" target="_blank">romanpolesko@gmail.com</a>
    	</div>
    );
  }
}

export default Contact;