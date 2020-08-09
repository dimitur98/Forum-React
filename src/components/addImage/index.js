import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import SubmitBtn from '../submitBtn'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'


class AddImage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          imageUrl: "",
          done:false
        }
      }
      static contextType = UserContext

      handleSubmit = async (event) =>{
        event.preventDefault()
        const {user} = this.context
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'ReactForum');
        const options = {
          method: 'POST',
          body: formData,
        };
        
        // replace cloudname with your Cloudinary cloud_name
         const promise = await fetch('https://api.Cloudinary.com/v1_1/dimitur98/image/upload', options)
         const res = await promise.json()
          fetch(`http://localhost:9999/api/user/imgChange/${user.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                    url:  res.url
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-token')
                }
                }).then(c => {
                    this.context.user.imageUrl = res.url
                    this.setState({
                        imageUrl: res.url,
                        done: true
                    })
                    this.props.checkAvatar(res.url)
                })
        
          
          
    }
    loadImg = (e) =>{
        this.setState({imageUrl:  URL.createObjectURL(e.target.files[0])})
    }

    componentDidMount(){
        const {user} = this.context
        if(user){
            this.setState({imageUrl: user.imageUrl})
        }else{
            this.setState({imageUrl: process.env.REACT_APP_DEFAULTAVATAR})
        }
    }

    render(){
        const {imageUrl, done} = this.state
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <img className={styles.img} src={imageUrl} alt='img'/>
                    <br/>
                    <br/>
                    <br/>
                    <input  type='file' onChange={(e) => this.loadImg(e)} name="file1" id="input1" />
                    <SubmitBtn name = "Upload"/>
                    {done && <span class='text-success'>Done</span>}
                </form>
           </>
        )
    }
}

export default withRouter(AddImage)