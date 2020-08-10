import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Input from '../../components/input'
import SubmitBtn from '../../components/submitBtn'
import PageWrapper from '../../components/pageWrapper'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import getCookie from '../../utils/cookie'
import UserContext from '../../Context'
import styles from './index.module.css'


class CreateCategoryPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            imageUrl: "",
            name: ""
        }
    }

    static contextType = UserContext


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
        const {user} = this.context
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
        }).then((user) => {
            this.props.history.push('/')
        })
    }

    openWidget= () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "dimitur98",
            uploadPreset: "ReactForum"
        }, (err,res) => {
            if(res.event === 'success'){
                this.setState({
                    imageUrl: res.info.url
                })
            }
        })
        widget.open()
      }

    render(){
        const { name,imageUrl } = this.state
        return(
           <PageWrapper>
                    <div className = {styles.center}>
                        <form onSubmit = {this.handleSubmit}>
                            <Input       
                                value = {name}                         
                                onChange={(e) => this.onChange(e, 'name')}
                                label="Name"
                                id="name"
                            />
                            <button className="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                            {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}  
                            {imageUrl && <SubmitBtn name = 'Create' />}
                        </form>
                    </div>
            </PageWrapper>
        )
    }
}

export default withRouter(CreateCategoryPage)