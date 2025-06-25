import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Col, Container, Row, Form, FormGroup, Label, Input, Button, Modal, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import profile from "./../../assets/profile.png";
import player from "./../../assets/player.png";
import SearchPlayerModal from '../../components/modules/searchPlayer';
import SearchCoachModal from '../../components/modules/searchCoach';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CREATE_TEAM } from '../../graphql/mutation';
import { CreateTeamOnSubmit } from '../../graphql/api-callings';
import { useMutation, useQuery } from '@apollo/client';
import { IoIosArrowBack } from 'react-icons/io';
import { FaUsers, FaUpload, FaTimesCircle, FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { GET_PLAYERPROFILE_BY_ID, Sport_List } from '../../graphql/query/query';
import Loader from "react-spinner-loader"

export default function CoachTeamCreation() {
  const [addModal, setAddModal] = useState(false)
  const [coachModal, setCoachModal] = useState(false)
  const phoneInputRef = useRef(null);
  const iti = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [tags, setTags] = useState([]);
  const [coach, setCoach] = useState([]);
  const [errorTag, setErrorTag] = useState(null);
  const [errorCoach, setErrorCoach] = useState(null);
  const [coachTag, setCoachTag] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);


  const [preview, setPreview] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [wins, setWins] = useState("");
  const [sportsData, setSportData] = useState(null);
  const [currendPlayer, setCurrentPLayer] = useState(null);
  const [profileType, setProfileType] = useState("Basic");
  const [profileData, setProfileData] = useState(null); // new state for result

  const [showModel, setShowModel] = useState(false);
  const [loader, setLoader] = useState(false);

  const [losses, setLosses] = useState("");
  const [ties, setTies] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault(); // Prevent form submission
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue(""); // Clear input field
    }
  };

  const handleOnClick = (event, player) => {
    event.preventDefault?.(); // Prevent default action if event exists

    console.log("Player added:", player);

    // Ensure player exists before adding
    if (!player?.id) return;

    // Use functional update to ensure the latest state
    setTags((prevTags) => {
      if (!prevTags.some((tag) => tag?.id === player.id)) {
        return [...prevTags, player];
      }

      return prevTags;
    });

    setErrorTag(null);
    // setAddModal(false); // Close modal after selection
    // Optionally clear input field (if applicable)
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleRemoveCoach = (index) => {
    setCoach((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleCoachOnClick = (event, player) => {
    event.preventDefault?.(); // Prevent default action if event exists

    console.log("Coach added:", player);

    // Ensure coach exists before adding
    if (!player?.id) return; // Assuming coaches also have an 'id'

    // Use functional update to ensure the latest state
    setCoach((prevTags) => { // Note: prevTags might be confusing here, should be prevCoaches
      if (!prevTags.some((tag) => tag?.id === player.id)) {
        return [...prevTags, player];
      }
      return prevTags;
    });

    // setCoachModal(false); // Close modal after selection
    setErrorCoach(null);
    // Optionally clear input field (if applicable)
  };
  console.log(tags[0]?.players_profile?.user?.picture, "what ");

  const schema = yup.object().shape({
    win: yup
      .number()
      .typeError("Number Required")
      .min(0, "Invalid format") // Allows 0 and positive numbers
      .integer("Invalid format")
      .required("Required"),
    loss: yup
      .number()
      .typeError("Number Required")
      .min(0, "Invalid format") // Allows 0 and positive numbers
      .integer("Invalid format")
      .required("Required"),
    tie: yup
      .number()
      .typeError("Number Required")
      .min(0, "Invalid format") // Allows 0 and positive numbers
      .integer("Invalid format")
      .required("Required"),
    team_url: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    name: yup.string().required("Team name is required"),
    team_level: yup.string().required("Team level is required"),
    // team_level: yup.string().required("Team Level is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      })
      .test("fileSize", "File size must be less than 2MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB limit
      }),
  });


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

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      schema
    ),
    mode: "onChange",
  });

  const [createTeam, { loading: loading1, error, data }] =
    useMutation(CREATE_TEAM);

  // Get values from Redux
  const fullName = useSelector((state) => state.profileSlice.fullName);
  const phone = useSelector((state) => state.profileSlice.phone);
  const action = useSelector((state) => state.profileSlice.coachAction);

  const packagemulti = useSelector((state) => state.profileSlice.PackageName)
  const organizationCode = useSelector((state) => state.profileSlice.Code);


  const handleReset = () => {
    setCoach([])
    setTags([])
    setPreview(null)
  }
  
  const onSubmit = async (data) => {
    console.log("Form values:", { name, wins, losses, ties, teamLogo });
    console.log(data);

    const input = {
      coaches: coach.length > 0 ? coach.map(coach => coach.id) : [],
      players: tags.length > 0 ? tags.map(player => player.id) : [],
      profileInput: {
        fullname: fullName || "",
        phone: phone || "",
      },
      website_url: data?.team_url || null,
      name: data?.name || "",
      team_level: data?.team_level || "",
      win: parseInt(data?.win) || 0,
      loss: parseInt(data?.loss) || 0,
      tie: parseInt(data?.tie) || 0,
    };

    if (packagemulti === "Multi") {
      input.action = action;
    }

    if (action === "Join") {
      input.action = action;
      input.organization_code = organizationCode;
    }

    console.log(" Final input: ", input);

    try {
      setLoader(true)
      const response = await createTeam({
        variables: {
          input,
          logo: data?.image
        }
      });

      if(response){
        setLoader(false)
        console.log("Team created:", response);
      navigate(`/coach/team-details?id=${response?.data?.createTeam?.data?.id}`);
      }

    } catch (error) {
      console.error("Error creating team:", error);
      setLoader(false)
    }
  };

  //my code start

  const {
    data: dataProfileData,
    loading: loadingProfile,
    refetch: PlayerProfileRefetch,
  } = useQuery(GET_PLAYERPROFILE_BY_ID, {
    variables: {
      input: {
        user_id: currendPlayer?.user_id,
      },
    },
    fetchPolicy: "no-cache",
    skip: true,
  });

  console.log(tags, 'what is tag');

  const {
    data: allSportData,
    loading: loadingSports,
    refetch: allSportsRefetch,
  } = useQuery(Sport_List, {
    variables: {
      input: {
        limit: 10,
        profile_type: profileType,
        user_id: currendPlayer?.user_id,
        cursor: null,
      },
    },
    fetchPolicy: "no-cache",
    skip: true,
  });

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (currendPlayer?.user_id) {
        const { data: sportsData } = await allSportsRefetch({
          input: {
            limit: 10,
            profile_type: profileType,
            user_id: currendPlayer?.user_id,
            cursor: null,
          },
        });

        setSportData(sportsData);
        // You can use `sportsData` here if needed
        console.log(sportsData);
      }
    };

    fetchData(); // call the async function
  }, [profileType, currendPlayer?.user_id]);

  const handleAddPlayer = async (e, player) => {
    console.log(player, "what asfsaf");
    setShowModel(true);
    setCurrentPLayer(player); // ✅ Set this first

    try {
      // ✅ Use player.user_id directly to avoid stale currendPlayer
      const { data } = await PlayerProfileRefetch({
        input: {
          user_id: player?.user_id,
        },
      });

      const { data: sportsData } = await allSportsRefetch({
        input: {
          limit: 10,
          profile_type: profileType,
          user_id: player?.user_id,
          cursor: null,
        },
      });

      setSportData(sportsData);
      setProfileData(data);

      console.log(sportsData?.playerSportsProfile?.data, "refetch result");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }

    // Optional: move this up if you rely on it right away
    // setCurrentPLayer(player);
  };

  const handleProfileSelection = (e, profileId) => {
    e.stopPropagation();
    setSelectedProfileId(profileId);
  };


  useEffect(() => {
    if (
      sportsData?.playerSportsProfile?.data?.length > 0 &&
      selectedProfileId === null
    ) {
      setSelectedProfileId(sportsData.playerSportsProfile.data[0].id);
    }
  }, [sportsData, selectedProfileId]);

  const handleSelectProfile = () => {
    if (!selectedProfileId) {
      console.log("No profile selected");
      return;
    }

    const selectedProfile = sportsData?.playerSportsProfile?.data?.find(
      (profile) => profile.id === selectedProfileId
    );

    if (selectedProfile) {
      console.log("Selected Profile Data:", selectedProfile);
      // Here you can pass the data to your parent component, API, or state management
      console.log(selectedProfile, "selectedProfile");

      setTags((prevTags) => {
        if (!prevTags.some((tag) => tag?.id === selectedProfile?.id)) {
          return [...prevTags, selectedProfile];
        }
        return prevTags;
      });

      // setAddModal(false)
      setShowModel(false)

      setErrorTag(null);

    } else {
      console.log("Profile not found");
    }
  };

  //my code end

  return (
    <Container>

      <div className="coach-team-creation-container">
        <Container>
          <Row className="pt-md-5 ">
            <Col md={12}>
              <div
                onClick={() => {
                  // dispatch(handleClearProfiles());
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
              <h3 className="page-main-heading">Create Team</h3>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-3 px-3 mx-sm-0 mx-5">
                <svg width="100" height="22" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="url(#paintLine_linear)" strokeWidth="3" />
                  <circle cx="12" cy="12" r="10" stroke="url(#paint0_linear)" strokeWidth="4" />
                  <circle cx="12" cy="12" r="3" fill="url(#paint1_linear)" />

                  <circle cx="75" cy="12" r="10" stroke="url(#paint0_linear)" strokeWidth="4" />
                  <circle cx="75" cy="12" r="3" fill="url(#paint1_linear)" />

                  <defs>
                    <linearGradient id="paint0_linear" x1="0.001" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DDA027" />
                      <stop offset="0.3198" stopColor="#CE9B2B" />
                      <stop offset="0.6802" stopColor="#FEF48E" />
                      <stop offset="1" stopColor="#FFD046" />
                    </linearGradient>

                    <linearGradient id="paint1_linear" x1="9" y1="12" x2="15" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DDA027" />
                      <stop offset="0.3198" stopColor="#CE9B2B" />
                      <stop offset="0.6802" stopColor="#FEF48E" />
                      <stop offset="1" stopColor="#FFD046" />
                    </linearGradient>

                    <linearGradient id="paintLine_linear" x1="21" y1="13.5" x2="65" y2="13.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DDA027" />
                      <stop offset="0.5" stopColor="#FEF48E" />
                      <stop offset="1" stopColor="#FFD046" />
                    </linearGradient>
                  </defs>
                </svg>


              </div>

            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12}>


              <div className="coach-team-creation-card">
                <div className="d-flex flex-sm-row flex-column gap-2 align-items-center mb-4  text-center">
                  <div className="team-placeholder">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Team"
                        className="uploaded-team-img"
                      />
                    ) : (
                      <FaUsers className="placeholder-icon" />
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("openfile").click();
                    }}
                    className="uploadbutton"
                  >
                    Upload Image
                    <FaUpload className="upload-icon" />
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

                            field.onChange(file);

                            // Generate preview URL
                            if (file) {
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <div className="d-flex justify-content-center">
                          {errors.image && (
                            <p className="validation-text pt-1">
                              {errors.image.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  />
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="teamName" className="form-label">
                          Team Name
                        </Label>
                        <Controller
                          id="name"
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <Input
                              className="forminput"
                              type="text"
                              placeholder="Enter your team name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              {...field}
                            />
                          )}
                        />
                        {errors?.name && (
                          <p className="validation-text">{errors?.name?.message}</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="teamName" className="form-label">
                          Team Level
                        </Label>
                        <Controller
                          id="team_level"
                          name="team_level"
                          control={control}
                          render={({ field }) => (
                            <Input
                              className="forminput"
                              type="text"
                              placeholder="Beginner"
                              value={name}
                              // onChange={(e) => setName(e.target.value)}
                              {...field}
                            />
                          )}
                        />
                        {errors?.team_level && (
                          <p className="validation-text">
                            {errors?.team_level?.message}
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="d-flex justify-content-around gap-2">
                        <div>
                          <Label className="form-label">Wins</Label>
                          <Controller
                            name="win"
                            control={control}
                            render={({ field }) => (
                              <Input
                                className="forminput"
                                type="number"
                                value={wins}
                                placeholder='0'
                                onChange={(e) => setWins(e.target.value)}
                                {...field}
                              />
                            )}
                          />
                          {errors?.win && (
                            <p className="validation-text">
                              {errors?.win?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="form-label">Losses</Label>
                          <Controller
                            name="loss"
                            control={control}
                            render={({ field }) => (
                              <Input
                                className="forminput"
                                type="number"
                                value={losses}
                                placeholder='0'
                                onChange={(e) => setLosses(e.target.value)}
                                {...field}
                              />
                            )}
                          />
                          {errors?.loss && (
                            <p className="validation-text">
                              {errors?.loss?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="form-label">Tie</Label>
                          <Controller
                            name="tie"
                            control={control}
                            render={({ field }) => (
                              <Input
                                className="forminput"
                                type="number"
                                value={ties}
                                placeholder='0'
                                onChange={(e) => setTies(e.target.value)}
                                {...field}
                              />
                            )}
                          />
                          {errors?.tie && (
                            <p className="validation-text">
                              {errors?.tie?.message}
                            </p>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="teamName" className="form-label">
                          Team Website URL ( Optional )
                        </Label>
                        <Controller
                          id="team_url"
                          name="team_url"
                          control={control}
                          render={({ field }) => (
                            <Input
                              className="forminput"
                              type="text"
                              placeholder="Paste your team's external website link"
                              value={name}
                              // onChange={(e) => setName(e.target.value)}
                              {...field}
                            />
                          )}
                        />

                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <div className="add-section mb-0">
                        <div className="section-header">
                          <Label className="form-label">Add Coaches </Label>
                          <span className="total-count">
                            Total Coaches: {coach.length}
                          </span>
                        </div>
                        <div className="input-with-icon">
                          <Input
                            type="text"
                            className="forminput"
                            placeholder="Add more Coaches"
                            // readOnly
                            onClick={(e) => setCoachModal(true)}
                          />
                          <div
                            className="plus-icon"
                            onClick={(e) => setCoachModal(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 28 28"
                              fill="none"
                            >
                              <circle
                                cx="14"
                                cy="14"
                                r="14"
                                fill="url(#paint0_linear_2713_22495)"
                              />
                              <path
                                d="M20 14.998H15V19.998C15 20.2633 14.8946 20.5176 14.7071 20.7052C14.5196 20.8927 14.2652 20.998 14 20.998C13.7348 20.998 13.4804 20.8927 13.2929 20.7052C13.1054 20.5176 13 20.2633 13 19.998V14.998H8C7.73478 14.998 7.48043 14.8927 7.29289 14.7052C7.10536 14.5176 7 14.2633 7 13.998C7 13.7328 7.10536 13.4785 7.29289 13.2909C7.48043 13.1034 7.73478 12.998 8 12.998H13V7.99805C13 7.73283 13.1054 7.47848 13.2929 7.29094C13.4804 7.1034 13.7348 6.99805 14 6.99805C14.2652 6.99805 14.5196 7.1034 14.7071 7.29094C14.8946 7.47848 15 7.73283 15 7.99805V12.998H20C20.2652 12.998 20.5196 13.1034 20.7071 13.2909C20.8946 13.4785 21 13.7328 21 13.998C21 14.2633 20.8946 14.5176 20.7071 14.7052C20.5196 14.8927 20.2652 14.998 20 14.998Z"
                                fill="black"
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
                        </div>
                        {errorCoach && (
                          <p className="validation-text">{errorCoach}</p>
                        )}
                        <div className="added-members-list my-3">
                          {coach.map((coach, index) => (
                            <div key={index} className="added-member-item">
                              <div className="member-info">
                                {coach?.picture ? (
                                  <img
                                    src={coach.picture}
                                    alt={coach?.nick_name || "Coach"}
                                    className="member-image"
                                  />
                                ) : (
                                  <FaRegUserCircle className="member-placeholder-icon" />
                                )}
                                <span>{coach?.nick_name}</span>
                              </div>
                              <FaTimesCircle
                                className="remove-icon"
                                onClick={() => handleRemoveCoach(index)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="add-section mb-0">
                        <div className="section-header">
                          <Label className="form-label">Add Player</Label>
                          <span className="total-count">
                            Total Players: {tags?.length}
                          </span>
                        </div>
                        <div className="input-with-icon">
                          <Input
                            type="text"
                            className="forminput"
                            placeholder="Add more player"
                            // readOnly
                            onClick={(e) => setAddModal(true)}
                          />
                          {
                            //here
                          }
                          <div
                            className="plus-icon"
                            onClick={(e) => setAddModal(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 28 28"
                              fill="none"
                            >
                              <circle
                                cx="14"
                                cy="14"
                                r="14"
                                fill="url(#paint0_linear_2713_22495)"
                              />
                              <path
                                d="M20 14.998H15V19.998C15 20.2633 14.8946 20.5176 14.7071 20.7052C14.5196 20.8927 14.2652 20.998 14 20.998C13.7348 20.998 13.4804 20.8927 13.2929 20.7052C13.1054 20.5176 13 20.2633 13 19.998V14.998H8C7.73478 14.998 7.48043 14.8927 7.29289 14.7052C7.10536 14.5176 7 14.2633 7 13.998C7 13.7328 7.10536 13.4785 7.29289 13.2909C7.48043 13.1034 7.73478 12.998 8 12.998H13V7.99805C13 7.73283 13.1054 7.47848 13.2929 7.29094C13.4804 7.1034 13.7348 6.99805 14 6.99805C14.2652 6.99805 14.5196 7.1034 14.7071 7.29094C14.8946 7.47848 15 7.73283 15 7.99805V12.998H20C20.2652 12.998 20.5196 13.1034 20.7071 13.2909C20.8946 13.4785 21 13.7328 21 13.998C21 14.2633 20.8946 14.5176 20.7071 14.7052C20.5196 14.8927 20.2652 14.998 20 14.998Z"
                                fill="black"
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
                        </div>
                        {errorTag && <p className="validation-text">{errorTag}</p>}
                        <div className="added-members-list mt-3">
                          {tags?.map((player, index) => (
                            <div key={index} className="added-member-item">
                              <div className="member-info">
                                {player?.players_profile?.user?.picture ? (
                                  <img
                                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${player?.players_profile?.user?.picture
                                      }`}
                                    alt={
                                      player?.players_profile?.user?.full_name ||
                                      "Player"
                                    }
                                    className="member-image"
                                  />
                                ) : (
                                  <FaRegUserCircle className="member-placeholder-icon" />
                                )}
                                <span>
                                  {player?.players_profile?.user?.full_name}
                                </span>
                              </div>
                              <FaTimesCircle
                                className="remove-icon"
                                onClick={() => handleRemoveTag(index)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                    
                  </Row>









                  <div className="containerbutton">

                    <button type="submit" className="primary-btn px-4 py-3 mt-4" disabled={loader} style={{ opacity: loader && "0.6" }}>
                      Create Team
                      {
                        loader &&
                        (<Loader show={true}
                          spinnerSize="16px"
                          radius="10"

                          color="red"
                        />)
                      }
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>

        {addModal && (
          <SearchPlayerModal
            setShow={setAddModal}
            show={addModal}
            // handleOnclick={handleAddPlayer}
            handleOnclick={handleAddPlayer}
            tags={tags}
          />
        )}

        {coachModal && (
          <SearchCoachModal
            setShow={setCoachModal}
            handleCoachOnClick={handleCoachOnClick}
            show={coachModal}
            coaches={coach}
          />
        )}

        <Modal backdrop={false} size="lg" centered isOpen={showModel}>
          <>
            <div className="solid-card">
              <div className="d-flex justify-content-end mb-3">
                <svg
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setShowModel(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M23.07 25.3183L13 15.2325L2.92997 25.3183L0.681641 23.07L10.7675 13L0.681641 2.92997L2.92997 0.681641L13 10.7675L23.07 0.697474L25.3025 2.92997L15.2325 13L25.3025 23.07L23.07 25.3183Z"
                    fill="white"
                  />
                </svg>
              </div>
              <Row>
                <h3
                  className=" my-3"
                  style={{
                    color: "#fff",
                    fontSize: "22px",
                    fontWeight: "600",
                    paddingLeft: "20px",
                  }}
                >
                  Profile Information
                </h3>
              </Row>
              <Row>
                <div
                  className="folder-player-card"
                  style={{ border: "none", padding: "30px", paddingTop: "5px" }}
                >
                  {/* <input

      className="player-checkbox"
      // checked={selected.includes(1)}
      // onChange={() => handleSelect(player.id)}
    /> */}
                  <img
                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${profileData?.playerProfile?.user?.picture
                      }`}
                    alt={"fakedp"}
                    className="player-imgTop"
                  />
                  <div className="player-info" style={{ paddingLeft: "30px" }}>
                    <div className="player-name">
                      {profileData?.playerProfile?.user?.full_name}{" "}
                      <span style={{ color: "gray" }}>
                        ({profileData?.playerProfile?.nick_name})
                      </span>
                    </div>
                    {/* <div className={`player-badge ${player.badge === "Advance" ? "advance" : "basic"}`}>{player.badge}</div> */}
                    <div className="player-id" style={{ paddingTop: "10px" }}>
                      ID: {profileData?.playerProfile?.player_id}
                    </div>
                    {/* <div className="player-tagsle={{ paddingTop: "10px" }}>
                  <b>Bio:</b> Cristiano Ronaldo dos Santos Aveiro is a
                  Portuguese professional footballer who plays as a forward for
                  and captains both Saudi Pro League club Al-Nass
                </div> */}
                    <div
                      className="player-tags"
                      style={{ paddingTop: "20px", paddingLeft: "8px" }}
                    >
                      <Row>
                        <Col lg={3}>
                          {" "}
                          <h6 style={{ color: "#ffff", backgroundColor: "" }}>
                            {profileData?.playerProfile?.reaction}{" "}
                            <span style={{ paddingLeft: "7px" }}>Reacts</span>
                          </h6>
                        </Col>
                        <Col lg={3}>
                          {" "}
                          <h6 style={{ color: "#ffff", backgroundColor: "" }}>
                            {profileData?.playerProfile?.followers}
                            <span style={{ paddingLeft: "7px" }}>Follwers</span>
                          </h6>
                        </Col>
                        <Col lg={3}>
                          {" "}
                          <h6 style={{ color: "#ffff", backgroundColor: "" }}>
                            {profileData?.playerProfile?.following}{" "}
                            <span style={{ paddingLeft: "7px" }}>
                              Following
                            </span>
                          </h6>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Row>
              <Row className="px-2">
                <Col md={6}>
                  <div
                    onClick={() => setProfileType("Basic")}
                    className="d-flex align-items-center justify-content-center py-2"
                    style={{
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "8PX",
                      background:
                        profileType == "Basic"
                          ? "linear-gradient(90.46deg, #F27825 0.4%, #9747FF 99.66%)"
                          : "#2D2D2D",
                    }}
                  >
                    <h5>Basic</h5>
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    onClick={() => setProfileType("Advanced")}
                    className="d-flex align-items-center justify-content-center py-2"
                    style={{
                      color: "white",
                      borderRadius: "8PX",
                      cursor: "pointer",
                      background:
                        profileType == "Advanced"
                          ? "linear-gradient(90.46deg, #F27825 0.4%, #9747FF 99.66%)"
                          : "#2D2D2D",
                    }}
                  >
                    <h5>Advanced</h5>
                  </div>
                </Col>
              </Row>
              <div>
                <Row>
                  <div style={{ padding: "20px" }}>
                    <Accordion
                      open={open}
                      toggle={toggle}
                      className="custom-accordion"
                    >
                      {sportsData?.playerSportsProfile?.data?.map(
                        (item, index) => (
                          <AccordionItem
                            key={item.id}
                            style={{ background: "#2d2d2d", border: "none" }}
                          >
                            <AccordionHeader
                              targetId={index}
                              style={{ background: "#2d2d2d", color: "#fff" }}
                              className="my-2 accordion-header-white-icon"
                            >
                              <div className="d-flex align-items-center">
                                {/* Radio button instead of checkbox */}
                                <input
                                  type="radio"
                                  name="sportProfile"
                                  checked={selectedProfileId === item.id}
                                  onChange={(e) =>
                                    handleProfileSelection(e, item.id)
                                  }
                                  style={{
                                    marginRight: "10px",
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                  }}
                                />

                                <div
                                  className="folder-player-card"
                                  style={{
                                    border: "none",
                                    background: "#2d2d2d",
                                    boxShadow: "none",
                                  }}
                                >
                                  {item?.profile_type === "Advanced" &&
                                    item?.profile_detail?.sports_info
                                      ?.sport_picture && (
                                      <img
                                        src={`${import.meta.env.VITE_BASE_URL_IMAGE
                                          }${item.profile_detail.sports_info
                                            .sport_picture
                                          }`}
                                        alt={"Sport profile"}
                                        className="player-img"
                                        height={40}
                                      />
                                    )}
                                  {item?.profile_type === "Basic" &&
                                    item?.profile_detail?.sport_picture && (
                                      <img
                                        src={`${import.meta.env.VITE_BASE_URL_IMAGE
                                          }${item.profile_detail.sport_picture}`}
                                        alt={"Sport profile"}
                                        className="player-img"
                                        height={40}
                                      />
                                    )}

                                  <div
                                    className="player-info"
                                    style={{ paddingLeft: "30px" }}
                                  >
                                    <div className="player-name">
                                      {
                                        profileData?.playerProfile?.user
                                          ?.full_name
                                      }{" "}
                                      - {item?.sport?.name}
                                    </div>
                                    <div className="profile-type-badge">
                                      {item.profile_type} Profile
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionHeader>
                            <AccordionBody
                              accordionId={index}
                              style={{ background: "#2d2d2d", color: "#fff" }}
                            >
                              {/* Profile details remain the same */}
                              {item?.profile_type === "Advanced" ? (
                                <>
                                  <h4 className="my-4">Sports info</h4>
                                  <div className="profile-detail-row">
                                    <h6>Sports Name</h6>
                                    <h6>{item?.sport?.name}</h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Dominant hand</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.dominant_hand
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Jersey no</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.jersey_no
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Team Name</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.team_name
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Positions</h6>
                                    <h6>
                                      {item?.profile_detail?.sports_info?.positions?.join(
                                        ", "
                                      )}
                                    </h6>
                                  </div>

                                  <h4 className="my-4">Career Stats</h4>
                                  <div className="profile-detail-row">
                                    <h6>Awards</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.career_stats
                                          ?.awards
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6> Highlights </h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.career_stats
                                          ?.highlights
                                      }
                                    </h6>
                                  </div>

                                  <h4 className="my-4">Academic Info</h4>
                                  <div className="profile-detail-row">
                                    <h6> Year </h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.year
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6> Address </h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.address
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6> Highschool </h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.highschool
                                      }
                                    </h6>
                                  </div>

                                  <h4 className="my-4">
                                    Recruiting Preferences
                                  </h4>
                                  <div className="profile-detail-row">
                                    <h6>Direct phone</h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences?.direct_phone
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6> Coach Trainer </h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences
                                          ?.coach_trainer
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6> Preferred college </h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences
                                          ?.preferred_college
                                      }
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Scholarship Offers</h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences
                                          ?.scholarship_offers
                                      }
                                    </h6>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="profile-detail-row">
                                    <h6>Sports Name</h6>
                                    <h6>{item?.sport?.name}</h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Dominant hand</h6>
                                    <h6>
                                      {item?.profile_detail?.dominant_hand}
                                    </h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Jersey no</h6>
                                    <h6>{item?.profile_detail?.jersey_no}</h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Team Name</h6>
                                    <h6>{item?.profile_detail?.team_name}</h6>
                                  </div>
                                  <div className="profile-detail-row">
                                    <h6>Positions</h6>
                                    <h6>
                                      {item?.profile_detail?.positions?.join(
                                        ", "
                                      )}
                                    </h6>
                                  </div>
                                </>
                              )}
                            </AccordionBody>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  </div>
                </Row>

                <Row>
                  <Col lg={7}></Col>
                  <Col lg={4}>
                    <div style={{ paddingTop: "25px" }}>
                      <Button
                        onClick={handleSelectProfile}
                        color="warning"
                        disabled={!selectedProfileId}
                        style={{
                          borderRadius: "18px",
                          width: "100%",
                          minWidth: "160px",
                          fontWeight: 600,
                          opacity: selectedProfileId ? 1 : 0.7,
                          cursor: selectedProfileId ? "pointer" : "not-allowed",
                        }}
                      >
                        Select Sport profile
                      </Button>
                    </div>
                  </Col>
                  <Col lg={1}></Col>
                </Row>

                <style>{`
        .profile-detail-row {
          margin-top: 25px;
          padding: 2px;
          border-bottom: 1px solid #575050;
          display: flex;
          justify-content: space-between;
        }

        .profile-type-badge {
          background: #f0ad4e;
          color: #2d2d2d;
          border-radius: 12px;
          padding: 2px 10px;
          font-size: 0.8rem;
          font-weight: bold;
          margin-top: 5px;
          display: inline-block;
        }

        .folder-player-card {
          display: flex;
          align-items: center;
        }

        .player-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .player-info {
          padding-left: 15px;
        }

        .player-name {
          font-weight: bold;
          font-size: 1.1rem;
        }
      `}</style>
              </div>
            </div>
          </>
        </Modal>

        <style>
          {`
/* Make accordion expand/collapse icon white */
.accordion-header-white-icon .accordion-button::after,
.accordion-header-white-icon[aria-expanded="true"] .accordion-button::after {
filter: brightness(0) invert(1);
}
/* Remove default background on accordion button if any */
.accordion-header-white-icon .accordion-button {
background: transparent !important;
color: #fff !important;
}
`}
        </style>
      </div>
    </Container>
  );
}
