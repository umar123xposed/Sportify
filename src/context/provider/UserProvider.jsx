import { useContext, useState } from "react";
import  { CreateUserContext }  from "../AuthContext";



export const useUser = () => {
    return  useContext(CreateUserContext)
}


const UserProvider = ({children}) => {
    // globle state
    const [users,setUsers] = useState([{
        email: "hammad.urrehman@mmcgbl.com",
        password: "12345678"
    } ])
   // const [isLogin,setIsLogin] = useState(false)
    
    const values = {
        users,
        setUsers
    }
 
   return(

    <CreateUserContext.Provider value={values}>
        {children}
    </CreateUserContext.Provider>
   )
} 

export default UserProvider