import React from 'react'
import Votes from '../votes'


const PostHeader = (props) => {
    return(
        <div class="card-header">
            <div class="media flex-wrap w-100 align-items-center">
                <img src={props.imageUrl} class="d-block ui-w-40 rounded-circle avatarPostImg" alt="" />
                <div class="media-body ml-3">
                    {props.email}
                        <div class="text-muted small">
                            {props.createdOn}
                        </div>
                </div>
                {/* <Votes votes = {props.votes}/> */}
                {props.children}
            </div>
        </div>
    )
}
export default PostHeader