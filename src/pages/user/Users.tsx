import { fetchAllUser } from '@/utils/api';
import { PenBox, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllUser().then(data => setUsers(data)).finally(() => setLoading(false))
  }, [])

  if(loading){ return <div className="w-full h-screen flex items-center justify-center">Loading...</div>}
  
  return (
    <div className="w-full ">
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
  )
}

export default Users