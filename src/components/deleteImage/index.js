import React, {Component} from 'react'
import SubmitBtn from '../submitBtn'
import styles from './index.module.css'
import UserContext from '../../Context'


class DeleteImage extends Component{
    constructor(props){
        super(props)
    }


    static contextType = UserContext

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
                    this.props.checkAvatar()
                })
        })
    }

    render(){
        const {imageUrl} = this.props

        return(
            <form onSubmit={this.handleSubmit}> 
                <img className={styles.img} src={imageUrl} alt="asd"/>
                <SubmitBtn name='Delete'/>
            </form>
        )
    }
}

export default DeleteImage