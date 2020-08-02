import React from 'react'
import { Link } from 'react-router-dom'
import { EditorPropTypes } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes'

const Category = (props) =>{
    return(
        <div class="col-md-4 media">
            <img src={props.imageUrl} width="100" class="mr-3" alt={props.name} />
            <div class="media-body">
                <h5 class="mt-0">
                    <Link to ={`/postsByCategory/${props.id}/${props.name}`} >
                        {props.name}
                    </Link>
                </h5>            
            </div>
        </div>
    )
}
export default Category