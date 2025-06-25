
//import Cookie from 'js.cookie'
import { Outlet , Navigate } from "react-router-dom";
import { routes } from "./helper";
import { useSelector } from "react-redux";

const Protected  = () => {

  const role = useSelector(itm => itm?.authSlice?.role)
  
      console.log(role, "rolerole")

 // const isLogin = Cookie.get('token')
 const accessToken = useSelector(
   (state) => state?.authSlice?.user?.access_token
 );

   return accessToken ? <Outlet /> : <Navigate to={"/auth/login"} />;

}

export default Protected;