import React, {useContext,useEffect,useState} from 'react'
import AddAnswer from '../addAnswer'
import PostHeader from '../postHeader'
import RenderedHtmlText from '../renderedHtmlText'
import DeleteBtn from '../deleteBtn/index.js'
import UserContext from '../../Context'

const Comment = (props) => {
    const context = useContext(UserContext)
    const [author, setAuthor] = useState(false)

   const isAuthor = () => {
        const {user} = context
        const {authorId} = props
        if(user){
            if(user.id === authorId || user.role === 'admin'){
                setAuthor(true)
            }else{
                setAuthor(false)
            }
        }
    }

    useEffect(() => {
        isAuthor()
    },[])
    return(
        <div>
            <div class="container-fluid mt-100">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <PostHeader  email = {props.email} createdOn = {props.createdOn} imageUrl = {props.imageUrl}>
                                        {context.loggedIn && <AddAnswer showCommentInput ={() => props.showCommentInput(props.id)} />}
                                        {author && <DeleteBtn refresh = {props.refresh} id = {props.id} type={'Comment'}/>}
                                    </PostHeader>
                                    <div class="card-body">
                                        <article>
                                            <RenderedHtmlText content = {props.content} />
                                        </article>
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
        </div>
    )
}

export default Comment