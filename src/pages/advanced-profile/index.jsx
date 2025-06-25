import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import twitter from "./../../assets/twitter.png";
import insta from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";
import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleClearProfiles, handleCreateBasicProfile } from "../../redux/profileSlice";
import { width } from "@mui/system";
import { useLazyQuery } from "@apollo/client";
import { CHECK_USERNAME, Get_User_Detail } from "../../graphql/query/query";

export default function AdvancedProfile() {

  const [User_Detail] = useLazyQuery(Get_User_Detail)

  const [searchParams] = useSearchParams()

  const { state } = useLocation()

  //  {
  //         "height": {
  //           "feet": null,
  //           "inches": null
  //         }

  const draft = useSelector(
    (state) => state?.profileSlice?.profile?.basicProfile
  );

  
  const [checkUsername, { data: usernameData, loading: usernameLoading }] = useLazyQuery(CHECK_USERNAME);
  const newData1 = useSelector((state) => state?.authSlice?.user?.data);

  console.log(draft)
  const [startDate, setStartDate] = useState(new Date());
  const [imageBase64Profile, setImageBase64Profile] = useState(
    draft?.picture || null
  );
  const [userData, setUserData] = useState()

  console.log(state, "what is state")
  const today = new Date();
  const minAllowedDate = new Date();
  minAllowedDate.setFullYear(today.getFullYear() - 18);

  const phoneInputRef = useRef(null);
  const [preview, setPreview] = useState(draft?.picture || null)
  const iti = useRef(null);
  const navigate = useNavigate()


  useEffect(() => {
    if (phoneInputRef && phoneInputRef.current) {
      // Initialize the intl-tel-input plugin
      // console.log(phoneInputRef.current, window)
      iti.current = window?.intlTelInput(phoneInputRef.current, {
        initialCountry: "us",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Required script for validation
      });
    }

    return () => {
      if (iti.current) {
        iti.current.destroy(); // Clean up the intl-tel-input instance when the component unmounts
      }
    };
  }, []);

  const [selectedOption, setSelectedOption] = useState(""); // State for radio
  const role = useSelector((state) => state.authSlice?.role);
  const floatOrPositiveIntegerValidation = (value) => {
    if (value === undefined || value === null) return true; // Allow empty values for required to handle
    if (typeof value !== "number" || value <= 0) return false; // Must be a positive number
    return /^\d+(\.\d+)?$/.test(value.toString()); // Allows integers and float values (e.g., 1, 1.0, 2.5)
  };
  const schemaParent = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value)),
    // guardian_name: yup.string().required("Guardian name is required"),
    feet: yup.object().nullable().required("required."),
    inches: yup.object().nullable().required("required"),
    // dominant_hand: yup.string().required("required."),
    weight: yup
      .number()
      .typeError("Please enter a valid number")
      .test(
        "float-or-integer",
        "Please enter a positive integer or float value",
        (value) => floatOrPositiveIntegerValidation(value)
      )
      .max(999, "Maximum allowed value is 999")
      .required("Weight is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be atleast 5 characters"),
    bio: yup
      .string()
      .required("Bio is required"),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email"
      )
      .required("Email is required"),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
        return iti?.current?.isValidNumber() ?? false;
      }),
    insta: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    twi: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    iml: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    tik: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    you: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    dob: yup
      .date()
      .nullable()
      .required("Date of Birth is required"),
    // .max(minAllowedDate, "You must be at least 18 years old"),
    gender: yup.string().required("Gender is required"),
    twitter: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    instagram: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    imlca: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          )
        );
      })
      .test("fileSize", "File size must be less than 2MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB limit
      }),
  });


  const schema = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
    ,
    //  guardian_name: yup.string().required("Guardian name is required"),
    feet: yup.object().nullable().required("Feet required."),
    inches: yup.object().nullable().required("Inches required."),
    // dominant_hand: yup.string().required("required."),
    weight: yup
      .number()
      .typeError("Please enter a valid number")
      .test(
        "float-or-integer",
        "Please enter a positive integer or float value",
        (value) => floatOrPositiveIntegerValidation(value)
      )
      .max(999, "Maximum allowed value is 999")
      .required("Weight is required"),

    //email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test(
        "isValidPhoneNumber",
        "Enter a valid phone number",
        function (value) {
          return iti?.current?.isValidNumber() ?? false;
        }
      ),
    insta: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    twi: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    iml: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    tik: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    you: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    dob: yup
      .date()
      .nullable()
      .required("Date of Birth is required"),
      // .max(minAllowedDate, "You must be at least 18 years old"),
    gender: yup.string().required("Gender is required"),
    twitter: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    instagram: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    imlca: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          )
        );
      })
      .test("fileSize", "File size must be less than 2MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB limit
      }),
  });


  const schemaChildUpdate = yup.object().shape({
    full_name: yup
      .string()
      .min(4, "At least 4 Characters required")
      .required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
    ,
    //  guardian_name: yup
    //  .string()
    //   .min(4, "At least 4 Characters required")
    //   .required("Guardian name is required"),
    feet: yup.object().nullable().required("Feet required."),
    inches: yup.object().nullable().required("Inches required."),

    weight: yup
      .number()
      .typeError("Please enter a valid number")
      .test(
        "float-or-integer",
        "Please enter a positive integer or float value",
        (value) => floatOrPositiveIntegerValidation(value)
      )
      .max(999, "Maximum allowed value is 999")
      .required("Weight is required"),

    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email"
      ),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
        return iti?.current?.isValidNumber() ?? false;
      }),

    insta: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    twi: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    iml: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    tik: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    you: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    dob: yup
      .date()
      .nullable()
      .required("Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    dominant_hand: yup.string().required("required."),
    twitter: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    instagram: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    imlca: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          )
        );
      })
      .test("fileSize", "File size must be less than 2MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB limit
      }),
  });
  {
    console.log(state?.user)
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      role === "Parent" ? (state ? schemaChildUpdate : schemaParent) : schema
    ),
    defaultValues: role === "Parent" ? {
      email: state?.user?.email || "",
      username: state?.user?.user_name || "",
    } : role === "Athletes" ? {
      email: newData1?.email || "",
      username: newData1?.user_name || "",
    } : null,
    mode: "onChange",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await User_Detail({
          variables: {
            "userId": role === "Athlete" ? null : parseInt(searchParams.get("id"))
          },
          fetchPolicy: "no-cache", // Ensure a fresh request every time
        });

        if (data) {


          setUserData(data?.getUserDetail)
          setValue("full_name", data?.getUserDetail.full_name)
          setValue("nick", data?.getUserDetail.player_profile.nick_name)
          setValue("email", data?.getUserDetail.email)
          setValue("username", data?.getUserDetail.user_name)
          setValue("gender", data?.getUserDetail.player_profile.gender)
          setValue("image", {
            type: "image/jpeg",  // a valid MIME type from your list
            size: 1000,          // some number <= 2MB (2 * 1024 * 1024)
            // you can add other file properties if needed
          });
          setValue("phone", data?.getUserDetail.phone)
          setValue("dob", new Date(data?.getUserDetail.player_profile.dob))
          setValue("weight", data?.getUserDetail.player_profile.weight)
          setValue("feet", { value: data?.getUserDetail.player_profile.height.feet, label: data?.getUserDetail.player_profile.height.feet })
          setValue("inches", { value: data?.getUserDetail.player_profile.height.inches, label: data?.getUserDetail.player_profile.height.inches })

          console.log(data?.getUserDetail.player_profile.height.inches)
        }
      } catch (e) {
        console.log(e)
      }
    }

    searchParams.get("id") && fetchData()
  }, [])


  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const newData = useSelector((state) => state.profileSlice?.profile.basicProfile);

  const options = [
    { value: 1, label: "1 ft" },
    { value: 2, label: "2 ft" },
    { value: 3, label: "3 ft" },
    { value: 4, label: "4 ft" },
    { value: 5, label: "5 ft" },
    { value: 6, label: "6 ft" },
    { value: 7, label: "7 ft" },
    { value: 8, label: "8 ft" },
    { value: 9, label: "9 ft" },
    { value: 10, label: "10 ft" },
    { value: 11, label: "11 ft" },
    { value: 12, label: "12 ft" },

  ];

  const options2 = [
    { value: 0, label: "0 inch" },
    { value: 1, label: "1 inch" },
    { value: 2, label: "2 inch" },
    { value: 3, label: "3 inch" },
    { value: 4, label: "4 inch" },
    { value: 5, label: "5 inch" },
    { value: 6, label: "6 inch" },
    { value: 7, label: "7 inch" },
    { value: 8, label: "8 inch" },
    { value: 9, label: "9 inch" },
    { value: 10, label: "10 inch" },
    { value: 11, label: "11 inch" },
    { value: 12, label: "12 inch" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      borderRadius: "5px", // Rounded corners
      backdropFilter: "blur(20px)", // Glassmorphism blur effect
      WebkitBackdropFilter: "blur(20px)", // Safari compatibility
      padding: "4px 5px",
      border: "1px solid rgba(157, 157, 157, 0.3)", // Subtle border
      color: "var(--text-white)", // Text color (use a variable or set manually)
      fontSize: "14px",
      boxShadow: "none", // No extra shadow
      "&:hover": {
        border: "1px solid rgba(255, 255, 255, 0.5)", // Slight border change on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0.2)", // Dropdown background
      borderRadius: "5px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(157, 157, 157, 0.3)",
      fontSize: "14px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for the dropdown
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.3)" // Highlighted option background
        : "transparent",
      color: "var(--text-white)", // Text color
      padding: 10,
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.7)", // Placeholder color
      fontStyle: "italic",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-white)", // Selected value color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--text-white)", // Dropdown arrow color
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the separator
    }),
  };



  const dispatch = useDispatch()
  const onSubmit = (data) => {

    console.log(draft?.profile_detail?.advanced?.sports_info, "23456uytassda")

    let payload

    if (role == "Parent") {


      if (state) {

        payload = {
          profile_type: "Advanced",
          profile_detail: {
            advanced: {
              sports_info: [...(draft?.profile_detail?.advanced?.sports_info || [])],
              career_stats: {
                ...(draft?.profile_detail?.advanced?.career_stats || null),
              },
              performance_metrics: {
                ...(draft?.profile_detail?.advanced?.performance_metrics || null),
              },
              academic_info: {
                ...(draft?.profile_detail?.advanced?.academic_info || null),
              },

              weight: data?.weight,
              height: {
                feet: data?.feet?.value,
                inches: data?.inches?.value,
              },
              dominant_hand: data?.dominant_hand,
              // guardian_name: data?.guardian_name,
            },
          },
          social: [
            {
              type: "Twitter",
              link: data?.twi,
            },
            {
              type: "Instagram",
              link: data?.insta,
            },
            {
              type: "Youtube",
              link: data?.you,
            },
            {
              type: "Tiktok",
              link: data?.tik,
            },
            {
              type: "IMLCA",
              link: data?.iml || null,
            },
          ],
          id: state?.user?.id,
          picture: imageBase64Profile,
          pictureFile: data?.image,
          phone: data?.phone,
          nick_name: data?.nick,
          gender: data?.gender,
          full_name: data?.full_name,
          dob: data?.dob,
          user_name: data?.username,
          bio: data?.bio
          //  previewEmail: data?.email || null,
          // email: data?.email,
        };


      } else {

        console.log("Data", data)
        payload = {
          profile_type: "Advanced",
          profile_detail: {
            advanced: {
              sports_info: { ...(draft?.profile_detail?.advanced?.sports_info) },
              career_stats:
                {
                  ...(draft?.profile_detail?.advanced?.career_stats || null),
                } || null,
              performance_metrics:
                {
                  ...(draft?.profile_detail?.advanced?.performance_metrics || null),
                } || null,
              academic_info:
                {
                  ...(draft?.profile_detail?.advanced?.academic_info || null),
                } || null,

              weight: data?.weight,
              height: {
                feet: data?.feet?.value,
                inches: data?.inches?.value,
              },
              dominant_hand: data?.dominant_hand,
              // guardian_name: data?.guardian_name,
            },
          },
          social: [
            {
              type: "Twitter",
              link: data?.twi || null,
            },
            {
              type: "Instagram",
              link: data?.insta || null,
            },
            {
              type: "Youtube",
              link: data?.you || null,
            },
            {
              type: "Tiktok",
              link: data?.tik || null,
            },
            {
              type: "IMLCA",
              link: data?.iml || null,
            },
          ],
          picture: imageBase64Profile || null,
          pictureFile: data?.image,
          phone: data?.phone,
          nick_name: data?.nick,
          gender: data?.gender,
          full_name: data?.full_name,
          dob: data?.dob,
          email: data?.email,
          user_name: data?.username,
          bio: data?.bio
          //  previewEmail: data?.email,
        };

      }


    }
    else {



      if (state) {
        payload = {
          profile_type: "Advanced",
          profile_detail: {
            advanced: {
              sports_info: [
                ...(draft?.profile_detail?.advanced?.sports_info || []),
              ],
              career_stats: {
                ...(draft?.profile_detail?.advanced?.career_stats || null),
              },
              performance_metrics: {
                ...(draft?.profile_detail?.advanced?.performance_metrics || null),
              },
              academic_info: {
                ...(draft?.profile_detail?.advanced?.academic_info || null),
              },

              weight: data?.weight,
              height: {
                feet: data?.feet?.value,
                inches: data?.inches?.value,
              },
              dominant_hand: data?.dominant_hand,
              //guardian_name: data?.guardian_name,
            },
          },
          social: [
            {
              type: "Twitter",
              link: data?.twi || null,
            },
            {
              type: "Instagram",
              link: data?.insta || null,
            },
            {
              type: "Youtube",
              link: data?.you || null,
            },
            {
              type: "Tiktok",
              link: data?.tik || null,
            },
            {
              type: "IMLCA",
              link: data?.iml || null,
            },
          ],
          id: state?.user?.id,
          picture: imageBase64Profile,
          pictureFile: data?.image,
          phone: data?.phone,
          nick_name: data?.nick,
          gender: data?.gender,
          full_name: data?.full_name,
          dob: data?.dob,
          bio: data?.bio
          // user_name: data?.username
          //  previewEmail: data?.email || null,

          // email: data?.email,
        };
      } else {

        payload = {
          profile_type: "Advanced",
          profile_detail: {
            advanced: {
              sports_info: [
                ...(draft?.profile_detail?.advanced?.sports_info || []),
              ],
              career_stats: {
                ...(draft?.profile_detail?.advanced?.career_stats || null),
              },
              performance_metrics: {
                ...(draft?.profile_detail?.advanced?.performance_metrics || null),
              },
              academic_info: {
                ...(draft?.profile_detail?.advanced?.academic_info || null),
              },

              weight: data?.weight,
              height: {
                feet: data?.feet?.value,
                inches: data?.inches?.value,
              },
              dominant_hand: data?.dominant_hand,
              // guardian_name: data?.guardian_name,
            },
          },
          social: [
            {
              type: "Twitter",
              link: data?.twi || null,
            },
            {
              type: "Instagram",
              link: data?.insta || null,
            },
            {
              type: "Youtube",
              link: data?.you || null,
            },
            {
              type: "Tiktok",
              link: data?.tik || null,
            },
            {
              type: "IMLCA",
              link: data?.iml || null,
            },
          ],

          picture: imageBase64Profile,
          pictureFile: data?.image,
          phone: data?.phone,
          nick_name: data?.nick,
          gender: data?.gender,
          full_name: data?.full_name,
          dob: data?.dob,
          bio: data?.bio
          // previewEmail: data?.email || null,

          // email: data?.email,
        };
      }

      // payload = {
      //   profile_type: "Advanced",
      //   profile_detail: {
      //     advanced: {
      //       sports_info: [],
      //       weight: data?.weight,
      //       height: data?.height,
      //       guardian_name: data?.guardian_name,
      //     },
      //   },
      //   social: [
      //     {
      //       type: "Twitter",
      //       link: data?.twi,
      //     },
      //     {
      //       type: "Instagram",
      //       link: data?.insta,
      //     },
      //     {
      //       type: "Youtube",
      //       link: data?.you,
      //     },
      //     {
      //       type: "Tiktok",
      //       link: data?.tik,
      //     },
      //     {
      //       type: "IMLCA",
      //       link: data?.iml,
      //     },
      //   ],
      //   picture: imageBase64Profile,
      //   phone: data?.phone,
      //   nick_name: data?.nick,
      //   gender: data?.gender,
      //   full_name: data?.full_name,
      //   dob: data?.dob,
      //   // email:data?.email
      // };
    }

    console.log(payload, "payload");

    dispatch(handleCreateBasicProfile(payload));

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");

    if (role === "Parent") {
      if (state) {
        navigate(`/parent/sport-details?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

      } else {
        navigate(`/parent/sport-details?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }

    if (role === "Athlete") {
      if (state) {
        navigate(`/athlete/sport-details?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

      } else {
        navigate(`/athlete/sport-details?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }

  };

  useEffect(() => {
    console.log(draft, "123456789")
    if (draft?.full_name) {
      setValue("full_name", draft?.full_name);
    }
    if (draft?.user_name) {
      setValue("username", draft?.user_name);
    }
    if (draft?.bio) {
      setValue("bio", draft?.bio);
    }
    if (draft?.email) {
      //setValue("full_name", draft?.full_name);
      setValue("email", draft?.email);
    }
    if (draft?.nick_name) {
      setValue("nick", draft?.nick_name);

    }
    if (draft?.phone) {
      setValue("phone", draft?.phone);
    }
    if (draft?.gender) {
      setValue("gender", draft?.gender);
      setSelectedOption(draft?.gender);

    }
    if (draft?.dob) {
      const defaultDate = new Date(draft?.dob);
      setValue("dob", defaultDate);
      //setSelectedOption(draft?.gender);

    }

    if (draft?.picture) {
      // const defaultDate = new Date(draft?.dob);
      const drafPic = base64ToFile(draft?.picture);
      if (drafPic) {
        if (drafPic && drafPic instanceof Blob) {
          setPreview(URL.createObjectURL(drafPic));
        } else {
          setPreview(""); // or null or some default image URL
        }
      }
      setValue("image", drafPic);
      //setSelectedOption(draft?.gender);
    }
    if (draft?.social[0].link) {
      // const defaultDate = new Date(draft?.dob);
      setValue("twi", draft?.social[0].link);
      //setSelectedOption(draft?.gender);
    }
    if (draft?.social[1].link) {
      // const defaultDate = new Date(draft?.dob);
      setValue("insta", draft?.social[1].link);
      //setSelectedOption(draft?.gender);
    } if (draft?.social[2].link) {
      // const defaultDate = new Date(draft?.dob);
      setValue("you", draft?.social[2].link);
      //setSelectedOption(draft?.gender);
    }
    if (draft?.social[3].link) {
      // const defaultDate = new Date(draft?.dob);
      setValue("tik", draft?.social[3].link);
      //setSelectedOption(draft?.gender);
    }

    if (draft?.social[4].link) {
      // const defaultDate = new Date(draft?.dob);
      setValue("iml", draft?.social[4].link);
      //setSelectedOption(draft?.gender);
    }
    if (draft?.profile_detail) {
      // const defaultDate = new Date(draft?.dob);
      setValue("weight", draft?.profile_detail?.advanced?.weight);
      setValue("feet", {
        value: draft?.profile_detail?.advanced?.height?.feet,
        label: draft?.profile_detail?.advanced?.height?.feet,
      });
      setValue("inches", {
        value: draft?.profile_detail?.advanced?.height?.inches,
        label: draft?.profile_detail?.advanced?.height?.inches,
      });
      setValue("dominant_hand",
        draft?.profile_detail?.advanced?.dominant_hand);



      //setSelectedOption(draft?.gender);
    }


  }, [])

  console.log(newData, 'asfsafasassasaa');

  return (
    <div className="who-we-are-bg mb-5">
      <Container>
        <Row className="pt-md-5 ">
          <Col md={12}>
            <div
              onClick={() => {
                dispatch(handleClearProfiles());
                navigate(-1);
              }}
              className="d-flex back-btn mb-4"
            >
              <svg
                className="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="14"
                viewBox="0 0 10 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                  fill="white"
                />
              </svg>
              <h4>Back</h4>
            </div>
          </Col>
          <Col md={12}>
            <h3 className="page-main-heading">Athlete Advance Profile Setup</h3>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-5 px-3 mx-sm-0 mx-5 ">
              <svg width="240" height="22" viewBox="0 0 279 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="white" stroke-width="3" />
                <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="white" stroke-width="3" />
                <line x1="147" y1="13.5" x2="191" y2="13.5" stroke="white" stroke-width="3" />
                <line x1="215" y1="13.5" x2="259" y2="13.5" stroke="white" stroke-width="3" />
                <circle cx="12" cy="12" r="10" stroke="url(#paint0_linear_6349_16208)" stroke-width="4" />
                <circle cx="75" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="139" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="203" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="267" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="12" cy="12" r="3" fill="url(#paint1_linear_6349_16208)" />
                <circle cx="75" cy="12" r="3" fill="white" />
                <circle cx="139" cy="12" r="3" fill="white" />
                <circle cx="203" cy="12" r="3" fill="white" />
                <circle cx="267" cy="12" r="3" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_6349_16208" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_6349_16208" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </Col>
        </Row>

        <form onSubmit={handleSubmit(onSubmit)} className="back-color px-md-0 ">
          <Row>
            <Col md={1} />
            <Col md={5}>
              <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "20px" }}>
                Personal Information
              </h3>
            </Col>
            <Col md={1} />


          </Row>
          <Row>
            <Col md={1} />
            <Col md={10}>
              <div className="profile d-flex justify-content-start">
                <div className="profile-image d-flex flex-sm-nowrap flex-wrap gap-4 align-items-center text-center mb-2">

                  <img
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "90px",
                      width: "90px",
                    }}
                    className="mb-2"
                    src={preview || (userData?.picture && `${import.meta.env.VITE_BASE_URL_IMAGE}${userData?.picture}`) || profile}
                    alt="Profile"
                  />

                  {!userData?.picture && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("openfile").click();
                        }}
                        style={{ border: "none" }}
                        className="primary-btn-img w-100 py-2 px-3"
                      >
                        <h3 className="me-2">Upload Profile Image</h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 23 23"
                          fill="none"
                        >
                          <path
                            d="M9.90071 16.5499V5.37742L6.33647 8.94166L4.41727 6.95391L11.2716 0.0996094L18.1259 6.95391L16.2067 8.94166L12.6424 5.37742V16.5499H9.90071ZM3.04641 22.0334C2.29244 22.0334 1.64722 21.7652 1.11075 21.2287C0.57429 20.6922 0.305601 20.0466 0.304688 19.2917V15.1791H3.04641V19.2917H19.4967V15.1791H22.2385V19.2917C22.2385 20.0456 21.9702 20.6913 21.4338 21.2287C20.8973 21.7661 20.2516 22.0343 19.4967 22.0334H3.04641Z"
                            fill="#241C19"
                          />
                        </svg>
                      </button>

                      <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                          <div>
                            <input
                              id="openfile"
                              style={{ display: "none" }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  field.onChange(file);
                                  setPreview(URL.createObjectURL(file));

                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    setImageBase64Profile(reader.result);
                                  };
                                }
                              }}
                            />
                            {errors.image && (
                              <p className="validation-text text-nowrap mt-3">
                                {errors.image.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </>
                  )}

                </div>
              </div>
            </Col>
            <Col md={1} />

          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Name</label>
                  <div className="w-100">
                    <Controller
                      id="loginEmail"
                      name="full_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          disabled={userData?.full_name}
                          placeholder="Full Name"
                          style={{ opacity: userData?.full_name && "0.6" }}
                          {...field}
                        />
                      )}
                    />
                    {errors?.full_name && (
                      <p className="validation-text">
                        {errors?.full_name?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Nickname ( Optional )</label>
                  <div className="w-100">
                    <Controller
                      id="loginEmail"
                      name="nick"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Nickname"
                          disabled={userData?.player_profile?.nick_name}
                          style={{ opacity: userData?.player_profile?.nick_name && "0.6" }}
                          {...field}
                        />
                      )}
                    />
                    {errors?.nick && (
                      <p className="validation-text">{errors?.nick?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1} />
          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Date of Birth</label>
                  <div className="w-100">
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <DatePicker
                            {...field}
                            selected={field.value}
                            placeholder={"Date of Birth"}
                            disabled={userData?.player_profile?.dob}
                            style={{ opacity: userData?.player_profile?.dob && "0.6", width: "100%" }}
                            onChange={(date) => field.onChange(date)}
                            className="w-100 input-transparent-blur"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date()}
                          />
                          {errors.dob && (
                            <p className="validation-text">
                              {errors.dob.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card  ">
                <label> Gender </label>

                {/* Option 1 */}
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <div className="d-flex">
                      {/* Show only one option if gender exists */}
                      {userData?.player_profile?.gender ? (
                        <div
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "fit-content",
                          }}
                          className="input-transparent-blur auto-widt me-3"
                        >
                          <div className="child-right-select">
                            <label style={{ marginBottom: "0" }}>
                              <input
                                className="me-3"
                                type="radio"
                                name="gender"
                                value={userData.player_profile.gender}
                                checked={field?.value === userData.player_profile.gender}
                                onChange={() => {
                                  field.onChange(userData.player_profile.gender);
                                  setSelectedOption(userData.player_profile.gender);
                                }}
                              />
                              <span>{userData.player_profile.gender}</span>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Show both options if gender not set */}
                          <div
                            style={{
                              borderRadius: "5px",
                              cursor: "pointer",
                              width: "fit-content",
                            }}
                            className="input-transparent-blur auto-widt me-3"
                          >
                            <div className="child-right-select">
                              <label style={{ marginBottom: "0" }}>
                                <input
                                  className="me-3"
                                  type="radio"
                                  name="gender"
                                  value="Male"
                                  checked={field?.value === "Male"}
                                  onChange={() => {
                                    field.onChange("Male");
                                    setSelectedOption("Male");
                                  }}
                                />
                                <span>Male</span>
                              </label>
                            </div>
                          </div>

                          <div
                            style={{
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            className="input-transparent-blur auto-widt"
                          >
                            <div className="child-right-select">
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Female"
                                  checked={field?.value === "Female"}
                                  onChange={() => {
                                    field.onChange("Female");
                                    setSelectedOption("Female");
                                  }}
                                />
                                <span>Female</span>
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                  )}
                />
                {errors.gender && (
                  <p className="validation-text">{errors.gender.message}</p>
                )}
              </div>
            </Col>

            <Col md={1} />
          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card w-100">
                <div className="input-transparent-blur-fields w-100">
                  <label>Phone Number</label>
                  {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                  <div className="w-100">
                    <Controller
                      id="phone"
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className=" input-transparent-blur"
                          ref={phoneInputRef}
                          disabled={userData?.phone}
                          style={{ opacity: userData?.phone && "0.6" }}
                          id="phone"
                          type="tel"
                          name="phone"
                        // value={field.value} // Use Formik's value
                        />
                      )}
                    />
                    {errors?.phone && (
                      <p className="validation-text">
                        {errors?.phone?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5}>
              <Row>


                <Col md={6}>
                  <div className="input-card w-100">
                    <div className="input-transparent-blur-fields w-100">
                      <label> Height </label>

                      {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                      <Row>
                        <Col md={6}>
                          <div className="w-100">
                            <Controller
                              name="feet"
                              control={control}
                              defaultValue={{ value: 1, label: "1 ft" }} // Default to null for controlled behavior
                              rules={{ required: "This field is required" }} // Validation rules
                              render={({ field, fieldState: { error } }) => (
                                <div>
                                  {userData?.player_profile?.height?.feet ? (
                                    <input
                                      type="text"
                                      className="w-100 input-transparent-blur"
                                      value={userData.player_profile.height.feet}
                                      disabled
                                      style={{
                                        opacity: 0.6,
                                      }}
                                    />
                                  ) : (
                                    <Select
                                      {...field} // Spread field props for React Hook Form integration
                                      styles={customStyles}
                                      options={options}
                                      onChange={(selectedOption) =>
                                        field.onChange(selectedOption)
                                      } // Update form state
                                    />
                                  )}

                                  {errors?.feet && (
                                    <p className="validation-text">
                                      {errors?.feet?.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="w-100">
                            <Controller
                              name="inches"
                              control={control}
                              defaultValue={{ value: 0, label: "0 inch" }} // Default to null for controlled behavior
                              rules={{ required: "This field is required" }} // Validation rules
                              render={({ field, fieldState: { error } }) => (
                                <div>
                                  {userData?.player_profile?.height?.inches ? (
                                    <input
                                      type="text"
                                      className="w-100 input-transparent-blur"
                                      value={userData.player_profile.height.inches}
                                      disabled
                                      style={{
                                        opacity: 0.6,
                                      }}
                                    />
                                  ) : (
                                    <Select
                                      {...field} // Spread field props for React Hook Form integration
                                      styles={customStyles}
                                      options={options2}
                                      onChange={(selectedOption) =>
                                        field.onChange(selectedOption)
                                      } // Update form state
                                    />
                                  )}

                                  {errors?.inches && (
                                    <p className="validation-text">
                                      {errors?.inches?.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Weight / lbs</label>
                      <div className="w-100">
                        <Controller
                          id="weight"
                          name="weight"
                          control={control}
                          render={({ field }) => (
                            <input
                              className="w-100 input-transparent-blur"
                              type="text"
                              disabled={userData?.player_profile?.weight}
                              style={{ opacity: userData?.player_profile?.weight && "0.6" }}
                              alt="text"
                              placeholder="Weight"
                              {...field}
                            />
                          )}
                        />
                        {errors?.weight && (
                          <p className="validation-text">
                            {errors?.weight?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>


            <Col md={1} />
          </Row>

          <Row>
            <Col md={1}>
            </Col>
            {role == "Parent" && (
              <Col md={5}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label>Email Address</label>
                    <div className="w-100">
                      <Controller
                        id="email"
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            // disabled={state ? true : false}
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            disabled={userData?.email}
                            style={{ opacity: userData?.email && "0.6" }}
                            placeholder="abc@gmail.com"
                            {...field}
                          />
                        )}
                      />
                      {errors?.email && (
                        <p className="validation-text">
                          {errors?.email?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

              </Col>
            )}
            {role == "Parent" && (
              <Col md={5}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label>Username</label>
                    <div className="w-100">
                      <Controller
                        id="loginEmail"
                        name="username"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              className="w-100 input-transparent-blur"
                              type="text"
                              placeholder="Unique username (for identification)"
                              {...field}
                              disabled={userData?.user_name}
                              style={{ opacity: userData?.user_name && "0.6" }}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, "");
                                field.onChange(value);

                                // Call checkUsername when input length is >= 5
                                if (value.length >= 5) {
                                  // checkUsername({ variables: { input:{
                                  //   user_name: value
                                  // } } });
                                  setTimeout(() => {
                                    checkUsername({
                                      variables: {
                                        input: {
                                          user_name: value
                                        }
                                      }
                                    })
                                  }, 1200)
                                }
                              }}
                            />
                            {usernameLoading && <p className="text-secondary" style={{
                              fontSize: "12px",
                              textAlign: "left"
                            }}>Checking...</p>}
                            {usernameData?.checkUsername?.statusCode === 200 && (
                              <p className="text-success" style={{
                                fontSize: "12px",
                                textAlign: "left"
                              }}>{usernameData.checkUsername.message}</p>
                            )}
                            {usernameData?.checkUsername?.statusCode === 400 && (
                              <p className="validation-text">{usernameData.checkUsername.message}</p>
                            )}
                          </>
                        )}
                      />
                      {errors?.username && (
                        <p className="validation-text">
                          {errors?.username?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

              </Col>
            )}

          </Row>
          <Row>
            <Col md={1}>
            </Col>
            <Col md={10}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Add Bio</label>
                  <div className="w-100">
                    <Controller
                      id="bio"
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          className="w-100 input-transparent-blur"
                          rows={3}
                          type="text"
                          alt="text"
                          placeholder="Write something about yourself..."
                          {...field}
                          style={{ resize: "none" }}
                        />
                      )}
                    />
                    {errors?.bio && (
                      <p className="validation-text">
                        {errors?.bio?.message}
                      </p>
                    )}
                  </div>
                </div>
                {
                  console.log(errors)
                }
              </div>
            </Col>
            <Col md={1}>
            </Col>
          </Row>
          <Row>
            <Col md={1}></Col>


            {/* <Col md={5}>
              <div className="basic-inputs input-card  ">
                <label> Dominant Hand </label>
                <Controller
                  name="dominant_hand"
                  control={control}
                  validation
                  in
                  schema
                  render={({ field }) => (
                    <>
                      <div className="d-flex">
                        {["Left", "Right", "Ambidextrous"]?.map((option) => (
                          <div
                            key={option}
                            style={{
                              borderRadius: "5px",
                              cursor: "pointer",
                              width: "130px",
                            }}
                            className="input-transparent-blur  me-3"
                          >
                            <div className="child-right-select">
                              <label style={{ marginBottom: "0" }}>
                                <input
                                  type="radio"
                                  name={field.name} // Ensure name is consistent
                                  value={option}
                                  checked={field.value === option} // Use field.value
                                  onChange={() => {
                                    field.onChange(option);
                                    //  trigger(
                                    //    "performance_metrics.dominant_hand"
                                    //  ); // Revalidate field
                                  }}
                                />
                                <span> {option} </span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                />
                {errors?.dominant_hand && (
                  <p className="validation-text">
                    {errors?.dominant_hand?.message}
                  </p>
                )}
              </div>
            </Col> */}
            {/* <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Guardian name</label>
                  <div className="w-100">
                    <Controller
                      id="guardian_name"
                      name="guardian_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Guardian name"
                          {...field}
                        />
                      )}
                    />
                    {errors?.guardian_name && (
                      <p className="validation-text">
                        {errors?.guardian_name?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col> */}
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={1}></Col>
            <Col md={5}>
              <div className="basic-inputs my-2 ">
                <label style={{ fontWeight: "600" }}>
                  Connect Your Socials{" "}
                </label>
              </div>
            </Col>
            <Col md={5}></Col>

            <Col md={1}></Col>
          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card ">
                <label>Twitter ( Optional ) </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <img className="me-3 ms-3" src={twitter} alt="" />
                      <Controller
                        name="twi"
                        control={control}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              {...field}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                outline: "none",
                                color: "#fff",
                                width: "100%",
                              }}
                              className="w-100 "
                              type="text"
                              placeholder="Paste your profile URL here"
                              alt="text"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {errors.twi && (
                  <p className="validation-text">{errors.twi.message}</p>
                )}
              </div>
            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card ">
                <label>YouTube ( Optional ) </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <img className="me-3 ms-3" src={youtube} alt="" />
                      <Controller
                        name="you"
                        control={control}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              {...field}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                outline: "none",
                                color: "#fff",
                                width: "100%",
                              }}
                              className="w-100 "
                              type="text"
                              placeholder="Paste your profile URL here"
                              alt="text"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {errors.you && (
                  <p className="validation-text">{errors.you.message}</p>
                )}
              </div>
            </Col>

            <Col md={1} />
          </Row>
          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card">
                <label>Instagram ( Optional ) </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex  align-items-center">
                      <img className="me-3 ms-3" src={insta} alt="" />
                      <Controller
                        name="insta"
                        control={control}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              {...field}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                outline: "none",
                                color: "#fff",
                                width: "100%",
                              }}
                              className="w-100 "
                              type="text"
                              placeholder="Paste your profile URL here"
                              alt="text"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {errors.insta && (
                  <p className="validation-text">{errors.insta.message}</p>
                )}
              </div>
            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card">
                <label>TikTok ( Optional ) </label>
                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <img className="me-3 ms-3 p-1" src={tiktok} alt="" />
                      <Controller
                        name="tik"
                        control={control}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              {...field}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                outline: "none",
                                color: "#fff",
                                width: "100%",
                              }}
                              className="w-100 "
                              type="text"
                              placeholder="Paste your profile URL here"
                              alt="text"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {errors.tik && (
                  <p className="validation-text">{errors.tik.message}</p>
                )}
              </div>
            </Col>

            <Col md={1} />
          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}></Col>
            <Col md={5}></Col>

            <Col md={1} />
          </Row>

          <Row>
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card">
                <label>IMLCA ( Optional ) </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <img className="me-3 ms-3 p-1" src={fg} alt="" />
                      <Controller
                        name="iml"
                        control={control}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              {...field}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                outline: "none",
                                color: "#fff",
                                width: "100%",
                              }}
                              className="w-100 "
                              type="text"
                              placeholder="Paste your profile URL here"
                              alt="text"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errors.iml && (
                <p className="validation-text">{errors.iml.message}</p>
              )}
            </Col>
            <Col md={5}></Col>

            <Col md={1} />
          </Row>



          <Row>
            <Col md={4} />

            <Col md={4}>
              <button
                className="primary-btn w-100 px-2 py-3 my-3"
                type="submit"
              >
                <h3> Next </h3>
              </button>
            </Col>

            <Col md={4} />
          </Row>
        </form>
      </Container>
    </div>
  );
}
