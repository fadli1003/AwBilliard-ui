import React,{ createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType{
  user: null | object
  setUser: Dispatch<SetStateAction<{}>>
  isLogin: boolean
  setIsLogin: ( value: boolean ) => void
}

const authContext = createContext<ContextType>({
  user: null,
  setUser: () => {},
  isLogin: false,
  setIsLogin: () => {}
})

export const AuthContextProvider = ({children}: { children: React.ReactNode}) => {
  const [user, setUser] = useState({})
  const [isLogin, _setIsLogin] = useState(false)
  const setIsLogin = (value: boolean) => _setIsLogin(value)

  return (
    <authContext.Provider value={{
      user,
      setUser,
      isLogin,
      setIsLogin
    }}>{children}</authContext.Provider>
  )
}

export const useAuthContext = () => useContext(authContext)