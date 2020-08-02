import React, { Component } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Input from '../components/input'
import ServicesToLogIn from '../components/servicesToLogIn'
import SubmitBtn from '../components/submitBtn'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RegisterPage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          email: "",
          password: "",
          rePassword: "",
          imageUrl: ""
        }
      }
    
      onChange = (event, type) => {
          console.log(this.state)
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
      }

      handleSubmit = async(event) => {
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
            imageUrl
          } = this.state

        return(
            <div>
                <Header />
                <div  class="center">
                    <h1>Register</h1>
                            <form onSubmit={this.handleSubmit}>
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
                                />
                                <Input
                                    value={rePassword}
                                    onChange={(e) => this.onChange(e, 'rePassword')}
                                    label="Repeat Password"
                                    id="rePassword"
                                    type="password"

                                />
                                <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                                {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}
                                <hr/>
                                <SubmitBtn  name='Register'/>
                            </form>
                        </div>
                        <ServicesToLogIn />
                <Footer />
            </div>
        )
    }
}

export default RegisterPage