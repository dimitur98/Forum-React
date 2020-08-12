import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import Input from '../../components/input'
import ServicesToLogIn from '../../components/servicesToLogIn'
import SubmitBtn from '../../components/submitBtn'
import UserContext from '../../Context'
import authenticate from '../../utils/authenticate'
import DangerTextBox from '../../components/dangerTextBox'
import WarninTextBox from '../../components/warningTextBox'
import DangerText from '../../components/dangerText'
import styles from './index.module.css'

class LoginPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            invalidPassword: false,
            required: false
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
                password,
                faceBook: false
            }, (user) => {
                this.context.logIn(user)
                this.props.history.push('/')
            }, (e) => {
                console.log(e)
               if(e.err==="Invalid password"){
                   this.setState({
                       invalidPassword:true
                   })
               }
               if(e.status === 400){
                    this.setState({required: true})
               }
            }
        )
        
    }
    

    render() {
    const {email, password, invalidPassword, required} = this.state
    const { data } = this.props.location
        return(
           <PageWrapper title='Log in - DForum'>
                <div className={styles.center}>
                {invalidPassword && (<DangerTextBox text='Invalid password!' />)}
                {data && (<WarninTextBox text='Please confirm your email!'/>)}
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
                                    {required && <DangerText text = "Email is required!" />}
                                    <Input
                                        value={password}
                                        onChange={(e) => this.onChange(e, 'password')}
                                        label="Password"
                                        id="password"
                                        type="password"
                                    />
                                    {required && <DangerText text = "Password is required!" />}
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