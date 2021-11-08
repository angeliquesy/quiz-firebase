import React from 'react';
import { Link } from 'react-router-dom'
import classes from './Button.css'

const Button = ({
  parentClass, type, to, onClick,
  disabled, ariaPressed, ariaLabel,
  children }) => {

  const cls = [
    classes.Button,
    classes[type]
  ]

  if (parentClass) {
    cls.push(parentClass)
  }

  const isLink = !!to

  return (
    !isLink
    ? <button
        onClick={onClick}
        className={cls.join(' ')}
        disabled={disabled}
        aria-pressed={ariaPressed}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    : <Link
        to={to}
        className={cls.join(' ')}
      >
        {children}
      </Link>
  )
}

export default Button
