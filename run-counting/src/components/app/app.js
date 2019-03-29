import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
    		<BrowserRouter>
	    		<Header />
		    		<Switch>
		    			<Route exact path='/' component={ Authorization } />
		                <Route path='/jogsempty' component={ EmptyList } />
		                <Route path='/jogs' component={ JogsList } />
		                <Route path='/scamper' component={ ScamperInfo } />
		                <Route path='/info' component={ Info } />
		    		</Switch>	
	    	</BrowserRouter>
    	</div>
    );
  }
}

export default App;
