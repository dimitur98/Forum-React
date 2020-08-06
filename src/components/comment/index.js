import React, {useContext} from 'react'
import AddAnswer from '../addAnswer'
import PostHeader from '../postHeader'
import RenderedHtmlText from '../renderedHtmlText'
import UserContext from '../../Context'

const Comment = (props) => {
    const context = useContext(UserContext)
    return(
        <div>
            <div class="container-fluid mt-100">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <PostHeader  email = {props.email} createdOn = {props.createdOn} imageUrl = {props.imageUrl}>
                                        {context.loggedIn && <AddAnswer id = {props.id} showCommentInput ={() => props.showCommentInput(props.id)} authorId = {props.authorId} />}
                                    </PostHeader>
                                    <div class="card-body">
                                        <article>
                                            <RenderedHtmlText content = {props.content} />
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