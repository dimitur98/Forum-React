import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Post from '../components/posts'
import UserContext from '../Context'

class PostsByCategoryPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            posts: [],
            categoryId: ""
        }
    }
    static contextType = UserContext

    getPosts = async (categoryId) => {
        const promise = await fetch(`http://localhost:9999/api/post/postsByCategory/${categoryId}`)
        const posts = await promise.json()
        this.setState({
            posts
        })
    }

    renderPosts(){
        const { posts } = this.state
        return posts.map((post) => {
            return(
                <Post 
                    key = {post._id}
                    id = {post._id}
                    content = {post.content.substring(0,500)+'...'}
                    name = {post.name} 
                    authorEmail = {post.author.email} 
                    createdOn = {post.createdOn} 
                    commentsCount = {0} 
                    authorId = {post.author._id}
                />
            )
        })
        
    }

    componentDidMount(){
        this.getPosts(this.props.match.params.categoryId)
    }

    render(){ 
       const { categoryName, categoryId } = this.props.match.params   
       const { user } = this.context
       
        return (
            <div>
                    <Header />
                    <div className='container'>
                        <main role="main" className="pb-3">
                            <h1 className="display-3">Title: {categoryName} 
                            {user && <Link to = {`/CreatePost/${categoryId}/${user.id}`} class="btn btn-primary" style={{float: "right", marginTop:50}}>
                                <i class="fa fa-plus"></i>&nbsp; Answer
                            </Link>}</h1>                       
                                {this.renderPosts()}
                            <Footer />
                        </main>
                    </div>
             </div>
        )
    }
}

export default PostsByCategoryPage