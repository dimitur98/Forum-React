import React from 'react'

const Post = () => {
    return(
        <div className="media-body">
            <h4 className="media-heading"><a >postTitle:</a></h4>
            <p>postShortContent:</p>
            <ul className="list-inline list-unstyled text-right">
                <li className="list-inline-item">
                    <i className="fas fa-user-edit"></i> postUserUserName:
                </li>
                <li className="list-inline-item">
                    <i className="fas fa-calendar-alt"></i> postCreatedOn
                </li>
                <li className="list-inline-item">
                    <i className="fas fa-comment-dots"></i>  comments
                </li>
            </ul>
        </div>
    )
} 

export default Post