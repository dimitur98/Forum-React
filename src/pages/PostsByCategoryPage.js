import React, { Component } from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Post from '../components/posts'

class PostsByCategoryPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            posts: [],
            categoryId: ""
        }
    }

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
                    commentsCount = {post.comments.length} 
                />
            )
        })
        
    }

    componentDidMount(){
        this.getPosts(this.props.match.params.categoryId)
    }

    render(){ 
       const { categoryName } = this.props.match.params   
        return (
            <div>
                    <Header />
                    <div className='container'>
                        <main role="main" className="pb-3">
                            <h1 className="display-3">Title: {categoryName}</h1>                          
                                {this.renderPosts()}
                            <Footer />
                        </main>
                    </div>
             </div>
        )
    }
}

export default PostsByCategoryPage