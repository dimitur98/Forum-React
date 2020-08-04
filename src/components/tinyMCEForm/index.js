import React, { Component } from 'react'
import TinyMCEInput from '../tinyMCEInput'
import UserContext from '../../Context'
import { withRouter } from 'react-router-dom';
class TinyMCEInputForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            content: "",
            update: false
        }
    }

    static contextType = UserContext


     
    handleSubmit = async(event) => {
        event.preventDefault()
        const{
            content,
        } = this.state
        const {postId, parentId} = this.props
        console.log(parentId)
        const {user} = this.context
         await fetch('http://localhost:9999/api/comment/createComment', {
             method: 'POST',
             body: JSON.stringify({
               author: user.id,
               post: postId,
               content,
               parentComment: parentId
             }),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(() => {
            const { history } = this.props;
            history.push(`/`);
            history.push(`/PostComments/${postId}`);
            
         })
    }
    getContent = (content) => {
        this.setState({content})
    }

    render(){
        return(
            <>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <TinyMCEInput getContent = {this.getContent}/>
                        <div>
                            <input type="submit" class="btn btn-primary" value="Add comment" />
                        </div>
                    </form>
                </div>
            </>    
        )
    }
}

export default withRouter(TinyMCEInputForm)