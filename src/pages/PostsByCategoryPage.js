import React from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Post from '../components/post'

function PostsByCategoryPage(){

        return (
            <div>
                    <Header />
                    <div className='container'>
                        <main role="main" className="pb-3">
                            <h1 className="display-3">Title: </h1>
                            <div className="alert alert-info">
                                Description: 
                            </div>
                                <Post />
                            <Footer />
                        </main>
                    </div>
             </div>
        )
}

export default PostsByCategoryPage