// JS File -> Each row in live order holder -> Home
import React, {Component} from 'react';
import './OrderRow.css';
const styling = {
	border:"1px solid #ddd",
	borderRadius:"5px",
	margin:"1%",
	boxShadow : "-3px 4px 9px 0px #ddd",
	padding:"1%"

}

export default class OrderRow extends Component{
	render(){
		return(
			<div className='row item_row' style = {styling}>
				<div className = 'col-sm-12'>
					<div className = 'col-sm-1'>
						<span className = 'order_inner_heading'>
							 Id 
						</span><br />
						<span className='orderId item_detail'>{this.props.order_id}</span><br />

					</div>
					<div className ='col-sm-2'>
						<span className ='order_inner_heading'>Tab. No. </span><br />
						<span className='tNo item_detail'>{this.props.table_number}</span>
					</div>
					<div className ='col-sm-3'>
						<span className ='order_inner_heading'>Customer Name</span><br />
						<span className='custo_name item_detail'>{this.props.customer_name}</span>
					</div>
					<div className ='col-sm-3'>
						<span className ='order_inner_heading'>Customer Phone </span><br />
						<span className='custo_phone item_detail'>{this.props.customer_phone}</span>
					</div>
					<div className ='col-sm-2'>
						<span className ='order_inner_heading'>Status </span><br />
						<span className='order_status item_detail'>{this.props.status}</span>
					</div>
					<div className ='col-sm-1'>
						<span className ='order_inner_heading'>Details </span><br />
						<span className='order_status item_detail'><a href="#" data-attr={this.props.order_id}>View</a></span>
					</div>
					
				</div>
				
			</div>
		);
	}
}