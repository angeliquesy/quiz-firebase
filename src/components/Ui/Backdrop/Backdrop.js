import React from 'react'
import classes from './Backdrop.css'
import { CSSTransition } from 'react-transition-group'

const Backdrop = ({onClick, condition}) => (
  <CSSTransition
    in={condition}
    timeout={220}
    classNames={{
      enter: classes.BackdropEnter,
      enterActive: classes.BackdropEnterActive,
      exit: classes.BackdropExit,
    }}
    unmountOnExit
    mountOnEnter
  >
    <div className={classes.Backdrop} onClick={onClick}/>
  </CSSTransition>
)

export default Backdrop
