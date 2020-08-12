import React, { Component } from 'react'
import PageWrapper from '../../components/pageWrapper'
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
        this.getPosts()
    }

    render(){
        return(
            <PageWrapper title='My account - DForum'>
                <div class='container'>
                <Aside />
                    <div className={styles['inner-container']}>
                        {this.renderPosts()}
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default AccountPage