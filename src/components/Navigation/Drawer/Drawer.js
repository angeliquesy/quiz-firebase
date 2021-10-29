import React from "react";
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../Ui/Backdrop/Backdrop'

function Drawer({isOpen, isAuthenticated, onClose}) {

  const clickHandler = () => {
    onClose()
  }

  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  const cls = [classes.Drawer]

  if (!isOpen) {
    cls.push(classes.close)
  }

  const links = [
    {to: '/', label: 'Список', exact: true}
  ]

  if (isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
    links.push({to: '/logout', label: 'Выйти', exact: false})
  } else {
    links.push({to: '/auth', label: 'Авторизация', exact: false})
  }

  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose}/> : null}
    </React.Fragment>
  )
}

export default Drawer
