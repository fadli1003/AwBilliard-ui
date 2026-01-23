import React,{ createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType{
  user: null | object
  setUser: Dispatch<SetStateAction<{}>>
  isLogin: boolean
  setIsLogin: ( value: boolean ) => void,
}

const AuthContext = createContext<ContextType>({
  user: null,
  setUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
})

export const AuthContextProvider = ({children}: { children: React.ReactNode}) => {
  const [user, setUser] = useState({})
  const [isLogin, _setIsLogin] = useState(false)
  const setIsLogin = (value: boolean) => {
    _setIsLogin(value)
    if(value === false){
      localStorage.removeItem('user')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isLogin,
      setIsLogin,
    }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuthContext must be used within AuthContextProvider')
  }
  return context
}
