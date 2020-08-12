import React from 'react'
import styles from './index.module.css'

const PostHeader = (props) => {
    return(
        <div class="card-header">
            <div class="media flex-wrap w-100 align-items-center">
                <img src={props.imageUrl} className={styles.avatarPostImg} alt="" />
                <div class="media-body ml-3">
                    {props.email}
                        <div class="text-muted small">
                            {new Date(props.createdOn).toLocaleString()}
                        </div>
                </div>
                {props.children}
            </div>
        </div>
    )
}
export default PostHeader