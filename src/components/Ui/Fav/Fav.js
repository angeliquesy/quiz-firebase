import React, {useState} from 'react'
import classes from './Fav.css'
import Button from '../Button/Button'

const Fav = props => {
  const [active, setActive] = useState(props.active)
  const cls = ['fa']
  const icon = props.icon || 'star'

  if (active) {
    cls.push(`fa-${icon}`)
  }
  else {
    cls.push(`fa-${icon}-o`)
  }

  const clickHandler = () => {
    setActive(prev => !prev)
    props.onClick()
  }

  return (
    <Button
      type='icon'
      disabled={props.disabled}
      parentClass={props.parentClass ? props.parentClass + ' ' + classes.Fav : classes.Fav}
      onClick={clickHandler}
      ariaPressed={active}
      ariaLabel={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <i className={cls.join(' ')}/>
    </Button>
  )
}

export default Fav
