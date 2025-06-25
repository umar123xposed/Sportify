import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import twitter from "./../../assets/twitter.png";
import InstaImg from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";
import isEmail from "validator/lib/isEmail";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleClearProfile, handleClearProfiles, handleCreateBasicProfile } from "../../redux/profileSlice";
import { useLazyQuery } from "@apollo/client";
import { CHECK_USERNAME, Get_User_Detail } from "../../graphql/query/query";

export default function AdvancedProfile() {

  const [User_Detail] = useLazyQuery(Get_User_Detail)

  const [searchParams] = useSearchParams()


  const [checkUsername, { data: usernameData, loading: usernameLoading }] = useLazyQuery(CHECK_USERNAME);
  const { state } = useLocation()
  console.log(state, 'state')
  const phoneInputRef = useRef(null);

  const [preview, setPreview] = useState(null)
  const [preview1, setPreview1] = useState(null)
  const [userData, setUserData] = useState()

  const iti = useRef(null);
  const navigate = useNavigate()

  const draft2 = useSelector(
    (state) => state
  );

  const draft1 = useSelector(
    (state) => state?.profileSlice?.profile
  );

  console.log(draft2)

  const draft = useSelector(
    (state) => state?.profileSlice?.profile?.basicProfile
  );

  console.log(draft, "what is draft")

  const schema = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup.string(),

    side: yup.string().required("Dominant Side is required"),
    position: yup
      .array()
      .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
      .min(1, "Please enter some text first, then click the (+) button to add it.")
      .required("Please enter some text first, then click the (+) button to add it."),
    jersey_number: yup.string().required("Jursey Number is required"),
    team_name: yup.string().required("Team Name is required"),


    gender: yup.string().required("Gender is required"),

    image: yup
      .mixed()
      .required("Profile Image is required")
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
    image1: yup
      .mixed()
      .required("Sport Image is required")
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

  const schemaParent = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup.string(),
    email: yup
      .string()
      .email()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email format."
      )
      .required("Email is required"),
    side: yup.string().required("Dominant Side is required"),
    position: yup
      .array()
      .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
      .min(1, "Please enter some text first, then click the (+) button to add it.")
      .required("Please enter some text first, then click the (+) button to add it."),
    jersey_number: yup.string().required("Jursey Number is required"),
    team_name: yup.string().required("Team Name is required"),
    username: yup
      .string()
      .min(5, "At least 5 Characters required")
      .required("Username is required"),

    gender: yup.string().required("Gender is required"),

    image: yup
      .mixed()
      .required("Profile Image is required")
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
    image1: yup
      .mixed()
      .required("Sport Image is required")
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

  const schemaUpdateChild = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
    ,
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
      .transform((value, originalValue) => {
        return originalValue === "" ? null : value;
      })
      .required("Date of Birth is required"),
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
  }, [])

  const [selectedOption, setSelectedOption] = useState(""); // State for  radio
  const [imageBase64Profile, setImageBase64Profile] = useState(draft?.picture || null);
  const [imageBase64Profile1, setImageBase64Profile1] = useState(draft?.picture1 || null);

  const newData = useSelector((state) => state.profileSlice?.profile.basicProfile);
  const newData1 = useSelector((state) => state?.authSlice?.user?.data);
  const role = useSelector(
    (state) => state.authSlice?.role
  );

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    control,
    getValue,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      role === "Parent" ? (state ? schemaUpdateChild : schemaParent) : schema
    ),
    defaultValues: role === "Athletes" && {
      email: newData1?.email || "",
      username: newData1?.user_name || ""
    },
    mode: "onChange",
  });

