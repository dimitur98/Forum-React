import React from 'react'

const WarningTextBox =({text}) =>{
    return(
        <div className="alert alert-warning" role="alert">
            {text}
        </div>
    )
}

export default WarningTextBox