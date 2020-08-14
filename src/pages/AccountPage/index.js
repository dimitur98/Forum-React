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
            posts: [],
            noPosts: false
        }
    }

    static contextType = UserContext

    getPosts = async () => {
        const{user} = this.context
        const promise = await fetch(`http://localhost:9999/api/post/getPostsByUserId/${user.id}`)
        const posts = await promise.json()
        if(posts.length !== 0){
            this.setState({
                posts
            })
        }else{
            this.setState({noPosts: true})
        }
        
    }

    renderPosts(){
        const { posts } = this.state
        
        return posts.map((post) => {
            return(
                <Post 
                    key = {post._id}
                    {...post}
                    commentsCount = {0} 
                />
            )
        })       
    }

    componentDidMount(){
        this.getPosts()
    }

    render(){
        const {noPosts} = this.state
        return(
            <PageWrapper title='My account - DForum'>
                <div className='container'>
                <Aside />
                    <div className={styles['inner-container']}>
                        {noPosts ? (<h1>You haven't got posts.</h1>) : this.renderPosts()}
                        
                    </div>
                </div>
            </PageWrapper>
        )
    }
}

export default AccountPage