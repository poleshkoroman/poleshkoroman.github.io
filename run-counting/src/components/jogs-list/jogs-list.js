import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JogsServices from '../../services/jogs-service';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './jogs-list.css';

class JogsList extends Component {

  	state = {
      startDate: null,
      finalDate: null,
      jogs: [
        {
        	date: null,
        	speed: null,
        	distance: null,
        	time: null
        },
      ],
      jogsCopy: [
        {
          date: null,
          speed: null,
          distance: null,
          time: null
        }
      ]
    };

    jogsServices = new JogsServices();

   	componentDidMount = () => {

      document.getElementsByClassName('filter-toggle')[0].classList.remove('hidden');

      if (document.getElementsByClassName('filter-toggle')[0].classList.contains('active')) {
        document.getElementsByClassName('filter')[0].classList.add('active');
      }
      let prom = this.jogsServices.getJogs(localStorage.getItem('token'), localStorage.getItem('token_type'));
      prom.then((data) => {
        if (data.response == undefined) {
          this.props.props.history.push('empty');
          return
        }
        let array = data.response.jogs;
        array.forEach((item) => {
          item.speed = (item.distance / item.time).toFixed(2); 
        })
        this.setState({
          jogs: array,
          jogsCopy: array
        });
      })
  	}

    componentWillUnmount = () => {
      document.getElementsByClassName('filter-toggle')[0].classList.add('hidden');
    }

  	filterByStartDate = (date) => {
      if (date !== null) {
        let filterByStartDate = this.state.jogs.filter((item) => {
          return date.getTime() < item.date
        })
        this.setState({ jogs: filterByStartDate, startDate: date.getTime() });
      } 
      else {
        let temp = new Date(this.state.finalDate);
        this.resetFilterByStartDate(temp, this.state.jogsCopy);
      } 	
  	}

    resetFilterByStartDate = (date, array) => {
      let newArr = array.filter((item) => {
        return date.getTime() > item.date
      })
      this.setState({ jogs: newArr, startDate: null });
    }

    filterByFinalDate = (date) => {

      if (date !== null) {
        let filterByFinalDate = this.state.jogs.filter((item) => {
          return date.getTime() > item.date
        })
        this.setState({ jogs: filterByFinalDate, finalDate: date.getTime() });
      }
      else {
        let temp = new Date(this.state.startDate);
        this.resetFilterByFinalDate(temp, this.state.jogsCopy);
      }
    }
    resetFilterByFinalDate = (date, array) => {
      let newArr = array.filter((item) => {
        return date.getTime() < item.date
      })
      this.setState({ jogs: newArr, finalDate: null });
    }

    convertMillisecondsToDateTypeString = (value) => {
      let temp = new Date(value);
      let str = `${ temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate() }.${ (temp.getMonth() + 1) < 10 ? "0" + (temp.getMonth() + 1) : temp.getMonth() + 1 }.${ temp.getYear()+1900 }`;
      return str;
    }

    convertMillisecondsToDate = (value) => {
      if (value) return new Date(value)
        else return null;
    }

    onElementClick = (e) => {
      const obj = {
        date: e.target.getAttribute('date'),
        distance: e.target.getAttribute('distance'),
        time: e.target.getAttribute('time'),
        jog_id: e.target.getAttribute('jog_id'),
        user_id: e.target.getAttribute('user_id'),
        flag: "edit"
      }
      this.props.setCurrentRun(obj);
      localStorage.setItem('cur_obj', JSON.stringify(obj));
    }

    onAddClick = () => {
      const obj = {
        date: new Date(),
        distance: null,
        time: null,
        jog_id: null,
        user_id: null,
        flag: "add"
      }
      this.props.setCurrentRun(obj);
      localStorage.setItem('cur_obj', JSON.stringify(obj));
    }

