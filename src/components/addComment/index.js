import React, { Component } from 'react'
import { Editor } from "@tinymce/tinymce-react";

class AddComment extends Component{
    constructor(props){
        super(props)

        this.state = {
            apiKey: process.env.REACT_APP_TINYMCE_APYKEY
        }
    }
    
    render(){
        const apiKey  = process.env.REACT_APP_TINYMCE_APYKEY.slice(1,-1)
        
        return(
            <div>
                <form>
                    <input type="hidden" name="PostId" value="@this.Model.Id" />
                    <input type="hidden" name="ParentId" value="0" />
                    <div>
                        <label for="Content"></label>
                        <Editor
                            apiKey = { apiKey }
                            plugins = "image paste table link code media"
                        />
                    </div>
                    <div>
                        <input type="submit" class="btn btn-primary" value="Add comment" />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddComment