// ** Authentications
/* eslint-disable */

import toast from "react-hot-toast";
//import { useContext } from "react";
//import { handleLogin } from "@store/authentication";
//import { getHomeRouteForLoggedInUser } from "@utils";
import { handleLogin, handleRole } from "../../redux/authSlice";
import { handlePackageType } from "../../redux/profileSlice";

// ** USER/ADMIN CRUD

export const SignUpOnSubmit = (value, signup, dispatch, handleLogin, navigate) => {
  console.log("myValue", value);

  signup({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.signup?.statusCode === 201) {
        console.log(response?.data?.signup, "asfasfsaf");
        dispatch(handleLogin(response?.data?.signup));
        //dispatch()

        toast.success(`${response?.data?.signup?.message}`, {
          theme: "dark",
        });

        navigate("/who-we-are")

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const loginOnSubmit = (value, login, dispatch, handleLogin, navigate) => {
  console.log("myValue", value);

  login({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.login?.statusCode === 200) {
        console.log(response?.data?.login, "asfasfsaf");
        dispatch(handleLogin(response?.data?.login));
        dispatch(handleRole(response?.data?.login.data?.role?.name));

        toast.success(`${response?.data?.login?.message}`, {
          theme: "dark",
        });

        console.log("name", response?.data?.login?.data?.role?.name)

        // Check if role exists and has a name
        if (!response?.data?.login?.data?.role?.name) {
          navigate("/who-we-are");
          return;
        }

        // Now check the role name
        if (response?.data?.login.data?.role?.name === "Coach" || response?.data?.login.data?.role?.name === "Head") {
          navigate("/coach");
          return;
        }

        if (response?.data?.login.data?.role.name == "Recruiter") {

            dispatch(
              handlePackageType(
                response?.data?.login?.data?.package_details?.qr_type
              )
            );
          if(response?.data?.login?.data?.profile_complete && response?.data?.login?.data?.isPayment){

                navigate("/recruiter/")

              }else if(response?.data?.login?.data?.profile_complete){
                navigate("/recruiter/select-category-recruit")

              }else {
                navigate("/recruiter/create-profile");
              }





        }


        if (response?.data?.login?.data.role.name === "Parent") {


          if (response?.data?.login?.data.profile_complete == true) {



            if (response?.data?.login?.data.has_player == true) {
              console.log(response?.data?.login?.data.role.name, "response?.data?.login?.data.role.name")
              navigate("/parent");
            } else {
              console.log(response?.data?.login?.data.has_player)
              navigate("/select-child");

            }


            return

          } else {
            navigate("/select-child");
            return
          }
        }

        if (response?.data?.login?.data.role.name == "Athlete" || response?.data?.login?.data.role.name == "Athletes") {
          if (response?.data?.login?.data?.profile_complete == true) {
            navigate("/athletes/");
            return;
          } else {
            navigate("/select-type");
            return;
          }
        }





      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
}


export const logoutOnSubmit = (
  value,
  logout,
  dispatch,
  handleLogout,
  navigate,
  handleClearProfile
) => {
  console.log("myValue", value);

  logout({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.logout?.statusCode === 200) {
        //  console.log(response?.data?.logout, "asfasfsaf");
        dispatch(handleLogout());
        dispatch(handleClearProfile())
        navigate("/auth/login");
        toast.success(`${response?.data?.logout?.message}`, {
          theme: "dark",
        });
        // navigate("/who-we-are");
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const CompeleteProfileUpOnSubmit = (
  value,
  completeProfile,
  navigate,
  handleClearProfiles,
  dispatch
) => {
  console.log("myValue", value);

  completeProfile({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.completeProfile?.statusCode === 200) {
        console.log(response?.data?.completeProfile, "asfasfsaf");


        toast.success(`${response?.data?.completeProfile?.message}`, {
          theme: "dark",
        });
        console.log(response?.data?.completeProfile?.data, 'oyeeee');
        if (

          response?.data?.completeProfile?.data.role.name == "Coach"
        ) {
          navigate("/coach/");
        }

        if (response?.data?.completeProfile?.data.role.name == "Recruiter") {


            navigate("/recruiter/select-category-recruit");



        }

        if (response?.data?.completeProfile?.data.role.name == "Parent") {

          if (response?.data?.completeProfile?.data?.has_player) {
            navigate("/parent/");
          } else {
            navigate("/parent/select-child");
          }

          dispatch(handleClearProfiles());
        }

        if (
          response?.data?.completeProfile?.data.role.name == "Athlete" ||
          response?.data?.completeProfile?.data.role.name == "Athletes"
        ) {
          dispatch(handleRole("Athlete"));
          navigate("/athlete/select-type");
          dispatch(handleClearProfiles());
        }

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const CreateTeamOnSubmit = (
  value,
  image,
  createTeam,
  setValue,
  handleReset,
  navigate

) => {
  console.log("myValue", value);

  createTeam({
    variables: {
      logo: image,
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.createTeam?.statusCode === 201) {
        console.log(response?.data?.createTeam, "asfasfsaf");

        toast.success(`${response?.data?.createTeam?.message}`, {
          theme: "dark",
        });
        setValue("name", "");
        setValue("image", null);
        navigate("/coach/team-details");
        handleReset();
        console.log(response?.data?.createTeam?.data, "oyeeee");
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const UpdateTeamOnSubmit = (
  value,
  image,
  updateTeam,
  setValue,
  handleReset,
  navigate
) => {
  console.log("myValue", value);

  updateTeam({
    variables: {
      logo: image || null,
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.updateTeam?.statusCode === 200) {
        console.log(response?.data?.updateTeam, "asfasfsaf");

        toast.success(`${response?.data?.updateTeam?.message}`, {
          theme: "dark",
        });
        setValue("name", "");
        setValue("image", null);
        // navigate("/coach/teams");
        handleReset();
        //console.log(response?.data?.createTeam?.data, "oyeeee");
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const CreatechildOnSubmit = (value, createChildAccount, navigate, role, handleClearProfiles,
  dispatch) => {
  console.log("myValue", value);

  createChildAccount({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.createChildAccount?.statusCode === 201) {

        toast.success(`${response?.data?.createChildAccount?.message}`, {
          theme: "dark",
        });

        if (role == "Parent") {
          navigate("/parent/");
        }

        dispatch(handleClearProfiles());

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const UpdatechildOnSubmit = (
  value,
  updateChildAccount,
  navigate,
  role,
  handleClearProfiles,
  dispatch
) => {
  console.log("myValue", value);

  updateChildAccount({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.updateChildAccount?.statusCode === 200) {
        toast.success(`${response?.data?.updateChildAccount?.message}`, {
          theme: "dark",
        });

        if (role == "Parent") {
          navigate("/parent/");
        }
        if (role == "Athletes" || role == "Athlete") {
          navigate("/athletes/");
        }
        dispatch(handleClearProfiles());
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const PurchaseQrCodeOnSubmit = (value, createCodePurchase, navigate, role, Count) => {
  console.log("myValue", value);

  createCodePurchase({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response?.data?.createCodePurchase);
      if (response?.data?.createCodePurchase?.statusCode === 201) {
        toast.success(`${response?.data?.createCodePurchase?.message}`, {
          theme: "dark",
        });
        // console.log()
        if (role == "Parent") {
          navigate("/payment", { state: response?.data?.createCodePurchase?.data }
          );
          Count(3);
        }

        if (role == "Athletes" || role == "Athlete") {
          navigate("/payment", {
            state: response?.data?.createCodePurchase?.data,
          });
          Count(3);
        }
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  // navigate(routes.OTP);
};

export const UpdateChildOnSubmit = (value, updateChildProfile, setState, refetch, refetchPlayers) => {
  console.log("myValue", value);

  updateChildProfile({
    variables: {
      input: value,
    },

  })
    .then((response) => {
      console.log("whas", response?.data?.updateChildProfile);
      if (response?.data?.updateProfile?.statusCode === 200) {
        toast.success(`${response?.data?.updateProfile?.message}`, {
          theme: "dark",
        });
        setState(false)
        refetch()
        refetchPlayers()
        // console.log()

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const UpdateChildSportOnSubmit = (value, updateChildProfile) => {
  console.log("myValue", value);

  updateChildProfile({
    variables: {
      input: value,
    },

  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.updateSportsProfile?.statusCode === 200) {
        toast.success(`${response?.data?.updateSportsProfile?.message}`, {
          theme: "dark",
        });
        setState(false)
        refetch()
        refetchPlayers()
        // console.log()

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const UpdateStatusNotificationOnSubmit = (
  value,
  acceptRejectInvite,
  setSucc,
  refetch1
) => {
  console.log("myValue", value);

  acceptRejectInvite({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response?.data?.acceptRejectInvite);
      if (response?.data?.acceptRejectInvite?.statusCode === 200) {
        toast.success(`${response?.data?.acceptRejectInvite?.message}`, {
          theme: "dark",
        });
        setSucc(true);
        refetch1()
        // console.log()
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const UpdateParentOnSubmit = (value, updateProfile, setState, refetch, setPreview) => {
  console.log("myValue", value);

  updateProfile({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response?.data?.updateProfile);
      if (response?.data?.updateProfile?.statusCode === 200) {
        toast.success(`${response?.data?.updateProfile?.message}`, {
          theme: "dark",
        });
        setState(false);
        refetch();

        setValue("full_name", "");
        setValue("phone", "");

        setPreview(null)
        // console.log()
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const ContactFormOnSubmit = (value, contactform, setValue) => {
  console.log("myValue", value);

  contactform({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response?.data?.contactform);
      if (response?.data?.contactform?.statusCode === 200) {
        toast.success(`${response?.data?.contactform?.message}`, {
          theme: "dark",
        });
        setValue("full_name", "");
        setValue("subject", "");
        setValue("description", "");
        // console.log()
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const SendinviteOnSubmit = (id, sendInvite, refetch) => {


  sendInvite({
    variables: {
      sendInviteId: id

    }
  })
    .then((response) => {
      console.log("whas", response);
      if (response?.data?.sendInvite?.statusCode === 200) {
        toast.success(`${response?.data?.sendInvite?.message}`, {
          theme: "dark",
        });
        refetch()
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};


export const ResetOnSubmit = (value, forgetPassword, navigate) => {
  console.log("myValue", value);
  const userReset = {
    email: value?.email,
  };

  forgetPassword({
    variables: {
      input: userReset,
    },
  })
    .then((response) => {

      console.log("whas", response);
      if (response?.data?.requestPassowrd?.statusCode === 200) {
        console.log(response?.data?.requestPassowrd, 'asfasfsaf');
        toast.success(`${response?.data?.requestPassowrd?.message}`, {
          theme: "dark",
        });
        localStorage.setItem("verifyEmail", value?.email);
        navigate("/otp-verify");
      }


    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};

export const VerfyOnSubmit = (value, verifyCode, navigate) => {
  console.log("myValue", value);

  verifyCode({
    variables: {
      input: value,
    },
  })
    .then((response) => {

      if (response?.data?.requestVerify?.statusCode === 200) {
        console.log(response?.data?.requestVerify, 'asfasfsaf');

        toast.success(`${response?.data?.requestVerify?.message}`, {
          theme: "dark",
        });
        // localStorage.setItem("verifyEmail", value?.email);
        // navigate("/otp-verify");
        navigate("/reset-password");
      }


      // navigate('/reset-password');
    })
    .catch((error) => {
      // Check if the error has a response and a status code
      console.log(error, 'wasfasf')
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};


export const NewPasswordOnSubmit = (value, resetPassword, navigate) => {
  console.log("myValue", value);


  resetPassword({
    variables: {
      input: value,
    },
  })
    .then((response) => {

      if (response?.data?.resestPassword?.statusCode === 200) {
        console.log(response?.data?.resestPassword, "asfasfsaf");

        toast.success(`${response?.data?.resestPassword?.message}`, {
          theme: "dark",
        });
        localStorage.removeItem("verifyEmail");
        navigate("/login");
      }

    })
    .catch((error) => {
      // Check if the error has a response and a status code
      console.log(error, "wasfasf");
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

};

export const RefreshTokenOnSubmit = (value, refresh) => {
  console.log("myValue", value);

  refresh({
    variables: {
      refreshToken: value,
    },
  })
    .then((response) => {
      if (response?.data?.refresh?.statusCode === 200) {
        console.log(response?.data?.refresh, "asfasfsaf");

        toast.success(`${response?.data?.refresh?.message}`, {
          theme: "dark",
        });

      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code
      console.log(error, "wasfasf");
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });
};

export const orderPlaceSubmit = (
  value,
  orderPlaceSubmit,
  navigate,
  setModal,
  userRole
) => {
  console.log("myValue", value);

  orderPlaceSubmit({
    variables: {
      input: value,
    },
  })
    .then((response) => {
      console.log("whas", response?.data?.createVendorOrder);
      if (response?.data?.createVendorOrder?.statusCode === 201) {
        toast.success(`${response?.data?.createVendorOrder?.message}`, {
          theme: "dark",
        });
        setModal(false);
        if (userRole == "Parent") {
          navigate("/Parent/");
        }
        if (userRole == "Athlete" || userRole == "Athletes") {
          navigate("/athletes/");
        }
        // console.log()
      }
    })
    .catch((error) => {
      // Check if the error has a response and a status code

      if (error.response && error.response.status === 400) {
        // Handle 400 B ad Request
        toast.error("Bad Request: Please check your input and try again.", {
          theme: "dark",
        });
      }
      console.log(error, "error");
    });

  //navigate(routes.OTP);
};


// ** CHANNEL & CATEGORY
