import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import Input from '../../components/input'
import ServicesToLogIn from '../../components/servicesToLogIn'
import SubmitBtn from '../../components/submitBtn'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import WarningTextBox from '../../components/warningTextBox'
import WarningText from '../../components/warningText'
import authenticate from '../../utils/authenticate'
import styles from './index.module.css'

class RegisterPage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          email: "",
          password: "",
          rePassword: "",
          imageUrl: "",
          passwordsMatch: false,
          takenEmail: false
        }
      }
    
      onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
      }

      register = async(event) => {
        event.preventDefault()

        const{
            email,
            password,
            imageUrl
        } = this.state
        await authenticate('http://localhost:9999/api/user/register', {
                email,
                password,
                imageUrl,
                faceBook: false
            }, (user) => {
                this.context.logIn(user)
                this.props.history.push('/')
            }, (e) => {
                if(e.err === 'Email exists'){
                    this.setState({takenEmail: true})
                }
            }
        )
          
      }
      

      isPasswordsMatch = () => {
          const {password, rePassword, email} = this.state
          console.log('1',password)
          console.log('2',rePassword)
          if(password === rePassword){
              this.setState({passwordsMatch: true})
          }else{
              this.setState({passwordsMatch: false})
          }
      }

      openWidget= () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "dimitur98",
            uploadPreset: "ReactForum"
        }, (err,res) => {
            if(res.event === 'success'){
                this.setState({
                    imageUrl: res.info.url
                })
            }
        })
        widget.open()
      }

    render(){
        const {
            email,
            password,
            rePassword,
            passwordsMatch,
            imageUrl,
            takenEmail
          } = this.state

        return(
            <PageWrapper>
                <div  className = {styles.center}>
                    {takenEmail && <WarningTextBox text='Email is already taken!' />}
                    <h1>Register</h1>
                            <form onSubmit={this.register}>
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
                                    type="password"
                                    isPasswordsMatch = {this.isPasswordsMatch}
                                />
                                <Input
                                    value={rePassword}
                                    onChange={(e) => this.onChange(e, 'rePassword')}
                                    label="Repeat Password"
                                    id="rePassword"
                                    type="password"
                                    isPasswordsMatch = {this.isPasswordsMatch}
                                />
                                {!passwordsMatch && <WarningText text="Passwords don't match!"/>}
                                <br/>
                                <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                                {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}  
                                {imageUrl && passwordsMatch  && (<SubmitBtn id='button'  name='Register'/>) }
                            </form>
                        </div>
                        <ServicesToLogIn />
            </PageWrapper>
        )
    }
}

export default withRouter(RegisterPage)