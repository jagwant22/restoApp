import React, {Component} from 'react';

export default class TableRequestRow extends Component{
	constructor(props){
		super(props);
		console.log("Props Received");
		console.log(this.props.request_type)
	}

	render(){
		return(
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12 col-xs-12 singleRequestRow' data-req-id={this.props.id}>
						<div className ='col-sm-3 col-xs-3 col-md-3 col-lg-3 table_number'>
							<span className='tableInformation'>{this.props.table_number}</span>
						</div>
						<div className ='col-sm-3 col-xs-3 col-md-3 col-lg-3 request_type'>
							<span className='tableInformation'>{this.props.request_type}</span>
						</div>
						<div className ='col-sm-3 col-xs-3 col-md-3 col-lg-3 request_time'>
							<span className='tableInformation'>{this.props.request_time}</span>
						</div>
						<div className ='col-sm-3 col-xs-3 col-md-3 col-lg-3 request_status'>
							<select className='form-control input-sm tableInformation' value={this.props.request_status}>
								<option>Received</option>
								<option>Acknowledged</option>
								<option>Resolved</option>
								<option>Cancelled</option>
							</select>
						</div>

					</div>
				</div>
			);
	};
}