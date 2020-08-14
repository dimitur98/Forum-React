import React from 'react'

const WarningText = (props) => {
    return(
    <span data-test-id={'warningText'} className="text-danger">{props.text}</span>
    )
}
export default WarningText