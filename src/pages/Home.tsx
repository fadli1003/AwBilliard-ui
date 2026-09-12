// import { useMemo } from 'react'
// const generateData = async () => {
// }
// const data = useMemo(() => generateData(), [])

import Title from "@/components/Title"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { baseAPI } from "@/utils/api";

const getRole = async () => {
  const res = await baseAPI.get('/user-role');
  console.log(res)
  return res?.data
}

const Home = () => {
  return (
    <div className="h-[200vh]">
      <Title/>
      <button onClick={() => getRole()}>get role</button>
      <ScrollToTop />
    </div>
  )
}

export default Home