console.log(role)
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
          setValue("phone", data?.getUserDetail.phone)
          setValue("username", data?.getUserDetail.user_name)
          setValue("gender", data?.getUserDetail.player_profile.gender)
          setValue("image", {
            type: "image/jpeg",  // a valid MIME type from your list
            size: 1000,          // some number <= 2MB (2 * 1024 * 1024)
            // you can add other file properties if needed
          });
        }
      } catch (e) {
        console.log(e)
      }
    }

    searchParams.get("id") && fetchData()
  }, [])

  console.log(draft, newData1, "statestate")

  const onSubmit = (data) => {
    console.log("Form Data:", data.image);

    let payload

    if (role == "Parent") {

      if (state) {
        payload = {
          profile_type: "Basic",
          profile_detail: {
            basic: {
              sports_info: [],
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
          picture: imageBase64Profile || null,
          picture1: imageBase64Profile1 || null,
          phone: data?.phone,
          nick_name: data?.nick,
          gender: data?.gender,
          full_name: data?.full_name,
          dob: data?.dob,
        };
      } else {
        payload = {
          profile_type: "Basic",
          profile_detail: {
            basic: {
              sports_info: [],
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

          data: data
        };
      }

    } else {
      payload = {
        profile_type: "Basic",
        profile_detail: {
          basic: {
            sports_info: [],
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
        data: data
        //email:data?.email
      };
    }

    //   console.log(payload,'what is this')

    dispatch(handleCreateBasicProfile(payload));

    // if (state) {

    const id = searchParams.get("id");


    if (role == "Parent") {
      navigate(`/parent/checkout-payment?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`);
    }

    if (role == "Athlete") {
      navigate(`/athlete/checkout-payment?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`);
    }
    // navigate("/parent/checkout-payment")

    // } else {

    //   navigate(`/basic/sports-details`);

    // }

  };

  console.log(errors)


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




  useEffect(() => {

    if (draft?.data?.username) {
      setValue("username", draft?.data?.username);
    }
    if (draft?.data?.full_name) {
      setValue("full_name", draft?.data?.full_name);
    }
    if (draft?.data?.team_name) {
      setValue("team_name", draft?.data?.team_name);
    }
    if (draft?.data?.position) {
      setValue("position", draft?.data?.position);
    }
    if (draft?.data?.jersey_number) {
      setValue("jersey_number", draft?.data?.jersey_number);
    }
    if (draft?.data?.email) {
      //setValue("full_name", draft?.data?.full_name);
      setValue("email", draft?.data?.email);
    }
    if (draft?.data?.side) {
      //setValue("full_name", draft?.data?.full_name);
      setValue("side", draft?.data?.side);
    }
    if (draft?.data?.nick) {
      setValue("nick", draft?.data?.nick);

    }
    if (draft?.data?.phone) {
      setValue("phone", draft?.data?.phone);
    }
    if (draft?.data?.gender) {
      setValue("gender", draft?.data?.gender);
      setSelectedOption(draft?.data?.gender);

    }
    if (draft?.data?.dob) {
      const defaultDate = new Date(draft?.data?.dob);
      setValue("dob", defaultDate || null);
      //setSelectedOption(draft?.data?.gender);

    }

    if (draft?.data?.image) {
      // const defaultDate = new Date(draft?.data?.dob);
      // const drafPic = base64ToFile(draft?.data?.image);
      // if (drafPic) {
      if (draft?.data?.image && draft.data.image instanceof Blob) {
        setPreview(URL.createObjectURL(draft.data.image));
      } else {
        setPreview(""); // or null or some default image URL
      }
      // }
      setValue("image", draft?.data?.image);
      //setSelectedOption(draft?.data?.gender);
    }
    // if (draft?.data?.social[0].link) {
    //   // const defaultDate = new Date(draft?.data?.dob);
    //   setValue("twi", draft?.data?.social[0].link);
    //   //setSelectedOption(draft?.data?.gender);
    // }
    // if (draft?.data?.social[1].link) {
    //   // const defaultDate = new Date(draft?.data?.dob);
    //   setValue("insta", draft?.data?.social[1].link);
    //   //setSelectedOption(draft?.data?.gender);
    // } if (draft?.data?.social[2].link) {
    //   // const defaultDate = new Date(draft?.data?.dob);
    //   setValue("you", draft?.data?.social[2].link);
    //   //setSelectedOption(draft?.data?.gender);
    // }
    // if (draft?.data?.social[3].link) {
    //   // const defaultDate = new Date(draft?.data?.dob);
    //   setValue("tik", draft?.data?.social[3].link);
    //   //setSelectedOption(draft?.data?.gender);
    // }

    // if (draft?.data?.social[4].link) {
    //   // const defaultDate = new Date(draft?.data?.dob);
    //   setValue("iml", draft?.data?.social[4].link);
    //   //setSelectedOption(draft?.gender);
    // }




  }, [])

  console.log(newData, 'asfsafasassasaa');

  const PositionsInput = ({ control, index, setValue, watch, error, trigger }) => {
    const [positionInput, setPositionInput] = useState("");
    const positions1 = watch(`position`) || [];
    console.log(error, 'what is thia')
    const handleAddPosition = (e) => {
      if (e.key === "Enter" && positionInput.trim()) {
        e.preventDefault();
        setValue(`position`, [
          ...positions1,
          positionInput.trim(),
        ]);
        trigger(`position`);

        setPositionInput(""); // Clear input after adding
      }
    };

    const handleOnClick = () => {

      if (positionInput.trim()) {
        setValue(`position`, [
          ...positions1,
          positionInput.trim(),
        ])
        trigger(`position`);
        setPositionInput(""); // Clear input after adding
      }


    };

    const handleRemovePosition = (posIndex) => {
      setValue(
        `position`,
        positions1.filter((_, i) => i !== posIndex)
      );
      trigger(`position`);
    };

    return (

      <div>
        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <div className="w-100 relative" style={{ position: "relative" }}>
              <input
                className="w-100 input-transparent-blur"
                type="text"
                {...field}
                value={positionInput}
                placeholder="Add more Positions"
                onChange={(e) => {
                  const regex = /^[A-Za-z0-9\s]+$/;

                  // If the input matches the regex, update the state
                  if (regex.test(e.target.value)) {
                    setPositionInput(e.target.value);
                  } else {
                    setPositionInput("");
                  }
                  // setPositionInput(e.target.value)
                }}
                onKeyDown={handleAddPosition} // Listen for Enter key
              />
              <svg
                onClick={handleOnClick}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
              >
                <circle cx="14" cy="14" r="14" fill="white" />
                <path
                  d="M20 14.998H15V19.998C15 20.2633 14.8946 20.5176 14.7071 20.7052C14.5196 20.8927 14.2652 20.998 14 20.998C13.7348 20.998 13.4804 20.8927 13.2929 20.7052C13.1054 20.5176 13 20.2633 13 19.998V14.998H8C7.73478 14.998 7.48043 14.8927 7.29289 14.7052C7.10536 14.5176 7 14.2633 7 13.998C7 13.7328 7.10536 13.4785 7.29289 13.2909C7.48043 13.1034 7.73478 12.998 8 12.998H13V7.99805C13 7.73283 13.1054 7.47848 13.2929 7.29094C13.4804 7.1034 13.7348 6.99805 14 6.99805C14.2652 6.99805 14.5196 7.1034 14.7071 7.29094C14.8946 7.47848 15 7.73283 15 7.99805V12.998H20C20.2652 12.998 20.5196 13.1034 20.7071 13.2909C20.8946 13.4785 21 13.7328 21 13.998C21 14.2633 20.8946 14.5176 20.7071 14.7052C20.5196 14.8927 20.2652 14.998 20 14.998Z"
                  fill="url(#paint0_linear_2713_22495)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2713_22495"
                    x1="7.00079"
                    y1="13.9986"
                    x2="21.0003"
                    y2="13.9986"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#DDA027" />
                    <stop offset="0.3198" stopColor="#CE9B2B" />
                    <stop offset="0.6802" stopColor="#FEF48E" />
                    <stop offset="1" stopColor="#FFD046" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        />
        {
          console.log(error)
        }
        {error.position && (
          <p className="validation-text">
            {error.position.message}
          </p>
        )}
        <div style={{ display: "flex" }} className="mt-2 flex flex-wrap gap-2">
          {positions1.map((pos, posIndex) => (
            <div key={posIndex} className="grad-border postions py-0">
              <div className="flex items-center bg-gray-200 px-3 pb-1 rounded-full">
                <span className="me-3">{pos}</span>
                <svg
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemovePosition(posIndex)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M1.10645 12.8908L12.8931 1.10742M1.10645 1.10742L12.8931 12.8908"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

    )
  }

  return (
    <div className="">
      {
        console.log(userData)
      }
      <Container>
        <Row className="pt-5">
          <Col md={12}>
            <div onClick={() => {
              dispatch(handleClearProfiles());
              navigate(-1)
            }} className="d-flex back-btn mb-4">
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
            <h3 className="page-main-heading"> Basic {searchParams.get("id") ? "Sport" : "Player"} Profile </h3>
          </Col>
        </Row>

        <form onSubmit={handleSubmit(onSubmit)} className="back-color px-md-0 mb-5">
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
            {/* <Col md={10}>
              <div className="profile d-flex justify-content-start ">
                <div className="profile-image d-flex flex-md-row gap-4 align-items-center text-center mb-2">
                  <img
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "90px",
                      width: "90px",
                    }}
                    className=" mb-2"
                    src={preview ? preview : profile}
                    alt=""
                  />

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
                          id={"openfile"}
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.preventDefault();
                            const file = e.target.files[0];

                            // Generate preview URL
                            if (file) {

                              field.onChange(file);
                              setPreview(URL.createObjectURL(file));

                            }

                            if (file) {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => {
                                setImageBase64Profile(reader.result); // Store Base64 string
                              };
                            }
                          }} // Store the file in form state
                        />

                        {errors.image && (
                          <p className="validation-text text-nowrap mt-3">
                            {errors.image.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </Col> */}
            <Col md={10}>
              <div className="profile d-flex  justify-content-start">
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
                          disabled={userData?.player_profile?.nick_name}
                          style={{ opacity: userData?.player_profile?.nick_name && "0.6" }}
                          placeholder="Nickname"
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

            {
              role !== "Athlete" && (

                <Col md={1} />
              )
            }

            {
              role !== "Athlete" && (
                <Col md={5}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Email</label>
                      <div className="w-100">
                        <Controller
                          id="email"
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <input
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              disabled={userData?.email}
                              style={{ opacity: userData?.email && "0.6" }}
                              placeholder="Email"
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
              )
            }
            {
              role !== "Athlete" && (
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
                                disabled={userData?.user_name}
                                style={{ opacity: userData?.user_name && "0.6" }}
                                placeholder="Unique username (for identification)"
                                {...field}
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
                                    }, 1400)
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
              )
            }


            {
              role !== "Athlete" && (
                <Col md={1} />
              )
            }

            <Col md={1} />
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



          </Row>
          <Row className="mt-4">
            <Col md={1} />
            <Col md={5}>
              <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "20px" }}>
                Sport Details
              </h3>
            </Col>
            <Col md={1} />


          </Row>
          <Row>
            <Col md={1} />
            <Col md={10}>
              <div className="profile d-flex justify-content-start ">
                <div className="profile-image d-flex flex-sm-nowrap flex-wrap gap-4 align-items-center text-center mb-2">
                  <img
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "90px",
                      width: "90px",
                    }}
                    className=" mb-2"
                    src={preview1 ? preview1 : profile}
                    alt=""
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("openfile1").click();
                    }}
                    style={{ border: "none" }}
                    className="primary-btn-img w-100 py-2 px-3"
                  >
                    <h3 className="me-2">Upload Sport Image</h3>
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
                    name="image1"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          id={"openfile1"}
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.preventDefault();
                            const file = e.target.files[0];

                            // Generate preview URL
                            if (file) {

                              field.onChange(file);
                              setPreview1(URL.createObjectURL(file));

                            }

                            if (file) {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => {
                                setImageBase64Profile1(reader.result); // Store Base64 string
                              };
                            }
                          }} // Store the file in form state
                        />

                        {errors.image1 && (
                          <p className="validation-text text-nowrap mt-3">
                            {errors.image1.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col md={1} />
            <Col md={1} />
            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Sport Name</label>
                  <div className="w-100">
                    {
                      console.log(draft1)
                    }
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                      placeholder="Jersey Number"
                      value={draft1?.sport?.label}
                      disabled
                    />

                  </div>
                </div>
              </div>
{
  console.log(draft1)
}

            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Team Name</label>
                  <div className="w-100">
                    <Controller
                      id="team_name"
                      name="team_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Team Name"
                          {...field}
                        />
                      )}
                    />
                    {errors?.team_name && (
                      <p className="validation-text">
                        {errors?.team_name?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>


            <Col md={1} />
            <Col md={1} />

            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Jersey Number</label>
                  <div className="w-100">
                    <Controller
                      id="jersey_number"
                      name="jersey_number"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Jersey Number"
                          {...field}
                        />
                      )}
                    />
                    {errors?.jersey_number && (
                      <p className="validation-text">
                        {errors?.jersey_number?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="basic-inputs input-card  ">
                <label> Dominant Hand </label>
                <Controller
                  name="side"
                  control={control}
                  validation
                  in
                  schema
                  render={({ field }) => (
                    <>
                      <div className="d-flex flex-sm-nowrap flex-wrap">
                        {["Left", "Right", "Ambidextrous"]?.map((option) => (
                          <div
                            key={option}
                            style={{
                              borderRadius: "5px",
                              cursor: "pointer",
                              width: "fit-content",
                            }}
                            className="input-transparent-blur mb-sm-0 mb-2  me-3"
                          >
                            <div className="child-right-select ">
                              <label style={{ marginBottom: "0" }}>
                                <input
                                  type="radio"
                                  name={field.name} // Ensure name is consistent
                                  value={option}
                                  checked={field.value === option} // Use field.value
                                  onChange={() => {
                                    field.onChange(option);
                                    //  trigger(
                                    //    "performance_metrics.side"
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
                {errors?.side && (
                  <p className="validation-text">
                    {errors?.side?.message}
                  </p>
                )}
              </div>


            </Col>
            <Col md={1} />
            <Col md={1} />
            <Col md={5}>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Positions</label>

                  {/* <div className="w-100">
                    <Controller
                      id="position"
                      name="position"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="positions"
                          {...field}
                        />
                      )}
                    />
                    {errors?.position && (
                      <p className="validation-text">
                        {errors?.position?.message}
                      </p>
                    )}
                  </div> */}

                  <PositionsInput
                    trigger={trigger}
                    error={errors}
                    control={control}
                    index={0}
                    setValue={setValue}
                    watch={watch}
                  />

                </div>
              </div>

            </Col>
          </Row>

          <Row>
            <Col md={4} />

            <Col md={4}>
              <button
                //  onClick={()=>trigger("email")}
                className="primary-btn w-100 px-2 py-3 my-4"
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
