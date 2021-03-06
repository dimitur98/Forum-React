import React, { Component } from 'react'
import PageWrapper from '../../components/pageWrapper'
import Aside from '../../components/aside'
import DeleteImage from '../../components/deleteImage'
import UploadImg from '../../components/uploadImg'
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
            this.setState({
                imageUrl: this.context.user.imageUrl
            })
        }
       
    }

    

    componentDidMount(){
        this.checkAvatar()
        
    }

    render(){
        const {imageUrl, defaultAvatar} = this.state
        return(
            <PageWrapper title='Change your avatar - DForum'>
                <div className="container">
                    <Aside />
                    <div className = 'center'>
                        {defaultAvatar ? 
                            <UploadImg checkAvatar = {this.checkAvatar}/> :
                            <DeleteImage imageUrl = {imageUrl} checkAvatar = {this.checkAvatar}/>
                        }
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default ChangeAvatarPage