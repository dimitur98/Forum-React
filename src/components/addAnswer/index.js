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
                    <div className={styles.btn}> <button type="button" className="btn btn-secondary" onClick={this.clickMe}><i className="fa fa-plus"></i>&nbsp; Answer</button> </div>                                       
                </div>
                
            </>       
        )
    }
}

export default AddAnswer