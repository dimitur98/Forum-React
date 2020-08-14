import React from 'react'

const Input = ({label, id, value, onChange, type, isPasswordsMatch}) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>
        {label}:
        <input type={type || 'text'} id={id} value={value} onChange={onChange} className="form-control" onBlur = {type ==='password' ? isPasswordsMatch : () =>{}}/>
      </label>
    </div>
  )

}

export default Input