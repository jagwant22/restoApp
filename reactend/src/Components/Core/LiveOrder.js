import React, {Component} from 'react';
import './liveOrder.css';
import $ from 'jquery';
import OrderRow from './OrderRow.js';
import OrderDetail from './OrderDetail.js';
import LiveTables from './LiveTables.js';
import swal from 'sweetalert';

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
        this.updateOrders();
        this.updateTables();
        this.state = {
            pending_orders:[],
            table_info :[]
        }
    }
    
    componentDidMount(){
        this.pOrders = setInterval(
            () => this.updateOrders(),
            4000
            );
        this.tInfo = setInterval(
            () => this.updateTables(),
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

    updateTables(){
        
        $.ajax({
            url:"/main/table?login_id="+this.props.id,
            success:(response) => {
                this.renderTables(response.data);
            },
            error: (err) => {
                swal("Error!", "Tables could not be updated!", "error");
            }
        });
    }

    renderTables(table_data){
        this.setState({table_info: table_data});
    }

    

    


    render(){
        var orders = this.state.pending_orders;
        var tables = this.state.table_info;
        

        if(orders.length > 0){
            var orders_mapped = orders.map((order) => {
                return <OrderRow key={order.order_id}  order_id={order.order_id} table_number= {order.table_number} customer_name ={order.customer_information[0].name} customer_phone = {order.customer_information[0].phone} status={order.order_status}/>
            });
        }
        if(tables.length > 0){
            var tables_mapped = tables.map((table) => {
                return <LiveTables table_id={table.table_id} start_time={table.start_time} />
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
                                     <OrderDetail />                       

                                </div>
                            </div>
                    	</div>
                    </div>
                </div>
                <div className='col-sm-4 col-xs-4 col-lg-4 col-md-4'  id='liveTables'>
                    <div className='col-sm-12 col-xs-12 col-md-12 col-lg-12'>
                        <legend>Tables </legend>
                        <div id='live_tables_main'>
                            <div className= 'row ' >
                                <div className='col-sm-12'>
                                <h5 style = {h5style}>Tables Occupied</h5>
                                    <div className='col-sm-12' id='table_heading'>
                                        <div className='col-sm-3'>Table No.</div>
                                        <div className='col-sm-3'>Details</div>
                                        <div className='col-sm-3'>Start Time</div>
                                        <div className='col-sm-3'>End Visit</div>
                                    </div>
                                    {tables_mapped}      

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        );

    }
}