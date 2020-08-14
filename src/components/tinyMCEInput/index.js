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
          }, 500);
    }
    render(){
        const apiKey  = process.env.REACT_APP_TINYMCE_APYKEY
        return(        
            <div data-test-id={'tinyMceInput'}>   
                <Editor 
                    apiKey = { apiKey }
                    plugins = "image paste table link code media"
                    onEditorChange={this.handleEditorChange}
                />
            </div>                   
        )
    }
}

export default TinyMCEInput