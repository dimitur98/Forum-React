import React from 'react'

const SubmitBtn = (props) => {
    return(
        <div class="form-group" >
            <button id={props.id} type="submit" class="btn btn-primary">{props.name}</button>
        </div>
    )
}

export default SubmitBtn