import React, { Component } from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Comment from '../components/comment';
import Votes from '../components/votes'
import AddComment from '../components/addComment'

class PostCommentsPage extends Component{
    constructor(){
        super()
        this.state = {
            name: "AddComment",
            showHideCommentFrom: false
        }

        this.hideComponent = this.hideComponent.bind(this)
    }

    hideComponent(){
        console.log('a')
        this.setState({ showHideCommentFrom: !this.state.showHideCommentFrom })
    }
    render(){
        const { showHideCommentFrom } = this.state
        return(
            <div>
                <Header />
                    <div class='container'>
                        <h1>title</h1>
                        <div class="container-fluid mt-100">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <div class="media flex-wrap w-100 align-items-center">
                                                <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" class="d-block ui-w-40 rounded-circle" alt="" />
                                                <div class="media-body ml-3">
                                                    @Model.UserUserName
                                                    <div class="text-muted small">
                                                        <time></time>
                                                    </div>
                                                </div>
                                                <Votes />
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <article>
                                                @Html.Raw(Model.SanitizedContent)
                                            </article>                                           
                                                <div class="px-4 pt-3"> <button class="btn btn-primary float-right" onClick={() => this.hideComponent()}><i class="fa fa-plus"></i>&nbsp; Comment</button> </div>
                                                <div class="clearfix"></div>                                         
                                                <Comment />
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { showHideCommentFrom && <AddComment /> }
                    </div>
                <Footer />
            </div>
        )
    }
}

export default PostCommentsPage