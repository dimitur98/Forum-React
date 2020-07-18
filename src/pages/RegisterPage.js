import React, { Component } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Input from '../components/input'
import ServicesToLogIn from '../components/servicesToLogIn'
import SubmitBtn from '../components/submitBtn'

class RegisterPage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          email: "",
          password: "",
          rePassword: ""
        }
      }
    
      onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
      }


    render(){
        const {
            email,
            password,
            rePassword
          } = this.state

        return(
            <div>
                <Header />
                <div  class='container'>
                    <h1>Register</h1>

                    <div class="row">
                        <div class="col-md-4">
                            <form >
                                <h4>Create a new account.</h4>
                                <hr />
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
                                <Input
                                    value={rePassword}
                                    onChange={(e) => this.onChange(e, 'rePassword')}
                                    label="Repeat Password"
                                    id="rePassword"
                                />
                                <SubmitBtn name='Register'/>
                            </form>
                        </div>
                        <ServicesToLogIn />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default RegisterPage