import React from 'react'
import classes from './Form.css'

const Form = ({ children, onSubmit, errorText, errorCondition }) => {
  children = children[0] ? children : children.props.children

  return (
    <form className={classes.Form} onSubmit={onSubmit}>

      {errorCondition && <p className={classes.Error}>{errorText}</p>}

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
