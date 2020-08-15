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
        this.props.getContent(content)
      }
    
    componentDidMount(){
        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight);
          }, 800);
    }
    render(){
        const apiKey  = process.env.REACT_APP_TINYMCE_APYKEY
        const {content} = this.props
        return(        
            <div data-test-id={'tinyMceInput'}>   
                <Editor 
                    apiKey = { apiKey }
                    plugins = "image"
                    onEditorChange={this.handleEditorChange}
                    initialValue = {content}
                />
            </div>                   
        )
    }
}

export default TinyMCEInput