import React, {Component} from 'react';

var login_style = {
	"marginTop":"2%",
	"color":"wheat",
	"fontFamily":"Comfortaa",
}

var innerheading_style = {
	background: "rgb(38, 138, 138)",
	position : "fixed",
	top : 0,
	width:"100%",
	textAlign :"center",
	color:"white",
	

}

var header_text_style = {
	"fontFamily":"Comfortaa",
	"animation": "0.4s ease-out 0s 1 slideInFromLeft",
	"fontSize":"50px",
}
class Header extends Component{
	render(){
		return (
				<div className='row'>
					<div id='inner-heading' style = {innerheading_style}>
					<h1 className='header_text' style={header_text_style}>FingerFood</h1>
					
					<h5 className= "subheading" style ={login_style}> Making Life Easier, One Bite at a Time </h5>
				</div>
				</div>
				
			);
	}
}

export default Header;
