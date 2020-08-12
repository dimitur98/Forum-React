import React from 'react'

const WarningText = (props) => {
    return(
    <span data-test-id={'warningText'} class="text-danger">{props.text}</span>
    )
}
export default WarningText