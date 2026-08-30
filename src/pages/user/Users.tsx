import { baseAPI, fetchAllUser } from '@/utils/api';
import { PenBox, PlusCircle, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')

  const searchUser = async () => {
    const res = await baseAPI.get(`/users?${searchQuery}`)
    setUsers(res.data.data)
    
  }

  useEffect(() => {
    fetchAllUser().then(data => setUsers(data)).finally(() => setLoading(false))
    if(searchQuery) searchUser()
  }, [])

  if(loading){ return <div className="w-full h-screen flex items-center justify-center">Loading...</div>}
  
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center px-7 py-5.5 border border-gray-200 dark:border-gray-800 rounded-md mb-3">
        <h1 className="text-2xl font-bold">Users List</h1>
        <Link to={'/users/create'} className="flex items-center gap-4 px-5.5 py-2.25 bg-neutral-950 dark:bg-blue-100 text-white dark:text-black rounded-md">
          Create New User
          <PlusCircle />
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <div className="flex relative items-center w-60 border rounded-full">
            <input name="search" onChange={e => setSearchQuery(e.target.value)} className="border-r dark:border-neutral-700 focus:outline-0 py-1.5 px-4 w-[85%]" placeholder="Search user..." />
            <Search onClick={() => searchUser()} className="absolute right-1.75"/>
          </div>
        </div>

        <div className="items-center w-full overflow-hidden bg-blue-200 dark:bg-gray-950 rounded-xl border border-blue-600">
          <table className="overflow-x-auto w-full">
            <thead>
              <tr className="items-center border-b border-blue-600">
                <td className="px-6 py-2 w-5 border-r border-neutral-900">No</td>
                <td className="px-6 py-2">Name</td>
                <td className="px-6 py-2">Email</td>
                <td className="px-6 py-2">Phone</td>
                <td className="px-6 py-2">Active Booked</td>
                <td className="px-6 py-2 text-center">Action</td>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users.map((user, i ) => (
                  <tr key={i}>
                    <td className="py-2.25 px-4 text-blue-300 items-center text-center">
                      {i+1}
                    </td>
                    <td className="py-2.25 px-4 text-blue-300 items-center">
                      {user.name}
                    </td>
                    <td className="py-2.25 px-4 text-blue-300 items-center">
                      {user.email}
                    </td>
                    <td className="py-2.25 px-4 text-blue-300 items-center font-light">
                      <a href={`https://whatapps.com/chat`}>
                        {user.phone}
                      </a>
                    </td>
                    <td className="py-2.25 px-4 text-blue-300 items-center font-light">
                      <a href={`https://whatapps.com/chat`}>
                        {user.activeBooked === true ? (<span>active</span>) : <span className="border border-red-500 bg-red-200 text-red-600">0</span>}
                      </a>
                    </td>
                    <td className="py-2.25 px-4 text-blue-300 flex items-center justify-center gap-4">
                      <PenBox className="text-white size-6 cursor-pointer" />
                      <Trash2 className="text-red-600 size-6 cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : ( 
                <tr>
                  <td className="py-2.75 px-4 text-center" colSpan={6}>
                    There's no user yet.
                  </td>
                </tr>
              )} 
            </tbody>
          </table>
        </div>      
      </div>
    </div>
  )
}

export default Users