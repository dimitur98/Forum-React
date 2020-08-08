import React, { Component } from 'react'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class DeleteBtn extends Component{
    constructor(props){
        super(props)
    }
    delete=()=>{
        const {id, type} = this.props
         fetch(`http://localhost:9999/api/${type}/delete${type}/${id}`, {
            method: 'DELETE',
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