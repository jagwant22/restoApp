import React, {Component} from 'react';
import './liveOrder.css';
import $ from 'jquery';
import OrderRow from './OrderRow.js';

const h5style = {
        fontWeight : "600",
        fontFamily : "Oxygen",
        fontSize : "13px",
        color: "#bbb",
        borderBottom : "1px solid #eee"
    }
export default class LiveOrder extends Component{


    constructor(props){
        super(props);
        console.log(this.props.id);
        this.state = {
            pending_orders:[]
        }
    }
    componentDidMount(){
        this.pOrders = setInterval(
            () => this.updateOrders(),
            4000
            );
    }
    renderOrders(orders){
        
        this.setState({
            pending_orders: orders
        });
    }

    updateOrders(){
        $.ajax({
            url:"/main/order?id="+this.props.id,
            success:(response) => {
                
                this.renderOrders(response.order_info);
            },
            error: (err) => {

            }
        });
    }

    


    render(){
        var orders = this.state.pending_orders;
        if(orders.length > 0){
            var orders_mapped = orders.map((order) => {
                return <OrderRow key={order.order_id}  order_id={order.order_id} customer_name ={order.customer_information[0].name} customer_phone = {order.customer_information[0].phone} status={order.order_status}/>
            });
        }
        
        
        return(
            <div className='row' >
                <div className='col-sm-6 col-xs-6 col-lg-6 col-md-6'  id='liveOrders'>
                    <div className='col-sm-12 col-xs-12 col-md-12 col-lg-12'>
                    	<legend>Live Orders </legend>
                    	<div id='live_orders_main'>
                            <div className= 'row ' >
                                <div className='col-sm-12'>
                                <h5 style = {h5style}>Current/ Pending Orders</h5>
                                    {orders_mapped}
                                                            

                                </div>
                            </div>
                    	</div>
                    </div>
                </div>
            </div>

        );

    }
}