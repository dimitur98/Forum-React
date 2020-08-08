import React, { Component } from 'react'
import PageWrapper from '../components/pageWrapper'
import Input from '../components/input'
import ServicesToLogIn from '../components/servicesToLogIn'
import SubmitBtn from '../components/submitBtn'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class RegisterPage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          email: "",
          password: "",
          rePassword: "",
          imageUrl: "",
          passwordsMatch: false
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
          await fetch('http://localhost:9999/api/user/register', {
              method: 'POST',
              body: JSON.stringify({
                email,
                password,
                imageUrl
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then((user) => {
              this.props.history.push('/Login')
          })
      }
      

      isPasswordsMatch = () => {
          const {password, rePassword, email} = this.state
          if(password === rePassword && email){
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
            imageUrl
          } = this.state

        return(
            <PageWrapper>
                <div  class="center">
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
                                <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                                {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}  
                                {imageUrl && passwordsMatch  && (<SubmitBtn  name='Register'/>) }
                            </form>
                        </div>
                        <ServicesToLogIn />
            </PageWrapper>
        )
    }
}

export default RegisterPage