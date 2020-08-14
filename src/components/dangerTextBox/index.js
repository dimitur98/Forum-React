import React from 'react'

const DangerTextBox = ({text}) => {
    return(
        <div id='dangerTextBox'  className="alert alert-danger" role="alert">
            {text}
        </div>
    )
}

export default DangerTextBox