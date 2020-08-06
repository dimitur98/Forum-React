import React, { Component } from 'react'
import DeleteComment from '../deleteBtn/index.js'
import UserContext from '../../Context'

class AddAnswer extends Component {
    constructor(props){
        super(props)
        this.state ={
            isAuthor: false
        }
    }

    static contextType = UserContext


    clickMe = () => {
        this.props.showCommentInput()
    }

    isAuthor(){
        const {user} = this.context
        const {authorId} = this.props
        console.log(user)
        if(user){
            if(user.id === authorId){
                this.setState({isAuthor: true})
            }
        }

    }
    componentDidMount(){
        this.isAuthor()
    }
    
    
    render(){
        const {id} = this.props
        const{isAuthor} = this.state
        console.log(this.context)
        return(
            <>
                <div class="text-muted small ml-3">                                      
                    <div class="px-4 pt-3"> <button type="button" class="btn btn-secondary" onClick={this.clickMe}><i class="fa fa-plus"></i>&nbsp; Answer</button> </div>                                       
                </div>
                {isAuthor && <DeleteComment showCommentSuccessDeletedText = {this.props.showCommentSuccessDeletedText} id = {id} type={'Comment'}/>}
            </>       
        )
    }
}

export default AddAnswer