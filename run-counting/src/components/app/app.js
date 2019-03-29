import React, { Component } from 'react';
import Header from '../header';
import Authorization from '../authorization';
import JogsList from '../jogs-list';
import ScamperInfo from '../scamper-info';
import Info from '../info';
import EmptyList from '../empty-list';
import './app.css';

class App extends Component {
  render() {
    return (
    	<div className="wrapper">
    		<Header />
    		<EmptyList />
    	</div>
    );
  }
}

export default App;
