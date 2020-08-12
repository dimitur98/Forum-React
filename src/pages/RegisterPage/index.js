import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import Input from '../../components/input'
import ServicesToLogIn from '../../components/servicesToLogIn'
import SubmitBtn from '../../components/submitBtn'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DangerTextBox from '../../components/dangerTextBox'
import DangerText from '../../components/dangerText'
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
          takenEmail: false,
          requiredEmail: false,
          requiredPassword: false,
          requiredImageUrl: false,
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
            imageUrl,
            requiredEmail,
            requiredPassword,
            requiredImageUrl
        } = this.state
        
        email ? this.setState({requiredEmail:false}) : this.setState({requiredEmail: true})
        password ? this.setState({requiredPassword:false}) : this.setState({requiredPassword: true})
        imageUrl ? this.setState({requiredImageUrl:false}) : this.setState({requiredImageUrl: true})
        if(!requiredEmail && !requiredPassword && !requiredImageUrl){
            await authenticate('http://localhost:9999/api/user/register', {
                email,
                password,
                imageUrl,
                faceBook: false
            }, (user) => {
                this.props.history.push({
                    pathname: '/Login',
                    data: true
                })
            }, (e) => {
                if(e.err === 'Email exists'){
                    this.setState({takenEmail: true})
                }
            }
        )
        }       
      }
      

      isPasswordsMatch = () => {
          const {password, rePassword} = this.state
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
            takenEmail,
            requiredEmail,
            requiredPassword,
            requiredImageUrl
          } = this.state

        return(
            <PageWrapper title='Register - DForum'>
                <div  className = {styles.center}>
                    {takenEmail && <DangerTextBox text='Email is already taken!' />}
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
                                {requiredEmail && <DangerText text='Email is required!'/>}
                                <Input
                                    value={password}
                                    onChange={(e) => this.onChange(e, 'password')}
                                    label="Password"
                                    id="password"
                                    type="password"
                                    isPasswordsMatch = {this.isPasswordsMatch}
                                />
                                {requiredPassword && <DangerText text='Password is required!'/>}
                                <Input
                                    value={rePassword}
                                    onChange={(e) => this.onChange(e, 'rePassword')}
                                    label="Repeat Password"
                                    id="rePassword"
                                    type="password"
                                    isPasswordsMatch = {this.isPasswordsMatch}
                                />
                                {!passwordsMatch && <DangerText text="Passwords don't match!"/>}
                                <br/>
                                <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                                {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />} 
                                <br/>
                                {requiredImageUrl && <DangerText text='Image is required!'/>} 
                                <SubmitBtn id='button'  name='Register'/>
                            </form>
                        </div>
                        <ServicesToLogIn />
            </PageWrapper>
        )
    }
}

export default withRouter(RegisterPage)