import React from 'react'


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
                {props.children}
            </div>
        </div>
    )
}
export default PostHeader