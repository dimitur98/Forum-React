import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { faUserEdit, faCalendarAlt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css'; 
import RenderedHtmlText from '../renderedHtmlText'
import DeleteBtn from '../deleteBtn/index.js'
import UserContext from '../../Context'




const Post = (props) => {
    const [commentsCount, setcommentsCount] = useState(0)
    const [author, setAuthor] = useState(false)
    const {id, name, content, authorEmail, createdOn, refresh} = props 
    const context = useContext(UserContext)

    const getComments = async() => {
        const promise = await fetch(`http://localhost:9999/api/comment/getComments/${id}`)
        const comments = await promise.json()

        setcommentsCount(comments.length)
    }

    const isAuthor = () =>{
        const {user} = context
        const {authorId} = props
        
        console.log(user)
        if(user){
            if(user.id === authorId || user.role === 'admin' ){
                setAuthor(true)
            }
        }
    }       

    useEffect(() => {
        getComments()
        isAuthor()
      },[])

    return(
        <div className="media-body">
            <h4 className="media-heading"><Link to = {`/PostComments/${id}`}>{name}</Link> {author && <DeleteBtn refresh = {refresh} type={'Post'} id={id}/>}</h4>
            
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