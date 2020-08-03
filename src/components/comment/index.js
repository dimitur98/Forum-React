import React from 'react'
import AddAnswer from '../addAnswer'
import PostHeader from '../postHeader'

const Comment = (props) => {
    return(
        <div>
            <div class="container-fluid mt-100">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <PostHeader email = {props.email} createdOn = {props.createdOn} imageUrl = {props.imageUrl}>
                                        <AddAnswer showCommentInput ={props.showCommentInput}/>
                                    </PostHeader>
                                    <div class="card-body">
                                        <article>
                                            {props.content}
                                        </article>
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
        </div>
    )
}

export default Comment