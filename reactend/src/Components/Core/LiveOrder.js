import React, {Component} from 'react';
import './liveOrder.css';


export default class LiveOrder extends Component{
    render(){
        return(
            <div className='row' >
                <div className='col-sm-5 col-xs-5 col-lg-5 col-md-5'  id='liveOrders'>
                    <div className='col-sm-12 col-xs-12 col-md-12 col-lg-12'>
                    	<legend>Live Orders </legend>
                    	<div id='live_orders_main'>
                            <div className= 'row ' >
                                <div className='col-sm-12 order_card'>
                                    
                                        <div className='col-sm-2'>Order Id : 1 </div>
                                    
                                </div>
                            </div>
                    	</div>
                    </div>
                </div>
            </div>

        );

    }
}