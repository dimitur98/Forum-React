import React, { Component } from 'react'
import TinyMCEInput from '../tinyMCEInput'
import UserContext from '../../Context'
import { withRouter } from 'react-router-dom';
import getCookie from '../../utils/cookie'
import DangerText from '../../components/dangerText'

class TinyMCEInputForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            content: "",
            update: false,
            requiredContent: false
        }
    }

    static contextType = UserContext


     
    handleSubmit = async(event) => {
        event.preventDefault()
        const{
            content,
        } = this.state
        const {postId, parentId} = this.props
        const {user} = this.context
        content ? this.setState({requiredContent:false}) : this.setState({requiredContent:true})
        if(content){
            fetch('http://localhost:9999/api/comment/createComment', {
                method: 'POST',
                body: JSON.stringify({
                author: user.id,
                post: postId,
                content,
                parentComment: parentId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-token')
                }
            }).then(() => {
                this.props.refresh()              
            })
        }
    }
    getContent = (content) => {
        this.setState({content})
    }

    render(){
        const {requiredContent} = this.state
        return(
            <>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <TinyMCEInput getContent = {this.getContent}/>
                        {requiredContent && <DangerText text='Content is required!'/>}
                        <div>
                            <input type="submit" className="btn btn-primary" value="Add comment" />
                        </div>
                    </form>
                </div>
            </>    
        )
    }
}

export default withRouter(TinyMCEInputForm)