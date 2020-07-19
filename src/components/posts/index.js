import React from 'react'
import { Link } from 'react-router-dom'
import { faUserEdit, faCalendarAlt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css'; 

const Post = (props) => {
    return(
        <div className="media-body">
            <h4 className="media-heading"><Link to = {`/PostComments/${props.id}`}>{props.name}</Link></h4>
            <p>{props.content}</p>
            <ul className="list-inline list-unstyled text-right">
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faUserEdit} /> {props.authorEmail}
                </li>
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {props.createdOn}
                </li>
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faCommentDots} />  {props.commentsCount}
                </li>
            </ul>
        </div>
    )
} 

export default Post