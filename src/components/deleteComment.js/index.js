import React, { Component } from 'react'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class DeleteComment extends Component{
    constructor(props){
        super(props)
        this.state={
            a:""
        }
    }
    deleteComment=()=>{
        const {id} = this.props
         fetch(`http://localhost:9999/api/comment/deleteComment/${id}`, {
            method: 'DELETE',
        }).then((c) => {
        })

    }
    render(){
        return(
            <>
                <div class=" pt-3"> <a type="button"  onClick={this.deleteComment}><FontAwesomeIcon icon={faTrash} /></a> </div>                                       
            </>
        )
    }
}
export default DeleteComment