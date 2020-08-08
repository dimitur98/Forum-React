import React from 'react'

const Input = ({label, id, value, onChange, type, isPasswordsMatch}) => {

  return (
    <div class='form-group'>
      <label htmlFor={id}>
        {label}:
        <input type={type || 'text'} id={id} value={value} onChange={onChange} class="form-control" onBlur = {type ==='password' ? isPasswordsMatch : 'no'}/>
      </label>
    </div>
  )

}

export default Input