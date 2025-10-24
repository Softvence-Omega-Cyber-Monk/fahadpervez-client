import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/Reuse/ScrollToTop'
import Layout from './Layout/Layout'

function App() {

  return (
    <>
    <Toaster position="top-center" />
    <ScrollToTop/>
     <Layout>
     </Layout>
    </>
  )
}

export default App
