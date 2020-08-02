import React, { Component } from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

class CreatePostPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <Header />
                    <div class = 'center'>
                        <form>

                        </form>   
                    </div>
                <Footer/>
            </>
        )
    }
}

export default CreatePostPage