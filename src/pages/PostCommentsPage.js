import React, { Component } from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Comment from '../components/comment';
import PostHeader from '../components/postHeader'
import Votes from '../components/votes'
import TinyMCEForm from '../components/tinyMCEForm'
import RenderedHtmlText from '../components/renderedHtmlText'
import getPostById from '../utils/getPostById'


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
            parentId: "",
            
        }

        this.showCommentInput = this.showCommentInput.bind(this)
    }



    showCommentInput(parentId){
        this.setState({ 
            showHideCommentFrom: !this.state.showHideCommentFrom,
            parentId })
        console.log(this.state.parentId)
    }

    getPostById = async (id) => {
        const post = await getPostById(id)
        this.setState({post,author:post.author})
    }


    getCommentsByPostId = async (postId) => {
        console.log(postId)
        const promise = await fetch(`http://localhost:9999/api/comment/getComments/${postId}`)
        const comments = await promise.json()
        this.setState({comments})
    }

    renderComments(postId){  
        const comments = this.state.comments
        const subComments = comments.filter(c => c.parentComment == postId) 
        if(subComments.length == 0){return}
        return subComments.map((comment) => {   
                           
        return(    
                <div>                       
                    <Comment 
                        key = {comment._id} 
                        email = {comment.author.email}
                        createdOn = {comment.createdOn}
                        imageUrl = {comment.author.imageUrl}
                        content = {comment.content}
                        id = {comment._id}
                        authorId = {comment.author._id}
                        showCommentInput = {() => this.showCommentInput(comment._id)}
                    >
                    {this.renderComments(comment._id)}
                    </Comment>
                </div>
            ) 
        })       
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
        
        return(
            <div>
                <Header />
                    <div class='container'>
                        <h1>{post.name}</h1>
                        <div class="container-fluid mt-100">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card mb-4">
                                        <PostHeader  email = {author.email} createdOn = {post.createdOn} imageUrl = {author.imageUrl} >
                                            <Votes postId = {postId}/>
                                        </PostHeader>
                                        <div class="card-body">
                                            <article>
                                                <RenderedHtmlText content = { post.content } />
                                            </article>                                           
                                                <div class="px-4 pt-3"> <button class="btn btn-primary float-right" onClick={() => this.showCommentInput(postId)}><i class="fa fa-plus"></i>&nbsp; Comment</button> </div>
                                                <div class="clearfix"></div>                                         
                                                {this.renderComments(this.props.match.params.postId)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                   
                        { showHideCommentFrom && <TinyMCEForm  postId = {postId} parentId = {this.state.parentId}  showCommentInput = {this.showCommentInput}/> }
                    </div>
                <Footer />
            </div>
        )
    }
}

export default PostCommentsPage