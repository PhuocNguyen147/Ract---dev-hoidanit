import './component/todo/todo.css'

import Header from './component/layout/header'
import Footer from './component/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './service/api.service'
import { useContext, useEffect } from 'react'
import { AuthContext } from './component/context/auth.context'
import { Spin } from 'antd'
const App = () => {

  const { setUser, isAppLoading, setIAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo()
  }, [])
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user)
      console.log(res.data)

    }
    setIAppLoading(false)
  }

  return (
    <>
      {
        isAppLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate (-50% ,-50%",

          }}>
            <Spin size="large" />

          </div>

          :
          <>
            <Header />
            <Outlet />

            <Footer />
          </>
      }


    </>

  )
}

export default App
