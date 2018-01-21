import React, {Component} from 'react';
import DashHeader from '../DashBoard/DashHeader';
import DashSidebar from '../DashBoard/DashSidebar';
import CurrentLocation from '../DashBoard/CurrentLocation';
import './orders.css';
import Loader from '../Core/Loader';
import $ from 'jquery';
export default class Orders extends Component{
	constructor(props){
		super(props);
		let for_user = sessionStorage.getItem('username');

	}

	getUserOrder(){
		
		fetch("/main/order?id="+sessionStorage.getItem('id'), {
			method:"get"
		}).then(function(response){
			return response.json();
		}).then(function(data){
			console.log(data);
			$("#loading").css('display', 'none');
		});
	}

	render(){
		this.getUserOrder();
		return(
				<div>
				<DashHeader />
				<DashSidebar />
				<CurrentLocation />
					<div className='container'>
						<div className='row'>
							<Loader />
							<div className='col-sm-12 col-xs-12' id='orderFilterItemRow'>

							</div>
						</div>
					</div>
				</div>

			);
	}
}