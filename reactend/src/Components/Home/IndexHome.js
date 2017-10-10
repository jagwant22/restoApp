import React, {Component} from 'react';

import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';

export default class IndexHome extends Component{
	constructor(props){
		super(props);
			}

	componentDidMount(){
		this.checkLoggedIn();

	}

	checkLoggedIn(){
		console.log("Inside login check.");
		var getCookie = sessionStorage.getItem('loggedIn');
		console.log(getCookie);
		if(getCookie == 'true'){
			console.log("User is logged in . Username ==> " + sessionStorage.getItem('username'));
			this.setState({
				message : 'Welcome back ' + sessionStorage.getItem('username') + " . Please wait, we are logging you back in. "
			});
			window.location.href = '/main/dashboard';
		}
	}
	render(){
		return(
				<div id='all_compos'>
					<Header /> 
					<LoginForm />
					<Footer />
				</div>
			);
	}
}