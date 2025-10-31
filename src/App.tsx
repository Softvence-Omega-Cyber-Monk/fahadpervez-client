import { Toaster } from 'react-hot-toast'
// import ScrollToTop from './components/Reuse/ScrollToTop'
import Layout from './Layout/Layout'
import { useGetMeQuery } from './Redux/Features/auth/auth.api'
import { SocketProvider } from './contexts/SocketProvider'

function App() {
  const { data: userData } = useGetMeQuery({})
  console.log(userData)
  const user = userData?.data
  return (
    <>
      {user ?
        <SocketProvider userId={user._id} userType={user.role === 'VENDOR' ? 'VENDOR' : 'CUSTOMER'} >
          <Toaster position="top-center" />
          {/* <ScrollToTop /> */}
          <Layout>
          </Layout>
        </SocketProvider>
        :
        <div>
          <Toaster position="top-center" />
          {/* <ScrollToTop /> */}
          <Layout>
          </Layout>
        </div>
      }

    </>
  )
}

export default App
