// import { useMemo } from 'react'
// const generateData = async () => {
// }
// const data = useMemo(() => generateData(), [])

import Title from "@/components/Title"
import ScrollToTop from "@/components/ui/ScrollToTop"

const Home = () => {
  return (
    <div className="h-[200vh]">
      <Title/>
      Home
      <ScrollToTop />
    </div>
  )
}

export default Home