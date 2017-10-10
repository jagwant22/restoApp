import React from 'react';
import ReactDOM from 'react-dom';
import './DashSidebar.css';


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
    render(){
        return(
            
            <div className='row' id='sidebar'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <center>
                            
                            
                            <h5>Menu</h5>
                            <hr id='nav_hr' />
                        </center>
                        <ul>
                        <li><a className='sidenav_btn' >Home</a></li>
                        <li><a className='sidenav_btn' >Orders</a></li>
                        <li><a className='sidenav_btn' >Menus</a></li>
                        <li><a className='sidenav_btn' >Promotions and Offers</a></li>
                        <li><a className='sidenav_btn' >Settings</a></li>
                        <li><a className='sidenav_btn' >Logout</a></li>
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