import React, {useState} from 'react'
import classes from './Fav.css'
import Button from '../Button/Button'

const Fav = props => {
  const [active, setActive] = useState(props.active)
  const cls = ['fa']

  if (active) {
    cls.push('fa-star')
  }
  else {
    cls.push('fa-star-o')
  }

  return (
    <Button type='icon' parentClass={classes.Fav} onClick={() => setActive(prev => !prev)}>
      <i className={cls.join(' ')}/>
    </Button>
  )
}

export default Fav
