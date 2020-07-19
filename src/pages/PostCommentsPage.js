import React, { Component } from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Comment from '../components/comment';
import AddComment from '../components/addComment'
import PostHeader from '../components/postHeader'

class PostCommentsPage extends Component{
    constructor(){
        super()
        this.state = {
            name: "AddComment",
            showHideCommentFrom: false,
            post: {},
            author: {}
        }

        this.hideComponent = this.hideComponent.bind(this)
    }

    hideComponent(){
        this.setState({ showHideCommentFrom: !this.state.showHideCommentFrom })
    }

    getPostById = async (id) => {
        const promise = await fetch(`http://localhost:9999/api/post//getPostById/${id}`)
        const post = await promise.json()
        console.log(post.author.email)
        this.setState({post,author:post.author})
    }

    componentDidMount(){
        this.getPostById(this.props.match.params.postId)

    }
    render(){
        const { showHideCommentFrom } = this.state
        
        const author = this.state.author
        console.log(author.imageUrl)
        return(
            <div>
                <Header />
                    <div class='container'>
                        <h1>title</h1>
                        <div class="container-fluid mt-100">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card mb-4">
                                        <PostHeader  email = {author.email} createdOn = {author.createdOn} imageUrl = {author.imageUrl}/>
                                        <div class="card-body">
                                            <article>
                                                @Html.Raw(Model.ss)
                                            </article>                                           
                                                <div class="px-4 pt-3"> <button class="btn btn-primary float-right" onClick={() => this.hideComponent()}><i class="fa fa-plus"></i>&nbsp; Comment</button> </div>
                                                <div class="clearfix"></div>                                         
                                                <Comment />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { showHideCommentFrom && <AddComment /> }
                    </div>
                <Footer />
            </div>
        )
    }
}

export default PostCommentsPage