import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'


const ServicesToLogIn = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const responseFacebook = async (response) => {       
        console.log(response.email)
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
                }, (user) => {
                    context.logIn(user)
                    history.push('/')
                }, (e) => {
                    console.log(e)
                }
            )
             
          })
      }
      

    return(
        <div class=" center">
            <section>
                <h4>Use another service to log in.</h4>
                <hr />    
                <FacebookLogin
                    appId= {process.env.REACT_APP_APPID_FACEBOOK}
                    fields="email,picture"
                    callback={responseFacebook} />,        
            </section>
            
        </div>
    )
}

export default ServicesToLogIn