import React from 'react'

const WarningText = (props) => {
    return(
    <span id='span' data-test-id={props.id} className="text-danger">{props.text}</span>
    )
}
export default WarningText