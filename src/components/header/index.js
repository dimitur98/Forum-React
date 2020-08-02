import React, { Component, PureComponent } from 'react'
import {
    Link
} from 'react-router-dom'

import UserContext from '../../Context'


class Header extends PureComponent{
    

    static contextType = UserContext

    logOut = () => {
        this.context.logOut()
    }

    render(){
        const {
            loggedIn,
            user
        } = this.context
        console.log(loggedIn)
        return(
            <header>
            <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div class="container">
                    <a class="navbar-brand" >Forum</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
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
                                        <Link class="nav-link text-dark">Hi {user.email}</Link>
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

export default Header