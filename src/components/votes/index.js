import React, { Component } from 'react'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'

class Votes extends Component{
    constructor(props){
        super(props)

        this.state ={
            votes: 0,
            post:{}
        }
    }
    static contextType = UserContext

    makeVote = (vote) => {
        const{postId} = this.props
        const{user} = this.context
        if(user){
             fetch('http://localhost:9999/api/post/vote', {
                method: 'POST',
                body: JSON.stringify({
                vote,
                postId,
                userId: user.id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-token')
                }
            }).then(async(v) => {
                const votes = await v.json()
                this.setState({votes: votes.votes})
            })
        }   
    }
    
    getVotes=async()=>{
        const {postId} = this.props
        const promose = await fetch(`http://localhost:9999/api/post//getPostById/${postId}`)    
        const post = await promose.json()
        const votes = post.upVotes.length - post.downVotes.length 
        this.setState({votes})  
    }
    componentDidMount(){
        const {postId} = this.props
        fetch(`http://localhost:9999/api/post/getPostById/${postId}`).then(r =>{   
            r.json().then(p=>{
                const votes = p.upVotes.length - p.downVotes.length 
                this.setState({votes})
             })})        
    }
    
        
    
    render(){
        const {votes} = this.state
        const {loggedIn} = this.context

        return(
            <div className="text-muted small ml-3">
                    {loggedIn &&<div>
                        <a data-test-id={'upVote'} href="#" onClick={()=>this.makeVote('+')}>
                            <i className="fa fa-thumbs-up"></i>
                        </a>
                    </div>}
                    <div id="votesCount">Votes:{votes}</div>
                    {loggedIn && <div>
                        <a data-test-id={'downVote'} href="#" onClick={()=>this.makeVote('-')}>
                            <i className="fa fa-thumbs-down"></i>
                        </a>
                    </div>}
            </div>
        )
    }
}

export default Votes