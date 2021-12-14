import React, { useRef } from 'react'
import classes from './Input.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const { parentClass, type = 'text', label, autofocus, innerRef, value, onChange, errorMessage } = props

  const invalid= isInvalid(props)
  const errorRef = useRef(null)

  const cls = [classes.Input]
  const htmlFor = `${type}-${Math.random()}`

  if (parentClass) cls.push(parentClass)

  if (invalid) {
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
        autoFocus={autofocus}
        onChange={onChange}
      />

      <span
        className={invalid ? classes.Error + ' ' + classes.active : classes.Error}
        ref={errorRef}
        style={invalid ? {height: `${errorRef.current.scrollHeight}px`} : null}
      >
        {errorMessage || 'Enter correct value'}
      </span>

    </div>
  )
}

export default Input
