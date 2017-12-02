import React, {Component} from 'react';

var styleVar = {
	fontFamily:"Satisfy",
}
export default class CurrentLocation extends Component{
    render(){
        return(
            <div className='row' id='currentLocationBar'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <h3 style={styleVar} > Dashboard</h3>
                </div>
            </div>

        );
    }
}