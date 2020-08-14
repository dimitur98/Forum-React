import React, { Component } from 'react'

class ImgUplaodWidget extends Component{
    openWidget= () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "dimitur98",
            uploadPreset: "ReactForum"
        }, (err,res) => {
            if(res.event === 'success'){
                this.props.setImgUrl(res.info.url)
            }
        })
        widget.open()
      }


    render(){
        return(
            <button class="btn btn-primary" type="button" onClick={this.openWidget}>Add photo</button>
        )
    }
}

export default ImgUplaodWidget