import React , {Component} from 'react';
import './LiveTables.css';
import $ from 'jquery';

export default class LiveTables extends Component{
	constructor(props){
        super(props)
    }

	render(){
        return(
            <div className='row item_row'>
                <div className = 'col-sm-12'>
                    <div className = 'col-sm-3'>
                        <span className='table_id'>{this.props.table_id}</span><br />

                    </div>
                    <div className = 'col-sm-3'>
                        <span className='table_detail'><a href='#' data-id={this.props.table_id}>View</a></span>

                    </div>
                    <div className = 'col-sm-3'>
                        <span className='start_time'>{this.props.start_time}</span>

                    </div>
                    <div className = 'col-sm-3'>
                        <span className='end_table_session'><a href='#' data-id={this.props.table_id}>End</a></span>

                    </div>
                    
                </div>
                
            </div>
        );
    }
}