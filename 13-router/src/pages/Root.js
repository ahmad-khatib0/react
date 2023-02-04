import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'
import classes from './Root.module.css'

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        {/*  child routes will be rendered here  */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
