import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import Input from '../../components/input'
import ServicesToLogIn from '../../components/servicesToLogIn'
import SubmitBtn from '../../components/submitBtn'
import UserContext from '../../Context'
import authenticate from '../../utils/authenticate'
import WarningTextBox from '../../components/warningTextBox'
import styles from './index.module.css'

class LoginPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            invalidPassword: false
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
                this.context.logIn(user)
                this.props.history.push('/')
            }, (e) => {
               if(e.err==="Invalid password"){
                   this.setState({
                       invalidPassword:true
                   })
               }
            }
        )
        
    }


    render() {
    const {email, password, invalidPassword} = this.state

        return(
           <PageWrapper>
                <div className={styles.center}>
                {invalidPassword && (<WarningTextBox text='Invalid password!' />)}
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
                                    <SubmitBtn id='button' name='Log In' />
                                </form>
                            </section>      
                        </div>
                        <ServicesToLogIn />
             </PageWrapper>
        )
    }
}

export default withRouter(LoginPage)