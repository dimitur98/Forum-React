import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../Context'


class Header extends Component{
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
            <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand" ><img className={styles.logo} src={require('../../images/logoDForum.jpg')} /></a>
            
                    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className="nav-link text-dark" >Home</Link>
                            </li>
                            {!loggedIn ? 
                                (<>
                                    <li className="nav-item">
                                        <Link to='/Login' class="nav-link text-dark" >Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/Register' class="nav-link text-dark" >Register</Link>
                                    </li>
                                </>):
                                (<>
                                    <li className="nav-item">
                                        <Link to='/Account' className="nav-link text-dark">Hi {user.email}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={this.logOut} className="nav-link text-dark">Logout</Link>
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