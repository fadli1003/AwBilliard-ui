import React,{ createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType{
  user: null | object
  token: string | null
  setToken?: (token: string) => void
  setUser?: Dispatch<SetStateAction<{}>>

}

const stateContext = createContext<ContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {}
})

export const ContextProvider = ({children}: { children: React.ReactNode}) => {
  const [user, setUser] = useState({})
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

  const setToken = (token: string) => {
    _setToken(token)
    if(token){
      localStorage.setItem('ACCESS_TOKEN', token)
    }else{
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <stateContext.Provider value={{
      user,
      token,
      setToken,
      setUser
    }}>{children}</stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext)