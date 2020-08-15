import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import TinyMCEInput from '../../components/tinyMCEInput'
import SubmitBtn from '../../components/submitBtn'
import Input from '../../components/input'
import getCookie from '../../utils/cookie'
import DangerText from '../../components/dangerText'
import getPostById from '../../utils/getPostById'
import styles from './index.module.css'

class EditPostPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            content: "",
            categoryName: "",
            requiredName: false,
            requiredContent: false
        }
    }

    getContent = (content) => {
        this.setState({content})
    }
    getCategoryById = async(categoryId) => {
        const promise = await fetch(`http://localhost:9999/api/category/getCategoryById/${categoryId}`)
        const category = await promise.json()
        this.setState({
            categoryName: category.name
        })
    }
    getPostById = async (id) => {
        const post = await getPostById(id)
        console.log(post.content)
        this.setState({name: post.name, content: post.content})
        await this.getCategoryById(post.categoryId)
    }
    handleSubmit = async(event) => {
        event.preventDefault()

        const{
            name,
            content
        } = this.state

        const {categoryId, authorId} = this.props.match.params
        name ? this.setState({requiredName: false}) : this.setState({requiredName: true})
        content ? this.setState({requiredContent: false}) : this.setState({requiredContent: true})
        if(name && content){
            await fetch(`http://localhost:9999/api/post/editPost/${this.props.match.params.postId}`, {
                method: 'POST',
                body: JSON.stringify({
                name,
                content
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-token')
                }
            }).then((c) => {
                this.props.history.push(`/Account`)
            })
        }
    }

    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
    }

    componentDidMount(){
        this.getPostById(this.props.match.params.postId)
    }
    render(){
        const {name,categoryName,requiredName, requiredContent, content} = this.state
        return(
            <PageWrapper title='Edit post - DForum'>
                    <div className={styles.container}>
                        <form onSubmit = {this.handleSubmit}>
                            
                            <Input       
                                value = {name}                         
                                onChange={(e) => this.onChange(e, 'name')}
                                label="Name"
                                id="name"
                            />
                            {requiredName && <DangerText text='Name is required!'/>}
                            <TinyMCEInput getContent = {this.getContent} content = {content}/>
                            {requiredContent && <DangerText text='Content is required!'/>}
                            <br />
                            <span>Category name: {categoryName}</span>
                            <br /> <br />
                            <SubmitBtn name = 'Edit' />
                        </form>
                    </div>
            </PageWrapper>
        )
    }
}

export default withRouter(EditPostPage)