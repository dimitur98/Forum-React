import React, { Component } from 'react'
import { Editor } from "@tinymce/tinymce-react";

class TinyMCEInput extends Component{
    constructor(props){
        super(props)

        this.state = {
            apiKey: process.env.REACT_APP_TINYMCE_APYKEY,
            content: ""
        }
    }
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        this.props.getContent(content)
      }
    
    render(){
        const apiKey  = process.env.REACT_APP_TINYMCE_APYKEY
        console.log(apiKey)
        return(          
            <Editor
                apiKey = { apiKey }
                plugins = "image paste table link code media"
                onEditorChange={this.handleEditorChange}
            />                   
        )
    }
}

export default TinyMCEInput