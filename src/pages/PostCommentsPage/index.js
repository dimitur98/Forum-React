import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper'
import Comment from '../../components/comment';
import PostHeader from '../../components/postHeader'
import Votes from '../../components/votes'
import TinyMCEForm from '../../components/tinyMCEForm'
import RenderedHtmlText from '../../components/renderedHtmlText'
import getPostById from '../../utils/getPostById'
import UserContext from '../../Context'


class PostCommentsPage extends Component{
    constructor(){
        super()
        this.state = {
            name: "AddComment",
            showHideCommentFrom: false,
            post: {},
            author: {},
            comments:[],
            subComments: [],
            parentId: ""
            
        }
        this.showCommentInput = this.showCommentInput.bind(this)
    }

    static contextType = UserContext


    showCommentInput(parentId){
        this.setState({ 
            showHideCommentFrom: !this.state.showHideCommentFrom,
            parentId })
    }

    getPostById = async (id) => {
        const post = await getPostById(id)
        this.setState({post,author:post.author})
    }


    getCommentsByPostId = async (postId) => {
        const promise = await fetch(`http://localhost:9999/api/comment/getComments/${postId}`)
        const comments = await promise.json()
        this.setState({comments})
    }

    renderComments(postId){  
        const comments = this.state.comments
        const subComments = comments.filter(c => c.parentComment === postId) 
        if(subComments.length === 0){return}
        return subComments.map((comment) => {   
        return(    
                <div>                       
                    <Comment 
                        key = {comment._id} 
                        {...comment}
                        showCommentInput = {() => this.showCommentInput(comment._id)}
                        refresh = {this.refresh}
                    >
                    {this.renderComments(comment._id)}
                    </Comment>
                </div>
            ) 
        })       
    }
    refresh = () =>{
        this.getCommentsByPostId(this.props.match.params.postId)
    }

    componentDidMount(){
        this.getPostById(this.props.match.params.postId)
        this.getCommentsByPostId(this.props.match.params.postId)
        this.setState({parentId: this.props.match.params.postId})

    }
    render(){
        const { showHideCommentFrom } = this.state
        
        const { author, post} = this.state
        const postId = this.props.match.params.postId
        const {loggedIn} = this.context
        return(
            <PageWrapper title={`${post.name} comments - DForum`}>
                    <div className='container'>
                        <h1>{post.name}</h1>
                        <div className="container-fluid mt-100">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card mb-4">
                                        <PostHeader  email = {author.email} createdOn = {post.createdOn} imageUrl = {author.imageUrl} >
                                            <Votes postId = {postId}/>
                                        </PostHeader>
                                        <div class="card-body" >
                                            <article>
                                                <RenderedHtmlText content = { post.content } />
                                            </article>                                           
                                               {loggedIn && <div class="px-4 pt-3"> <button data-test-id={'commentBtn'} className="btn btn-primary float-right" onClick={() => this.showCommentInput(postId)}><i class="fa fa-plus"></i>&nbsp; Comment</button> </div>}
                                                <div className="clearfix"></div>                                         
                                                {this.renderComments(this.props.match.params.postId)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                   
                        { showHideCommentFrom && <TinyMCEForm refresh = {this.refresh} postId = {postId} parentId = {this.state.parentId}  showCommentInput = {this.showCommentInput}/> }
                    </div>
             </PageWrapper>
        )
    }
}

export default PostCommentsPage