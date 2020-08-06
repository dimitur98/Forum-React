import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'

import UserContext from '../../Context'


class Header extends Component{
    
    constructor(props){
        super(props)
    }
    static contextType = UserContext

    logOut = () => {
        this.context.logOut()
        this.props.history.push('/')
    }

    render(){
        const {
            loggedIn,
            user
        } = this.context
        return(
            <header>
            <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div class="container">
                    <a class="navbar-brand" >Forum</a>
            
                    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to='/' class="nav-link text-dark" >Home</Link>
                            </li>
                            {!loggedIn ? 
                                (<>
                                    <li class="nav-item">
                                        <Link to='/Login' class="nav-link text-dark" >Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/Register' class="nav-link text-dark" >Register</Link>
                                    </li>
                                </>):
                                (<>
                                    <li class="nav-item">
                                        <Link to='/Account' class="nav-link text-dark">Hi {user.email}</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link onClick={this.logOut} class="nav-link text-dark">Logout</Link>
                                    </li>
                                </>)}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        )
    }
}

export default withRouter(Header)