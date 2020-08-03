import React, { Component } from 'react'

class RenderedHtmlText extends Component{

    createMarkup = () => {
        return {__html: this.props.content};
      }

    render(){
        return(
            <div dangerouslySetInnerHTML={this.createMarkup()} />   
        )
    }
}

export default RenderedHtmlText