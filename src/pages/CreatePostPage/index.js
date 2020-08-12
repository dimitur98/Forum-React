import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import TinyMCEInput from '../../components/tinyMCEInput'
import SubmitBtn from '../../components/submitBtn'
import Input from '../../components/input'
import getCookie from '../../utils/cookie'
import styles from './index.module.css'

class CreatePostPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            content: "",
            cateoryName: ""
        }
    }

    getContent = (content) => {
        this.setState({content})
    }
    getCategoryById = async() => {
        const {categoryId} = this.props.match.params
        console.log('props',this.props)
        const promise = await fetch(`http://localhost:9999/api/category/getCategoryById/${categoryId}`)
        const category = await promise.json()
        console.log('category',category)
        this.setState({
            cateoryName: category.name
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()

        const{
            name,
            content
        } = this.state

        const {categoryId, authorId} = this.props.match.params

        await fetch('http://localhost:9999/api/post/createPost', {
            method: 'POST',
            body: JSON.stringify({
              name,
              author: authorId,
              categoryId,             
              content
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        }).then((c) => {
            this.props.history.push(`/postsByCategory/${categoryId}/${name}`)
        })
    }

    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)
    }

    componentDidMount(){
        this.getCategoryById()
    }
    render(){
        const {name} = this.state
        return(
            <PageWrapper title='Create post - DForum'>
                    <div className={styles.container}>
                        <form onSubmit = {this.handleSubmit}>
                            
                            <Input       
                                value = {name}                         
                                onChange={(e) => this.onChange(e, 'name')}
                                label="Name"
                                id="name"
                            />
                            <TinyMCEInput getContent = {this.getContent}/>
                            <br />
                            <span>Category name: {this.state.cateoryName}</span>
                            <br /> <br />
                            <SubmitBtn name = 'Create' />
                        </form>
                    </div>
            </PageWrapper>
        )
    }
}

export default withRouter(CreatePostPage)