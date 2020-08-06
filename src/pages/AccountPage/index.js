import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from './index.module.css'
import UserContext from '../../Context'
import Post from '../../components/posts'
import Aside from '../../components/aside'


class AccountPage extends Component{
    constructor(props){
        super(props)
        this.state={
            posts: []
        }
    }

    static contextType = UserContext

    getPosts = async () => {
        const{user} = this.context
        const promise = await fetch(`http://localhost:9999/api/post/getPostsByUserId/${user.id}`)
        const posts = await promise.json()
        console.log(posts)
        this.setState({
            posts
        })
    }

    renderPosts(){
        const { posts } = this.state
        return posts.map((post) => {
            console.log('post',post.author.email)
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
        console.log("asd")
        this.getPosts()
    }

    render(){
        return(
            
            <>
                    <Header />
                    <div class='container'>
                    <Aside />
                        <div className={styles['inner-container']}>
                        {this.renderPosts()}
                        </div>
                    </div>
                    <Footer />
             </>
        )
    }
}

export default AccountPage