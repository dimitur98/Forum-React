import React, { Component } from 'react'
import PageWrapper from '../../components/pageWrapper'
import Aside from '../../components/aside'
import DeleteImage from '../../components/deleteImage'
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
        if(newUrl){
            this.setState({imageUrl: newUrl})
        }
        if(user.imageUrl === process.env.REACT_APP_DEFAULTAVATAR){
            this.setState({defaultAvatar: true})
        }else{
            this.setState({defaultAvatar: false})
        }
       
    }

    

    componentDidMount(){
        this.checkAvatar()
        this.setState({
            imageUrl: this.context.user.imageUrl
        })
    }

    render(){
        const {imageUrl, defaultAvatar} = this.state
        return(
            <PageWrapper>
                <div class="container">
                    <Aside />
                    <div class = 'center'>
                        {defaultAvatar ? 
                            <AddImage checkAvatar = {this.checkAvatar}/> :
                            <DeleteImage imageUrl = {imageUrl} checkAvatar = {this.checkAvatar}/>
                        }
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default ChangeAvatarPage