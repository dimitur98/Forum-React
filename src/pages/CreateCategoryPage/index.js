import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Input from '../../components/input'
import SubmitBtn from '../../components/submitBtn'
import PageWrapper from '../../components/pageWrapper'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import getCookie from '../../utils/cookie'
import UserContext from '../../Context'
import DangerText from '../../components/dangerText'
import imgUploadWidget from '../../components/imgUploadWidget'
import styles from './index.module.css'
import ImgUplaodWidget from '../../components/imgUploadWidget'


class CreateCategoryPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            imageUrl: "",
            name: "",
            requiredName: false,
            requiredImageUrl: false
        }
    }

    static contextType = UserContext


    setImgUrl = (imageUrl) => {
        console.log(imageUrl)
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
        const {user} = this.context
        name ? this.setState({requiredName: false}) : this.setState({requiredName: true})
        imageUrl ? this.setState({requiredImageUrl: false}) : this.setState({requiredImageUrl: true})
        if(name && imageUrl){
            fetch('http://localhost:9999/api/category/createCategory', {
                method: 'POST',
                body: JSON.stringify({
                name,
                author: user.id,            
                imageUrl
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('x-auth-token')
                }
            }).then((category) => {
                this.props.history.push('/')
            })
        }
    }

    setImgUrl = (imageUrl)=>{
        this.setState({imageUrl})
    }

    render(){
        const { name,imageUrl,requiredName, requiredImageUrl } = this.state
        return(
           <PageWrapper title='Create category - DForum'>
                    <div className = {styles.center}>
                        <form onSubmit = {this.handleSubmit}>
                            <Input       
                                value = {name}                         
                                onChange={(e) => this.onChange(e, 'name')}
                                label="Name"
                                id="name"
                            />
                            {requiredName && <DangerText text='Name is required!' />}
                            <br/>
                            <ImgUplaodWidget setImgUrl = {(imageUrl) => this.setImgUrl(imageUrl)} />
                            {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}
                            <br/> 
                            {requiredImageUrl && <DangerText text='Image is required!' />}
                            <SubmitBtn name = 'Create' />
                        </form>
                    </div>
            </PageWrapper>
        )
    }
}

export default withRouter(CreateCategoryPage)