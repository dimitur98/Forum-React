import React from 'react'
import Header from '../header'
import Footer from '../footer'
import {Helmet} from "react-helmet";

const PageWrapper = (props) =>{
    return(
        <>
            <Header/>
                <Helmet>
                    <title>{props.title}</title>
                </Helmet>
                {props.children}
            <Footer />
        </>
    )
}

export default PageWrapper