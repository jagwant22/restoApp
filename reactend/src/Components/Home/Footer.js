import React, {Component} from 'react';

var footerStyle = {
	color:"white",
	background : "teal",
	position :"fixed",
	minWidth : "100%",
	textAlign : "center",
	bottom:"0",
	zIndex : "1000",
}

export default class Footer extends Component{
	render(){
		return(
				<div className='row'>
					<div className='col-sm-12'>
						<div id='footer_main' style={footerStyle}>
							<p>Copyright 2017 © Jagwant Sehgal</p>
						</div>		
					</div>

				</div>
				

			);
	}
}