  	createItems = (array) => {
      if (!array[0] || array[0].distance == null) return null;
  		return array.map((item, index) => {
  			return (
  	  			<div className="item" key={ index } onClick={ this.onElementClick } >
              <Link to={{ pathname: '/scamper' }} date={ item.date } speed={ item.speed } distance={ item.distance } time={ item.time } jog_id={ item.id } user_id = { item.user_id }>
    	  				<div className="icon">
    		  				<svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 87 87">
    						    <g fill="none" fillRule="evenodd">
    						        <circle cx="43.5" cy="43.5" r="43.5" fill="#E990F9"/>
    						        <g fill="#FFF">
    						            <path d="M32.932 28.86h16.937a.808.808 0 0 0 .806-.81.807.807 0 0 0-.806-.809H32.932a.807.807 0 0 0-.806.809c0 .447.36.81.806.81zM17.784 36.772h16.937a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H17.784a.808.808 0 0 0-.806.81c0 .447.361.809.806.809zM22.331 45.099c0 .446.36.809.805.809h16.938a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H23.136a.807.807 0 0 0-.805.81zM32.024 54.504H16.806a.807.807 0 0 0-.806.809c0 .447.36.81.806.81h15.218a.807.807 0 0 0 .806-.81.807.807 0 0 0-.806-.81zM59.407 33.933c2.43 0 4.4-1.979 4.4-4.42s-1.97-4.42-4.4-4.42c-2.432 0-4.402 1.98-4.402 4.42 0 2.441 1.97 4.42 4.402 4.42z"/>
    						            <path d="M66.647 32.66c-2.527 3.556-5.912 3.967-9.554 1.796-.247-.147-1.347-.756-1.59-.901-5.86-3.493-11.71-2.124-15.636 3.396-1.667 2.347 2.19 4.572 3.84 2.252 2.027-2.852 4.605-3.677 7.425-2.773-1.444 2.517-2.706 5.018-4.488 8.572-1.781 3.554-5.715 6.392-9.494 4.172-2.728-1.6-5.187 2.334-2.468 3.93 5.16 3.028 11.21 1.169 14.299-2.768.107.057.22.11.344.153 2.524.883 5.831 3.233 6.84 4.066 1.006.833 2.738 5.077 3.765 7.21 1.248 2.586 5.275.702 4.023-1.896-1.165-2.42-3.121-7.248-4.646-8.47-1.224-.979-3.6-2.802-5.615-3.836a176.456 176.456 0 0 1 4.277-7.854c4.763 1.466 9.29-.26 12.515-4.797 1.67-2.347-2.187-4.572-3.837-2.252z"/>
    						        </g>
    						    </g>
      						</svg>
      					</div>
      					<div className="info">
      						<span className="date">{ this.convertMillisecondsToDateTypeString(item.date) }</span>
      						<p className="speed">Speed: <span>{ item.speed } km/min</span></p>
      						<p className="distance">Distance: <span>{ item.distance } km</span></p>
      						<p className="time">Time: <span>{ item.time } min</span></p>
      					</div>
              </Link>
    	  		</div>
	  		)
  		})
  	}

  	render() {
  		const items = this.createItems(this.state.jogs);
    	return (
    		<div className="jogs-list-container">
    			<div className="filter">
    				<div className="from">
    					<span>Date from</span>
    					<DatePicker
					    	selected={this.convertMillisecondsToDate(this.state.startDate)}
					    	onChange={this.filterByStartDate}
					    	calendarClassName="calendar"
						/>
    				</div>
    				<div className="to">
    					<span>Date to</span>
    					<DatePicker
					    	selected={this.convertMillisecondsToDate(this.state.finalDate)}
					    	onChange={this.filterByFinalDate}
					    	calendarClassName="calendar"
						/>
    				</div>
    			</div>
    			<div className="jogs-list" onClick={ this.onElementClick }>
    				{ items }
    			</div>
          <Link to={{ pathname: '/scamper' }} onClick={ this.onAddClick }>
      			<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60" className="add-a-run">
  				    <defs>
  				        <path id="a" d="M.039.128h59.883v59.234H.039z"/>
  				    </defs>
  				    <g fill="none" fillRule="evenodd">
  				        <g>
  				            <mask id="b" fill="#fff">
  				                <use xlinkHref="#a"/>
  				            </mask>
  				            <path fill="#7ED321" d="M29.987.128C13.47.128 0 13.405 0 29.743c0 16.342 13.42 29.62 29.987 29.62 16.515 0 29.935-13.278 29.935-29.62 0-16.338-13.42-29.615-29.935-29.615zm0 55.098c-14.193 0-25.755-11.44-25.755-25.483 0-14.042 11.562-25.48 25.755-25.48 14.194 0 25.754 11.438 25.754 25.48 0 14.043-11.56 25.483-25.754 25.483z" mask="url(#b)"/>
  				        </g>
  				        <path fill="#7ED321" d="M43.768 27.395H32.105V15.804c0-1.175-.93-2.093-2.118-2.093-1.186 0-2.117.918-2.117 2.093v11.541H16.207c-1.187 0-2.117.918-2.117 2.095 0 1.174.93 2.091 2.117 2.091H27.87v11.542c0 1.174.93 2.092 2.117 2.092 1.187 0 2.118-.918 2.118-2.092V31.531h11.663c1.187 0 2.117-.917 2.117-2.091 0-1.177-.93-2.045-2.117-2.045z"/>
  				    </g>
  				  </svg>
          </Link> 
    		</div>
    	);
  	}
}

export default JogsList;
