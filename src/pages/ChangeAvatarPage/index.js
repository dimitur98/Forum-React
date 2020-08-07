import React, { Component, useEffect } from 'react'
import PageWrapper from '../../components/pageWrapper'
import Aside from '../../components/aside'
import SubmitBtn from '../../components/submitBtn'
import styles from './index.module.css'
import AddImage from '../../components/addImage'
import UserContext from '../../Context'


class ChangeAvatarPage extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            defaultAvatar: false,
            imageUrl: ""
        }
    }

    static contextType = UserContext
    
    checkAvatar =(newUrl) =>{
        const {user} = this.context
        console.log(user)
        if(user.imageUrl === process.env.REACT_APP_DEFAULTAVATAR){
            this.setState({defaultAvatar: true})
        }else{
            this.setState({defaultAvatar: false})
        }
        if(newUrl){
            this.context.user.imageUrl = newUrl
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        const {user} = this.context
         fetch(`http://localhost:9999/api/cloudinary/deleteAvatar/${user.id}`, {
            method: 'POST',
            body: JSON.stringify({
              url: user.imageUrl
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (c) => {
            this.setState({imageUrl: process.env.REACT_APP_DEFAULTAVATAR})
            this.context.user.imageUrl = process.env.REACT_APP_DEFAULTAVATAR
            await fetch(`http://localhost:9999/api/user/imgChange/${user.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                    url:  process.env.REACT_APP_DEFAULTAVATAR
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                }).then(r =>{
                    this.checkAvatar()
                })
        })
    }

    componentDidMount(){
        this.checkAvatar()
        this.setState({
            imageUrl: this.context.user.imageUrl
        })
    }

    render(){
        const {imageUrl, defaultAvatar} = this.state
        console.log(defaultAvatar)
        console.log(imageUrl)
        return(
            <PageWrapper>
                <div class="container">
                    <Aside />
                    <div class = 'center'>
                        {defaultAvatar ? (<AddImage checkAvatar = {this.checkAvatar}/>) :
                        (<form onSubmit={this.handleSubmit}> 
                        <img className={styles.img} src={imageUrl} alt="asd"/>
                        <SubmitBtn name='Delete'/>
                        </form>)}
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default ChangeAvatarPage