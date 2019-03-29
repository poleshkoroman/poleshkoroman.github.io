import React, { Component } from 'react';
import Header from '../header';
import Authorization from '../authorization';
import JogsList from '../jogs-list';
import ScamperInfo from '../scamper-info';
import Info from '../info';
import './app.css';

class App extends Component {
  render() {
    return (
    	<div className="wrapper">
    		<Header />
    		<JogsList />
    	</div>
    );
  }
}

export default App;
