import React from 'react'

const SubmitBtn = (props) => {
    return(
        <div className="form-group" >
            <button id={props.id} type="submit" className="btn btn-primary">{props.name}</button>
        </div>
    )
}

export default SubmitBtn