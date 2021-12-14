import React, { useRef, useEffect, useState } from 'react'
import classes from './Form.css'

const Form = ({ children, onSubmit, errorText, errorCondition }) => {
  children = children[0] ? children : children.props.children

  const errorRef = useRef(null)
  const count = useRef({})
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!errorRef.current) return
    if (!count.current[errorText]) {
      count.current[errorText] = errorRef.current.scrollHeight
    }

    setHeight(count.current[errorText])
  }, [errorText])

  return (
    <form className={classes.Form} onSubmit={onSubmit}>

      <p
        className={errorCondition ? classes.Error + ' ' + classes.active : classes.Error}
        ref={errorRef}
        style={count.current[errorText] && errorCondition ? {height: `${height}px`} : null}
      >
        {errorText}
      </p>

      <div className={classes.Fieldset}>
        {children[0]}
      </div>

    <div className={classes.Footer + (children[0].props.children.length ? '' : ` ${classes.FooterHigher}`)}>
      {children[1]}
    </div>

    </form>
  )
}

export default Form;
