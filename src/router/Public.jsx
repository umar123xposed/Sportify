import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Public = () => {
    const role = useSelector((state) => state?.authSlice?.role);
    const user = useSelector((state) => state?.authSlice?.user);

    console.log(user, "rolerole");

    if (!user?.access_token) {
        return <Outlet />;
    }

    if (role === "Parent") {
        if (user?.data?.has_player) {
            return <Navigate to="/parent" />;
        } else {
            return <Navigate to="/parent/select-child" />;
        }
    }

    if (role === "Athlete") {
        if (user?.data?.profile_complete) {
            if (user?.data?.has_profile) {
                return <Navigate to="/athlete" />;
            } else {
                return <Navigate to="/athlete/select-type" />;
            }
        } else {
            return <Navigate to="/who-we-are" />;
        }
    }

    if (role === "Coach") {
        if (user?.data?.profile_complete) {
            if (user?.data?.meta?.meta?.coach_role === "Assistant") {
                return <Navigate to="/coach" />;
            }

            if(user?.data?.meta?.meta?.coach_role === "Head" && user?.data?.isPayment && user?.data?.has_team){
                return <Navigate to="/coach" />;
            }
            else if(user?.data?.meta?.meta?.coach_role === "Head" && user?.data?.isPayment && user?.data?.has_team===false){
                return <Navigate to="/coach/create-coach-profile" />;
            }
            else{
                return <Navigate to="/coach/select-organization" />;
            }

        } else {
            return <Navigate to="/who-we-are" />;
        }
    }

    if (role === "Recruiter") {
        if (user?.data?.profile_complete && user?.data?.isPayment) {
          return <Navigate to="/recruiter/" />;
        } else if (user?.data?.profile_complete) {
            return <Navigate to="/recruiter/select-category-recruit" />;
        } else {
            return <Navigate to="/recruiter/create-profile" />;
        }

    }

    return <Navigate to="/who-we-are" />;
};

export default Public;
