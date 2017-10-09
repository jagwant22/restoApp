import React, {Component} from 'react';

import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';

export default class IndexHome extends Component{
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