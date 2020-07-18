import React from 'react'

const Input = ({label, id, value, onChange}) => {

  return (
    <div class='form-group'>
      <label htmlFor={id}>
        {label}:
        <input id={id} value={value} onChange={onChange} class="form-control"/>
      </label>
    </div>
  )

}

export default Input