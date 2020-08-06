import React, { Component } from 'react'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class AddImage extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          imageUrl: ""
        }
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
                this.props.setImgUrl(this.state.imageUrl)
            }
        })
        widget.open()
      }

    render(){
        const {imageUrl} = this.state
        return(
            <>
                <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
                {imageUrl && <FontAwesomeIcon icon={faCheckCircle} />}
                <hr/>
            </>
        )
    }
}

export default AddImage