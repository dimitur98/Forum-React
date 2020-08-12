import React, {useContext,useEffect,useState} from 'react'
import AddAnswer from '../addAnswer'
import PostHeader from '../postHeader'
import RenderedHtmlText from '../renderedHtmlText'
import DeleteBtn from '../deleteBtn/index.js'
import UserContext from '../../Context'

const Comment = (props) => {
    const context = useContext(UserContext)
    const [creator, setCreator] = useState(false)
    const {author, createdOn, content, _id} = props
    // email = {comment.author.email}
                        // createdOn = {new Date(comment.createdOn).toLocaleString()}
                        // imageUrl = {comment.author.imageUrl}
                        // content = {comment.content}
                        // id = {comment._id}
                        // authorId = {comment.author._id}
   const isAuthor = () => {
        const {user} = context
        const authorId = author._id
        if(user){
            if(user.id === authorId || user.role === 'admin'){
                setCreator(true)
            }else{
                setCreator(false)
            }
        }
    }

    useEffect(() => {
        isAuthor()
    },[])
    return(
        <div >
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <PostHeader  email = {author.email} createdOn = {props.createdOn} imageUrl = {author.imageUrl}>
                            {context.loggedIn && <AddAnswer showCommentInput ={() => props.showCommentInput(_id)} />}
                            {creator && <DeleteBtn refresh = {props.refresh} id = {_id} type={'Comment'}/>}
                        </PostHeader>
                        <div className="card-body">
                            <article>
                                <RenderedHtmlText content = {content} />
                            </article>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
    )
}

export default Comment