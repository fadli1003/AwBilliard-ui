import React,{ createContext, useContext, useState } from "react";

interface ContextType{
  user: UserType | null
  setUser: (user: UserType) => void
  isLogin: boolean
  setIsLogin: ( value: boolean ) => void,
}

const AuthContext = createContext<ContextType | null>(null)

export const AuthContextProvider = ({children}: { children: React.ReactNode}) => {
  const [user, _setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })
  const [isLogin, setIsLogin] = useState(!!user)

  const setUser = (authUser: UserType) => {
    localStorage.setItem('user', JSON.stringify(authUser))
    _setUser(authUser)
    setIsLogin(true)
  }

  // const setIsLogin = (value: boolean) => {
  //   _setIsLogin(value)
  //   if(value === false){
  //     localStorage.removeItem('user')
  //   }
  // }

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
