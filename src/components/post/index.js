import React from 'react'

const Post = (props) => {
    return(
        <div className="media-body">
            <h4 className="media-heading"><a >{props.name}</a></h4>
            <p>{props.content}</p>
            <ul className="list-inline list-unstyled text-right">
                <li className="list-inline-item">
                    <i className="fas fa-user-edit"></i> {props.authorEmail}
                </li>
                <li className="list-inline-item">
                    <i className="fas fa-calendar-alt"></i> {props.createdOn}
                </li>
                <li className="list-inline-item">
                    <i className="fas fa-comment-dots"></i>  {props.commentsCount}
                </li>
            </ul>
        </div>
    )
} 

export default Post