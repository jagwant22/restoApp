import React, {Component} from 'react';
import swal from 'sweetalert';
import $ from 'jquery';
import './TableRequest.css';
import TableRequestRow from './TableRequestRow.js';


export default class TableRequest extends Component{
	constructor(props){
		super(props);
		console.log(this.props.id);
		this.updateRequests();
		
		this.state = {
			dayRequests:[]
		}
	}

	updateRequests(){
		fetch("/main/request?restaurant_id="+this.props.id, {
			method:"get"
		}).then(function(response){
			return response.json();

		}).then((data) => {
			console.log(data);
			if(data.status == 200){
				this.setState({dayRequests : data.data});	
			}
			else{
				swal({
					title:"Error",
					text: "Sorry, Unable to load requests at the moment.",
					icon:"error"
				});
			}
			
		});
	}
	componentDidMount(){
		console.log("Component Should Have Mounted By Now!");
		this.pOrders = setInterval(
            () => this.updateRequests(),
            4000
            );

	}
	render(){
		let customer_requests = this.state.dayRequests;
		 if(customer_requests.length > 0 && (customer_requests.requestStatus) != "Completed"){
            var mapped_requests = customer_requests.map((request) => {
            	var time = request.request_time;
            	var time_list = time.split(" ");
            	time = time_list[1]
            	time = time.split(":")
            	time = time[0]+":"+time[1];
                return <TableRequestRow id={request.request_id} table_number={request.table.table_id} request_type={request.request_type} request_time={time} request_status={this.requestStatus} />
            });
        }
		return(
				<div className='row'>
						<div className='col-sm-6 col-md-6 col-xs-12 col-lg-6' id='tableRequest'>
							<legend>Received Requests</legend>
							<div className='col-sm-12 ' id='request_header'>
								<div className='col-sm-3'>Table Number</div>
								<div className='col-sm-3'>Request Type</div>
								<div className='col-sm-3'>Request Time</div>
								<div className='col-sm-3'>Request Status</div>

							</div>
							{mapped_requests}
						</div>
				</div>
			
			);
	};
}