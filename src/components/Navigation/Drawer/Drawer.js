import React from 'react'
import classes from './Drawer.css'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Backdrop from '../../Ui/Backdrop/Backdrop'

const Drawer = ({isOpen, isAuthenticated, onClose, isMobile}) => {

  const clickHandler = () => {
    onClose()
  }

  const renderLinks = links => {
    return links.map((link, index) => (
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
    )
  }

  const cls = [classes.Drawer]

  if (isMobile && !isOpen) {
    cls.push(classes.close)
  }

  const links = [
    {to: '/', label: 'Home', exact: true},
  ]

  if (isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Create a quiz', exact: false})
    links.push({to: '/#my-quizzes', label: '#My quizzes', hash: true, exact: true})
    links.push({to: '/about', label: 'About',  exact: false})
    links.push({to: '/logout', label: 'Sign out', icon: 'fa-sign-out',  exact: false})
  }
  else {
    links.push({to: '/about', label: 'About',  exact: false})
    links.push({to: '/auth', label: 'Sign in', exact: false, icon: 'fa-user-o'})
  }

  return (
    <React.Fragment>

      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>

      <Backdrop condition={isMobile && isOpen} onClick={onClose}/>

    </React.Fragment>
  )
}

export default Drawer
