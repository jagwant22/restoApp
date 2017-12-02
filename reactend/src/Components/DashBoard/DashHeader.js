import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
var navStyleVar = {
    
    "zIndex":"0",
    "minHeight":"8vh",
    "background": "rgb(38, 138, 138)",
    "color":"white",
    paddingTop : "1%",
    paddingLeft:"1%",
    paddingRight:"1%",

}

var infobar= {
    float:'right',
    
}

var menuBar = {
    fontSize: '22px',
    paddingLeft:'1%',
    paddingBottom : '0.75%',
    cursor : 'pointer',
}

var heading_center = {
    textAlign: "center",
    fontSize:"22px",
    fontFamily:"Oxygen",
}
function confirmLogout(){
    var a = alert('Want to LogOut??');
}
var status = 0;
class TopNav extends React.Component{
    toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
    
    toggleSideBar(){
        
        
        if(status == 0 ){
            console.log("Moving main content a little bit...");
            $("#main_content").css("margin-left", "30vh");
            $(".leftBarIcon").css("margin-left","23.5vh");
            $("#sidebar").css('margin-left', '0');
            
            status = 1;
        }else{
            console.log("Status : " + status);
            $("#main_content").css("margin-left", "0");
            $(".leftBarIcon").css("margin-left","1vh");
            $("#sidebar").css('margin-left', '-1000px');
            
            status = 0;
        }
        
    }


    constructor(props){
        super(props);
        this.states = {name : sessionStorage.getItem('name')};
    }



    render(){
        return(
            <div style={navStyleVar} className='row'>
                <div className='col-sm-12'>
                    <div id='resto_info_holder'>
                        <div style={heading_center}>Fingerfood</div>
                        <span className='leftBarIcon' style={{transition:0.3 + "s"}}>
                            <i className='glyphicon glyphicon-menu-hamburger' style={menuBar} onClick={this.toggleSideBar}></i>
                        </span>
                        
                        <span id='info_before' style = {infobar}>Welcome! <span id='info'>{this.toTitleCase(this.states.name)} </span></span>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default TopNav;