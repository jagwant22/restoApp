import React , {Component} from 'react';

class ApiCaller extends Component{
	handleClick(e){
		console.log("Clicked go");
		
		fetch('/main/index')  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' +  
		          response.status);  
		        return;  
		      }

		      // Examine the text in the response  
		      response.json().then(function(data) {  
		        console.log(data);
		        
		        
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		  });

	}
	render(){
		return(
			<div id='inner-container'>
				<legend>Click Me</legend>
					<button className='btn btn-primary' onClick = {this.handleClick}>Go </button></div>
			
		);
	}
}

export default ApiCaller;