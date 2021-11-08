import React, {useContext, useState} from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { AuthContext } from '../../context/auth/authContext'
import useIsMobile from '../../hooks/useIsMobile'

function Layout({children}) {
  const isMobile = useIsMobile()
  const { isAuthenticated } = useContext(AuthContext)
  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const menuCloseHandler = () => {
    setMenu(false)
  }

  return (
    <div className={classes.Layout}>
      <header>
        <Drawer
          isOpen={menu}
          onClose={menuCloseHandler}
          isAuthenticated={isAuthenticated}
          isMobile={isMobile}
        />

        {
          isMobile &&
          <MenuToggle
            onToggle={toggleMenuHandler}
            isOpen={menu}
          />
        }
      </header>

      <main>
        {children}
      </main>
    </div>
  )

}

export default Layout
