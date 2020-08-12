import React, { Component } from 'react'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getCookie from '../../utils/cookie'

class DeleteBtn extends Component{
    delete=()=>{
        const {id, type} = this.props
         fetch(`http://localhost:9999/api/${type}/delete${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': getCookie('x-auth-token')
            }
        }).then((c) => {
            this.props.refresh()
        })

    }
    render(){
        return(
            <>
                <div class=" pt-3"> <a type="button"  onClick={this.delete}><FontAwesomeIcon icon={faTrash} /></a> </div>                                       
            </>
        )
    }
}
export default DeleteBtn