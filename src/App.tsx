import { Toaster } from 'react-hot-toast'
// import ScrollToTop from './components/Reuse/ScrollToTop'
import Layout from './Layout/Layout'
import { useGetMeQuery } from './Redux/Features/auth/auth.api'
import { SocketProvider } from './contexts/SocketProvider'
import ScrollToTopButton from './common/ScrollToTop'
import ScrollToTopOnMount from './common/ScrollToTopOnMount'

function App() {
  const { data: userData } = useGetMeQuery({})
  const user = userData?.data
  return (
    <>
    <ScrollToTopOnMount/>
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
    <div className="fixed border size-20">
        <ScrollToTopButton/>
        </div>
    </>
  )
}

export default App
