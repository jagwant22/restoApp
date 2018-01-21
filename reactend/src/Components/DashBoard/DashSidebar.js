import React from 'react';
import ReactDOM from 'react-dom';
import './DashSidebar.css';
import food from './assets/images/icons/food.svg';
import {Link} from 'react-router-dom';

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {date : new Date()};
    }
    // logOutClick(){
    //     var keys = Object.keys(sessionStorage);
    //     for(var key = 0;key<keys.length;key++){
    //         sessionStorage.setItem(keys[key], null);

    //     }
    //     window.location.replace('/');
    // }

    componentDidMount(){
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    tick(){
        this.setState({
            date : new Date()
        });
    }

    logout(){
        var i = sessionStorage.length;
        while(i--) {
          var key = sessionStorage.key(i);
          
          sessionStorage.removeItem(key);
          
        }
        window.location = "/";
    }
    render(){
        return(
            
            <div className='row' id='sidebar'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <center>
                            
                            
                            <h5>Menu</h5>
                            <hr id='nav_hr' />
                        </center>
                        <ul id='sidenav_ul'>
                        <a href='/main/dashboard' className='sidenav_btn'><li className='sidenav_item'>Home <i className='glyphicon glyphicon-home sidebar_icon'></i></li></a>
                        <a href='/main/orders/' className='sidenav_btn' ><li className='sidenav_item'>Orders<i className='glyphicon glyphicon-cutlery sidebar_icon'></i></li></a>
                        <a className='sidenav_btn' ><li className='sidenav_item'>Menus<i className='glyphicon glyphicon-list-alt sidebar_icon'></i></li></a>
                        <a className='sidenav_btn' ><li className='sidenav_item'>Promotions and Offers<i className='glyphicon glyphicon-tag sidebar_icon'></i></li></a>
                        <a className='sidenav_btn'><li className='sidenav_item'>Settings<i className='glyphicon glyphicon-cog sidebar_icon'></i></li></a>
                        <a className='sidenav_btn' onClick={this.logout}><li className='sidenav_item'>Logout <i className='glyphicon glyphicon-log-out sidebar_icon'></i></li></a>
                        </ul>                
                        
                        
                    </div>        
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-xs-12 col-lg-12 col-md-12'>
                    
                        <hr />
                        <div className='col-sm-12 col-xs-12 col-lg-12 col-md-12'>
                            <div className='col-sm-9'>
                                <p id='current-time'>Current Time  {this.state.date.toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar