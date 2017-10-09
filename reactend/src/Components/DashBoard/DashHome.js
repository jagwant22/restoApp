import React, {Component} from 'react';
import DashHeader from './DashHeader';
import DashSidebar from './DashSidebar';
import CurrentLocation from './CurrentLocation';
import './dash.css';
import $ from 'jquery';


export default class DashHome extends Component{
	
	componentWillMount(){
		this.checkLogIn();
	}
	constructor(props){
		super(props);
		
		console.log("Loaded this");
		
	}
	checkLogIn(){
		var userName = sessionStorage.getItem('username');
		var loggedIn = sessionStorage.getItem('loggedIn');
		console.log("LOGGED IN? : ", loggedIn);
		console.log("USERNAME : ", userName);
		if(loggedIn === 'true'){
			console.log("true");
			if($.trim(userName) != ""){
				console.log("verified username");
			}
		}else{
			window.location.href='/';
			
		}

	}

	render(){
		return(
				<div id='container'>
				<DashHeader />
				<DashSidebar />
				<CurrentLocation />
				</div>
			

			);
	}
}