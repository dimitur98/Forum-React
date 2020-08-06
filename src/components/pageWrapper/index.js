import React from 'react'
import Header from '../header'
import Footer from '../footer'

const PageWrapper = (props) =>{
    return(
        <>
            <Header isAdmin = {props.isAdmin}/>
                {props.children}
            <Footer />
        </>
    )
}

export default PageWrapper