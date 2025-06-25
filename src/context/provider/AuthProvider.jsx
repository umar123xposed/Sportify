import { useContext, useState } from "react";
import  { AuthContext }  from "../AuthContext";



export const useAuth = () => {
    return  useContext(AuthContext)
}


const AuthProvider = ({children}) => {
    // globle state
    const [userAuth,setUserAuth] = useState(null)
    const [isLogin,setIsLogin] = useState(false)
    
    const values = {
        userAuth,
        setUserAuth,
        isLogin,
        setIsLogin

    }
 
   return(

    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
   )
} 

export default AuthProvider