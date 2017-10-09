import React, {Component} from 'react';
import $ from 'jquery';
// Styling Components
var submit_style = {
		"width":"100%",
		"marginTop":"10%",
		"borderRadius":"50px",
		"outline":"none",

	}


var form_holder_style = {
	"width":"100%",
	"marginTop" :"35%",
	// "border":"1px solid rgb(38, 138, 138)",
	"paddingTop":"4%",
	"paddingRight":"4%",
	"paddingLeft":"4%",
	"paddingBottom":"24%",
	"borderRadius" : "10px",
	"background":"white",
	"fontFamily":"Oxygen"
}

var username_style = {
	"textAlign":"center",
	"marginBottom":"2%",
	"padding": "1%"
}

var pass_style = {
	"textAlign":"center",
	"marginBottom":"2%",
}

var message_holder_style = {
	"padding":"2%",
	"border":"0",
	"borderBottom":"1px solid #ddd",
	"height":"50px",
	"marginBottom":"4%",
	"color": "rgb(38, 138, 138)",
	"textAlign":"center",
}

var register_style = {
	"width":"100%",
	"marginTop":"10%",
	"borderRadius":"50px"

}
// Styling ends here....


export default class LoginForm extends Component{
	constructor(props){
		super(props);
		this.loginClicked = this.loginClicked.bind(this);
		this.messageDisplay = this.messageDisplay.bind(this);
		this.state = {
			verified:false,
			message:"Please Enter Your Username & Password To Continue",
			username: "",
			password:"",
			name : "",
		}

	}

	
	loginClicked(){
		console.log("login called");
		this.fieldChecker();
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		console.log(username + " - " + password);
	}

	loginApiCall(username, password){
		console.log("Creds rec. Login->");
		var data_to_send = {"username":username, "password":password, "otp_status":"true"};
		$("#message_holder").text("Trying to Login ... Please Wait");
		$.ajax({
			url:"/main/login",
			type:"POST",
			data : JSON.stringify(data_to_send),
			timeout:10000,
			success: function(response){
				console.log(response);
				if(response.result === 'SUCCESS' && response.status===200){
					$("#message_holder").html("<span class='success'>Logging you in. Welcome.</span>")
					sessionStorage.setItem('username', data_to_send['username']);
					sessionStorage.setItem('name', response.data.resto_name);
					sessionStorage.setItem('loggedIn', true);
					
					window.location.href='/main/dashboard';
				}
				else{
					$("#message_holder").html("<span class='red'>Incorrect Password </span>")
				}
			},
			failure: function(error){
				console.log("Error");
				console.log(error);
				this.messageDisplay(error, "Invalid Credentials");
			}

		});
	}


	fieldChecker(){
		console.log("check fields..");
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		if($.trim(username) !== '' || $.trim(username) !== null){
			if($.trim(password) !== '' || $.trim(password) !== null){
				this.setState({verified:true});
				this.loginApiCall(username, password);
			}
		}
	}
	messageDisplay(e, message){
		e.preventDefault();

		this.setState({'message' : message});
	}


	render(){
		return (
			<div className='row'>
				<div className= 'col-sm-12'>
					<div className='col-sm-4'></div>
					

					<div className='col-sm-4'>
						<div id='form_holder' className='col-sm-4' style={form_holder_style}>
				
							<div id='message_holder' style ={message_holder_style}>
								{this.state.message}
							</div>
				
							<input id='username' style={username_style} className='form-control' placeholder="Enter username" onChange= {(e) => this.messageDisplay(e, "Password is case sensitive.")} />
							<input type='password' id='password' className='form-control' placeholder= "Password" style= {pass_style} />
							<button type='submit' className='btn btn-success btn-sm' style={submit_style} onClick={this.loginClicked}>Submit</button>
							
			
						</div>

					</div>
				</div>
				<div className='col-sm-4'></div>
			</div>
			
		);
	}
}