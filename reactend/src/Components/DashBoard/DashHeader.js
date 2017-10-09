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
class TopNav extends React.Component{
    toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

    toggleSideBar(){
        $("#sidebar").toggle();
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
                        <span className='leftBarIcon'>
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