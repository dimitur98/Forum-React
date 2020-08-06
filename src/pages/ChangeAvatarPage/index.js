import React, { Component } from 'react'
import PageWrapper from '../../components/pageWrapper'
import UserContext from '../../Context'


class ChangeAvatarPage extends Component{
    constructor(props){
        super(props)
        
        this.state ={
            imageUrl:''
        }
    }

    static contextType = UserContext

    handleSubmit = () =>{
        const {user} = this.context
         fetch(`http://localhost:9999/api/cloudinary/deleteAvatar/${user.id}`, {
            method: 'POST',
            body: JSON.stringify({
              url:user.imageUrl
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((c) => {
            this.props.history.push('/')
        })
    }
    render(){
        return(
            <PageWrapper>
                <div class="container">
                </div>
            </PageWrapper>
        )
    }
}

export default ChangeAvatarPage