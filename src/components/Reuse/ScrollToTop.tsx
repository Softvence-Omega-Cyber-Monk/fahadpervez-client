import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // 👈 if you want instant scroll, change to: "auto"
    })
  }, [pathname])

  return null
}

export default ScrollToTop
