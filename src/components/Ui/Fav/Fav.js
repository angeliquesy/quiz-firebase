import React, { useState } from 'react'
import classes from './Fav.css'
import Button from '../Button/Button'

const Fav = ({ parentClass, active, disabled, onClick, icon = 'star' }) => {

  const [isActive, setIsActive] = useState(active)

  const clickHandler = () => {
    setIsActive(prev => !prev)
    onClick()
  }

  return (
    <Button
      type='icon'
      disabled={disabled}
      parentClass={parentClass ? parentClass + ' ' + classes.Fav : classes.Fav}
      onClick={clickHandler}
      ariaPressed={isActive}
      ariaLabel={isActive ? 'Remove from favorites' : 'Add to favorites'}
    >
      <i className={`fa fa-${icon}-o`}/>
      <i className={`fa fa-${icon}`}/>
    </Button>
  )
}

export default Fav
