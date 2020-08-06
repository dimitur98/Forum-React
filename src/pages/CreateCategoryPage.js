import React, { Component } from 'react'
import Input from '../components/input'
import AddImage from '../components/addImage'
import SubmitBtn from '../components/submitBtn'
import PageWrapper from '../components/pageWrapper'

class CreateCategoryPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            imageUrl: "",
            name: ""
        }
    }

    setImgUrl = (imageUrl) => {
        this.setState({imageUrl})
    }

    onChange = (event, type) => {
      const newState = {}
      newState[type] = event.target.value
  
      this.setState(newState)
    }

    handleSubmit = async(event) => {
        event.preventDefault()

        const{
            name,
            imageUrl
        } = this.state
        await fetch('http://localhost:9999/api/category/createCategory', {
            method: 'POST',
            body: JSON.stringify({
              name,             
              imageUrl
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((user) => {
            this.props.history.push('/')
        })
    }

    render(){
        const { name } = this.state
        return(
           <PageWrapper>
                    <div class = 'center'>
                        <form onSubmit = {this.handleSubmit}>
                            <Input       
                                value = {name}                         
                                onChange={(e) => this.onChange(e, 'name')}
                                label="Name"
                                id="name"
                            />
                            <AddImage setImgUrl = {this.setImgUrl}/>
                            <SubmitBtn name = 'Create' />
                        </form>
                    </div>
            </PageWrapper>
        )
    }
}

export default CreateCategoryPage