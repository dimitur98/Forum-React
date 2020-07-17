import React from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head';

const PostCommentsPage =  () => {
    return(
        <div>
            <Header />
                <div class="container-fluid mt-100">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <div class="media flex-wrap w-100 align-items-center">
                                            <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" class="d-block ui-w-40 rounded-circle" alt="" />
                                            <div class="media-body ml-3">
                                                UserUserName
                                                <div class="text-muted small">
                                                    <time></time>
                                                </div>
                                            </div>
                                            <div class="text-muted small ml-3">
                                                
                                                    <div class="px-4 pt-3"> <button type="button" class="btn btn-secondary" onclick="showAddCommentForm(@comment.Id)"><i class="fa fa-plus"></i>&nbsp; Answer</button> </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <article>
                                            comment.SanitizedContent
                                        </article>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <Footer />
        </div>
    )
}

export default PostCommentsPage