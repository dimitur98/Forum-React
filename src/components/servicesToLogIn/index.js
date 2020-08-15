import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'
import styles from './index.module.css'


class ServicesToLogIn extends Component {

    static contextType = UserContext

     responseFacebook = async (response) => { 
         console.log(response)      
          fetch('http://localhost:9999/api/user/register', {
              method: 'POST',
              body: JSON.stringify({
                email: response.email,
                password: response.userID,
                imageUrl: response.picture.data.url,
                faceBook: true
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then((res) => {
                authenticate('http://localhost:9999/api/user/login', {
                    email: response.email,
                    password: response.userID,
                    faceBook: true
                }, (user) => {
                    this.context.logIn(user)
                    this.props.history.push('/')
                }, (e) => {
                    console.log(e)
                }
            )
          })
      }
       failFaceBook = (e) =>{
          console.log(e)
      }
    render(){
        return(
            <div className={styles.center}>
                <section>
                    <h4>Use another service to log in.</h4>
                    <hr />    
                    <FacebookLogin
                        appId= {process.env.REACT_APP_APPID_FACEBOOK}
                        fields="email,picture"
                        callback={this.responseFacebook}
                        onFailure = {this.failFaceBook} />      
                </section>
                
            </div>
        )
    }
}

export default withRouter(ServicesToLogIn)