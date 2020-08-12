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
    const [creator, setCreator] = useState(false)
    const {_id, name, content, author, createdOn, refresh,testId} = props 
    const context = useContext(UserContext)

    const getComments = async() => {
        const promise = await fetch(`http://localhost:9999/api/comment/getComments/${_id}`)
        const comments = await promise.json()

        setcommentsCount(comments.length)
    }
                    
    const isAuthor = () =>{
        const {user} = context
        const authorId = author._id
        
        if(user){
            if(user.id === authorId || user.role === 'admin' ){
                setCreator(true)
            }
        }
    }       

    useEffect(() => {
        getComments()
        isAuthor()
      },[])
    return(
        <div className="media-body">
            <h4  className="media-heading"><Link data-test-id={`post-${testId}`} to = {`/PostComments/${_id}`}>{name}</Link> {creator && <DeleteBtn refresh = {refresh} type={'Post'} id={_id}/>}</h4>
            
            <RenderedHtmlText content = {content.substring(0,500)+'...'}/>
            <ul className="list-inline list-unstyled text-right">
                <li className="list-inline-item">
                    <FontAwesomeIcon icon={faUserEdit} /> {author.email}
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