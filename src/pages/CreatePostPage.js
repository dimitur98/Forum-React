import React, { Component } from 'react'

import Header from '../components/header'
import Footer from '../components/footer'
import TinyMCEInput from '../components/tinyMCEInput'
import SubmitBtn from '../components/submitBtn'
import Input from '../components/input'
import Category from '../components/category'

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
                'Content-Type': 'application/json'
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
            <>
                <Header />
                
                    <div class = 'center container'>
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
                <Footer />
            </>
        )
    }
}

export default CreatePostPage