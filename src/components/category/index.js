import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import DeleteBtn from '../deleteBtn'
import UserContext from '../../Context'
import styles from './index.module.css'


const Category = (props) =>{
    const context = useContext(UserContext)
    const [admin, setAdmin] = useState(false)

    const checkAdmin = () =>{
        const {user} = context
        if(user){
            if(user.role === 'admin'){
                setAdmin(true)
            }
        }
    }

    useEffect(()=>{
        checkAdmin()
    },[])

    return(
        <div className="col-md-4 media">
            <img src={props.imageUrl} className={styles.categoryImg} alt={props.name} />
            <div className="media-body">
                <h5 data-test-id={`category-${props.testId}`} className="mt-0">
                    <Link  to ={`/postsByCategory/${props.id}/${props.name}`} >
                        {props.name}
                    </Link>
                    {admin && <DeleteBtn refresh = {props.refresh} type='category' id={props.id}/>}
                </h5>            
            </div>
        </div>
    )
}
export default Category