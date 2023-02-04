import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        {/*  child routes will be rendered here  */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
