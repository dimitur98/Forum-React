import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Input from '../components/input'
import ServicesToLogIn from '../components/servicesToLogIn'
import LoginOptions from '../components/loginOptions'
import SubmitBtn from '../components/submitBtn'

class LoginPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
      }


    render() {
    const {email, password} = this.state

        return(
            <div>
                <Header />
                <div class='container'>
                    <h1>Login</h1>
                    <div class="row">
                        <div class="col-md-4">
                            <section>
                                <form id="account" method="post">
                                    <h4>Use a local account to log in.</h4>
                                    <hr />
                                    <div asp-validation-summary="All" class="text-danger"></div>
                                    <Input
                                        value={email}
                                        onChange={(e) => this.onChange(e, 'email')}
                                        label="Email"
                                        id="email"
                                    />
                                    <Input
                                        value={password}
                                        onChange={(e) => this.onChange(e, 'password')}
                                        label="Password"
                                        id="password"
                                    />
                                    <SubmitBtn name='Log In' />
                                    <LoginOptions />
                                </form>
                            </section>      
                        </div>
                        <ServicesToLogIn />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default LoginPage