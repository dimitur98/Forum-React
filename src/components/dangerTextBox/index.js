import React from 'react'

const WarningTextBox = ({text}) => {
    return(
        <div class="alert alert-danger" role="alert">
            {text}
        </div>
    )
}

export default WarningTextBox