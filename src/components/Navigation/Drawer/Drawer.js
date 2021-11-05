import React from "react";
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../Ui/Backdrop/Backdrop'
import {HashLink} from 'react-router-hash-link'

function Drawer({isOpen, isAuthenticated, onClose, isMobile}) {

  const clickHandler = () => {
    onClose()
  }

  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          {
            !link.hash
            ? <NavLink
                to={link.to}
                exact={link.exact}
                activeClassName={classes.active}
                onClick={clickHandler}
              >
                {link.label}
                {link.icon && <i className={`fa ${link.icon}`}/>}
              </NavLink>
              : <HashLink to={link.to} smooth onClick={clickHandler}>{link.label}</HashLink>
          }


        </li>
      )
    })
  }

  const cls = [classes.Drawer]

  if (isMobile && !isOpen) {
    cls.push(classes.close)
  }

  const links = [
    {to: '/', label: 'Main', exact: true}
  ]

  if (isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Create a quiz', exact: false})
    links.push({to: '/#my-quizzes', label: '#My quizzes', hash: true, exact: true})
    links.push({to: '/logout', label: 'Sign out', exact: false, icon: 'fa-sign-out'})

  } else {
    links.push({to: '/auth', label: 'Sign in', exact: false, icon: 'fa-user-o'})
  }

  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {isMobile && isOpen ? <Backdrop onClick={onClose}/> : null}
    </React.Fragment>
  )
}

export default Drawer
