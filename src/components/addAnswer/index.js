import React, { Component } from 'react'
import UserContext from '../../Context'
import styles from './index.module.css'

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
                <div className = {styles.textMuted}>                                      
                    <div class={styles.btn}> <button type="button" class="btn btn-secondary" onClick={this.clickMe}><i class="fa fa-plus"></i>&nbsp; Answer</button> </div>                                       
                </div>
                
            </>       
        )
    }
}

export default AddAnswer