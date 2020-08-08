import React, { Component } from 'react'
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
    
    render(){
        return(
            <>
                <div class="text-muted small ml-3">                                      
                    <div class="px-4 pt-3"> <button type="button" class="btn btn-secondary" onClick={this.clickMe}><i class="fa fa-plus"></i>&nbsp; Answer</button> </div>                                       
                </div>
                
            </>       
        )
    }
}

export default AddAnswer