import React from 'react'
import classes from './Input.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const { type = 'text', label, innerRef, value, onChange, errorMessage } = props

  const cls = [classes.Input]
  const htmlFor = `${type}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        ref={innerRef}
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />

      {
        isInvalid(props)
          ? <span>{errorMessage || 'Введите верное значение'}</span>
          : null
      }

    </div>
  )
}

export default Input
