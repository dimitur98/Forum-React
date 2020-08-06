import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Input from '../components/input'
import ServicesToLogIn from '../components/servicesToLogIn'
import LoginOptions from '../components/loginOptions'
import SubmitBtn from '../components/submitBtn'
import UserContext from '../Context'
import authenticate from '../utils/authenticate'

class LoginPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    static contextType = UserContext


    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
      }

      handleSubmit = async(event) => {
        event.preventDefault()

        const{
            email,
            password
        } = this.state
        await authenticate('http://localhost:9999/api/user/login', {
                email,
                password
            }, (user) => {
                console.log(user)
                this.context.logIn(user)
                this.props.history.push('/')
            }, (e) => {
               console.log(e)
            }
        )
    }


    render() {
    const {email, password} = this.state

        return(
            <div>
                <Header />
                <div class='center'>
                <div>asd</div>
                    <h1>Login</h1>
                            <section>
                                <form onSubmit={this.handleSubmit}>
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
                                        type="password"
                                    />
                                    <SubmitBtn name='Log In' />
                                    <LoginOptions />
                                </form>
                            </section>      
                        </div>
                        <ServicesToLogIn />
                <Footer />
            </div>
        )
    }
}

export default LoginPage