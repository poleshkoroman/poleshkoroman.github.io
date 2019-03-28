import React, { Component } from 'react';
import Header from '../header';
import Authorization from '../authorization';
import RunningList from '../running-list'
import './app.css';

class App extends Component {
  render() {
    return (
    	<div className="wrapper">
    		<Header />
    		<RunningList />
    	</div>
    );
  }
}

export default App;
