import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../header';
import Authorization from '../authorization';
import JogsList from '../jogs-list';
import ScamperInfo from '../scamper-info';
import Info from '../info';
import EmptyList from '../empty-list';
import Contact from '../contact';
import MobileMenu from '../mobile-menu';

import './app.css';

class App extends Component {

	state = {
		from_page : null,
		current_run : {
    		date: null,
    		speed: null,
    		distance: null,
      		time: null,
      		flag: null
      	},
	}

	setPage = (pathname) => {
		this.setState({ from_page: pathname });
	}

	setCurrentRun = (obj) => {
		this.setState({ current_run: obj });
	}

  	render() {

	    return (
	    	<div className="wrapper">
	    		<BrowserRouter>
		    		<Header setPage = { this.setPage } />
			    	<Switch>
			    		<Route exact path='/' component={ Authorization } />
			    		<Route path='/menu' render={ (props) => <MobileMenu props={ this.state } />} />
			            <Route path='/empty' component={ EmptyList } />
			            <Route path='/jogs' render={ (props) => <JogsList setCurrentRun={ this.setCurrentRun } props={ props } />} />
			            <Route path='/scamper' render={ (props) => <ScamperInfo props={ this.state } />} />
			            <Route path='/info' component={ Info } />
			            <Route path='/contact' component={ Contact } />
			    	</Switch>	
		    	</BrowserRouter>
	    	</div>
	    );
  	}
}

export default App;
