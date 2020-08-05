import React, { Component } from 'react'
import UserContext from '../../Context'
import getPostById from '../../utils/getPostById'

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
                    'Content-Type': 'application/json'
                }
            }).then(async(v) => {
                const votes = await v.json()
                this.setState({votes: votes.votes})
            })
        }   
    }
    getPostById = async (id) => {
        const post = await getPostById(id)
        this.setState({post})
    }

    componentDidMount = async()=>{
        const {postId} = this.props
        await this.getPostById(postId)
        const {post} = this.state
        const votes = post.upVotes.length - post.downVotes.length 
        this.setState({votes})
    }
    render(){
        const {votes} = this.state

        return(
            <div class="text-muted small ml-3">
                    <div>
                        <a href="#" onClick={()=>this.makeVote('+')}>
                            <i class="fa fa-thumbs-up"></i>
                        </a>
                    </div>
                    <div  id="votesCount">{votes}</div>
                    <div>
                        <a href="#" onClick={()=>this.makeVote('-')}>
                            <i class="fa fa-thumbs-down"></i>
                        </a>
                    </div>
            </div>
        )
    }
}

export default Votes