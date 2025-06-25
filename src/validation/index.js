/*eslint-disable */
import * as yup from "yup";


export const sigupSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be 5 characters")
    .required("Please enter a username!"),
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format."
    )
    .required("Please enter a email!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a valid password!"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const changePasswordSchema = yup.object().shape({
 
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a valid password!"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be 5 characters")
    .required("Please enter a username!"),
  password: yup
    .string()
    .required("Please enter a password!"),
});

export const createProfileSchema = yup.object().shape({

  coach_role: yup
    .object()
    .nullable()
    .required("This field is required"),
  full_name: yup.string().required("Please enter a email!"),
  organization_name: yup.string().required("Please enter a email!"),
  phone: yup.string().required('Please enter your phone number.').test(
                                "isValidPhoneNumber",
                                "Enter a valid phone number",
                                (value) => {

                                    if (iti?.current && iti?.current?.isValidNumber()) {

                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            )
});


export const forgotPasswordSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be 5 characters")
    .required("Please enter your username!"),
});


export const newPasswordSchema = yup.object().shape({
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(10, "Password must not exceed 10 characters")
    .required("Please enter a valid password!"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const newPassSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must include at least one special character"
    )
    .required("Please enter a valid password!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const resetSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format."
    )
    .required("Please enter a email!"),
});

export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{4}$/, "OTP must be exactly 4 digits")
    .required("Please enter a valid OTP"),
});

export const uploadModelSchema = yup.object().shape({
  name: yup.string().required("Please enter a email"),
  category: yup.mixed().required("Please select a Category"),

    thumb: yup
    .mixed()
    .required("Please upload a Thumbnail Image"),
   status: yup.mixed().required("Please select a Status"),
 // height: yup.string().required("Required!"),
 // width: yup.string().required("Required!"),
 // depth: yup.string().required("Required!"),
  description: yup.string().required("Please Enter a Description"),
  tags: yup.array()
          .of(yup.string().required('Each tag is required'))
          .min(1, 'At least one tag is required')
        .max(10, 'You can only add up to 10 tags'),

 });


