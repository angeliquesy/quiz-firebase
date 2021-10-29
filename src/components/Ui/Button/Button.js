import React from "react";
import {Link} from 'react-router-dom'
import classes from './Button.css'

const Button = props => {
  const cls = [
    classes.Button,
    classes[props.type]
  ]

  if (props.parentClass) {
    cls.push(props.parentClass)
  }

  const isLink = !!props.to

  return (
    !isLink
    ? <button
        onClick={props.onClick}
        className={cls.join(' ')}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    : <Link
        to={props.to}
        className={cls.join(' ')}
      >
        {props.children}
      </Link>
  )
}
export default Button
