import React from 'react'

const Input = ({label, id, value, onChange, type}) => {

  return (
    <div class='form-group'>
      <label htmlFor={id}>
        {label}:
        <input type={type || 'text'} id={id} value={value} onChange={onChange} class="form-control"/>
      </label>
    </div>
  )

}

export default Input