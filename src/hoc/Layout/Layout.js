import React, {useContext, useState} from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {AuthContext} from '../../context/auth/authContext'

function Layout({children}) {

  const {isAuthenticated} = useContext(AuthContext)

  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const menuCloseHandler = () => {
    setMenu(false)
  }


  return (
    <div className={classes.Layout}>

      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />

      <main>
        {children}
      </main>
    </div>
  )

}

export default Layout
