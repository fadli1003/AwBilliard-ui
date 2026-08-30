import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

const ScrollToTop = () => {
  const [isInvisible, setIsInvisible] = useState(true)

  useEffect(() => {
    const toggleInvisibility = () => {
      if(window.scrollY > 300) setIsInvisible(false)
      else setIsInvisible(true)
    }
      window.addEventListener("scroll", toggleInvisibility)

      return () => window.removeEventListener("scroll", toggleInvisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className="fixed right-5 bottom-5 animate-pulse">
      { !isInvisible &&  <ChevronUp className="bg-violet-600 size-10 p-2 rounded-xs" onClick={scrollToTop} /> }
    </div>
  )
}

export default ScrollToTop