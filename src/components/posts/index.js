import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { faUserEdit, faCalendarAlt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css'; 
import RenderedHtmlText from '../renderedHtmlText'
import DeleteBtn from '../deleteBtn/index.js'



const Post = (props) => {
    const [commentsCount, setcommentsCount] = useState(0)
    const {id, name, content, authorEmail, createdOn} = props 

    const getComments = async() => {
        console.log('b')
        const promise = await fetch(`http://localhost:9999/api/comment/getComments/${id}`)
        const comments = await promise.json()
        console.log(comments)

        setcommentsCount(comments.length)
    }

    useEffect(() => {
        console.log('a')
        getComments()
      },[])

    return(
        <div className="media-body">
            <h4 className="media-heading"><Link to = {`/PostComments/${id}`}>{name}</Link> <DeleteBtn type={'Post'} id={id}/></h4>
            
            <RenderedHtmlText content = {content}/>
            <ul className="list-inline list-unstyled text-right">
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faUserEdit} /> {authorEmail}
                </li>
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {createdOn}
                </li>
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faCommentDots} />  {commentsCount}
                </li>
            </ul>
        </div>
    )
} 

export default Post