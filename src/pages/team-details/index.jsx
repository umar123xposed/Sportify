import React, { useEffect, useState } from "react";
import "./index.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Col, Container, Modal, Row } from "reactstrap";

import { All_teamMembersByTeamId, GET_PLAYERPROFILE_BY_ID, GET_PROFILE, GET_TEAM_DETAILS, Sport_List } from "../../graphql/query/query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchPlayerModal from "../../components/modules/searchPlayer";
import qr from "./../../assets/qr.png";
import right_qr from "./../../assets/right_qr.png";
import RIPL from "../../assets/RIPL.png"
import coachas from "./.././../assets/coach.png";
import Loader from "react-spinner-loader"
import EditTeamDetail from "../../components/modules/editTeamDetail";
import Swal from "sweetalert2";
import SearchPlayerModal1 from "../../components/modules/searchPlayer1";
import { Update_Team_Members } from "../../graphql/mutation";
import toast from "react-hot-toast";
import SearchCoachModal from "../../components/modules/searchCoach";
import SearchCoachModal1 from "../../components/modules/searchCoach1";


const PlayerCard = ({ player, onCardClick, handleDelete, userId, teamUserId }) => {
  // Handler for clicking the card or arrow
  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log('Profile card clicked:', player);
    if (onCardClick) {
      onCardClick(player); // Call the passed handler with player/coach data
    }
    // navigate(`/coach/player?id=${player?.id}`, { state: player });
    // Implement navigation or show player details
    // navigate(`/player-details/${player.id}`); // Example navigation - moved to parent if using modal
  };


  return (
    <Col lg={4} md={6} className="py-4">
      <div className="player-card-team" onClick={handleCardClick}>
        <div className="player-image">
          <img
            async
            src={
              player?.user?.picture
                ? import.meta.env.VITE_BASE_URL_IMAGE + player.user?.picture
                : RIPL
            }
            className="border border-secondary rounded-circle"
            alt={player.user?.full_name}
          />
        </div>
        <div className="player-info">

          <div className="player-name w-100" style={{ color: "white" }}>
            {player?.user?.full_name} -{" "}
            {player?.player_profile_detail?.sport?.name}
          </div>

          <div
            className="player-name"
            style={{ color: "white", fontSize: "12px" }}
          >
            <h3 style={{ fontSize: "12px" }}>
              ID: {player?.player_profile_detail?.players_profile?.player_id}
            </h3>
          </div>
          {
            player?.player_profile_detail?.profile_type === "Basic" ? (
              <div className="player-position">
                {player?.player_profile_detail?.profile_detail?.positions?.join(" / ") ||
                  player.players_profile?.user?.role}
              </div>
            ) : (
              <div className="player-position">
                {player?.player_profile_detail?.profile_detail?.sports_info?.positions?.join(" / ") ||
                  player.players_profile?.user?.role}
              </div>
            )
          }
          {
            player?.player_profile_detail?.profile_type === "Basic" ? (
              <>
                {player?.player_profile_detail?.profile_detail?.jersey_no !== undefined && player?.player_profile_detail?.profile_detail?.jersey_no !== null && (
                  <div className="player-jersey">
                    Jersey Number: {player?.player_profile_detail?.profile_detail?.jersey_no == 0 ? "N/A" : player?.player_profile_detail?.profile_detail?.jersey_no}
                  </div>
                )}
              </>
            ) : (
              <>
                {player?.player_profile_detail?.profile_detail?.sports_info?.jersey_no !== undefined && player?.player_profile_detail?.profile_detail?.sports_info?.jersey_no !== null && (
                  <div className="player-jersey">
                    Jersey Number: {player?.player_profile_detail?.profile_detail?.sports_info?.jersey_no}
                  </div>
                )}
              </>
            )}
          <div
            className=" d-flex  mt-2"
            style={{ color: "white", fontSize: "12px" }}
          >
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "12px",
                padding: "2px 12px",
                width: "auto",
              }}
            >
              {player?.status}
            </div>
          </div>

        </div>
        {/* <div className="player-arrow"> */}
        {
          console.log(userId, teamUserId)
        }
        {
          (userId === teamUserId) && (
            <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleDelete(player?.player_profile_detail?.id)
              }}
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          )
        }


        {/* </div> */}
      </div>
    </Col >
  );
};

const CoachCard = ({ coach, onCardClick, handleDelete, userId, teamUserId }) => {
  // Handler for clicking the card or arrow
  const handleCardClick = () => {
    console.log('Profile card clicked:', coach);
    if (onCardClick) {
      onCardClick(coach); // Call the passed handler with player/coach data
    }
    // Implement navigation or show player details
    // navigate(`/player-details/${player.id}`); // Example navigation - moved to parent if using modal
  };


  return (
    <Col lg={4} md={6} className="py-4">
      <div className="player-card-team" onClick={handleCardClick}>
        <div className="player-image">
          <img
            src={
              coach?.user?.picture
                ? import.meta.env.VITE_BASE_URL_IMAGE + coach.user?.picture
                : coachas
            }
            alt={coach.user?.full_name}
          />
        </div>

        <div className="player-info">

          <div className="player-name" style={{ color: "white" }}>
            {coach.user?.full_name}
          </div>
          <div className="player-position">
            {coach.user?.position || coach.user?.role}
          </div>
          {
            coach?.id != null &&
            <div
              className=" d-flex  w-100 "
              style={{ color: "white", fontSize: "12px" }}
            >
              <div
                style={{
                  backgroundColor: "green",
                  borderRadius: "12px",
                  padding: "2px 12px",
                  width: "auto",
                }}
              >
                {coach?.status}
              </div>
            </div>
          }

          {
            coach?.id == null &&
            <div
              className=" d-flex  w-100 "
              style={{ color: "white", fontSize: "12px" }}
            >
              <div
                className="primary-btn py-1 px-2 text-black"
              >
                Head Coach
              </div>
            </div>
          }

        </div>

        {

          ((userId === teamUserId) && (coach?.id != null)) && (
            <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleDelete(coach?.user?.id)
              }}
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          )
        }

      </div>
    </Col>
  );
};


const TeamDetails = () => {

  const single = useSelector((state) => state.profileSlice?.PackageName)
  const action = useSelector((state) => state.profileSlice.action)
  const user = useSelector((state) => state.authSlice.user)

  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [sportsData, setSportData] = useState(null);
  const [currendPlayer, setCurrentPLayer] = useState(null);
  const [profileType, setProfileType] = useState("Basic");
  const [profileData, setProfileData] = useState(null); // new state for result
  const [showModel, setShowModel] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [coach, setCoach] = useState([]);
  const [errorTag, setErrorTag] = useState(null);

  const [state, setState] = useState({
    activeTab: "players",
    isProfileModalOpen: false,
    selectedProfile: false,
    isQRModalOpen: false,
    addModal: false,
    addModal1: false,
    type: "Player"
  })


  const [teamData, setTeamData] = useState({
    id: '',
    team_id: '',
    name: '',
    logo: '',
    win: 0,
    loss: 0,
    tie: 0,
    team_level: '',
    playersCount: 0,
    coachesCount: 0,
    creator: "",
    players: [],
    coaches: [],
    creator: null,
    creatorid: "",
    qr_code: '',
    modal: false,
    detail: null,
    loader: true,
    loader1: false,
    detail: null,
    detail1: null,
    activeData: false
  });

  const [memberDetail] = useLazyQuery(All_teamMembersByTeamId);
  const [GetDetails] = useLazyQuery(GET_TEAM_DETAILS);
  const [Add_Member] = useMutation(Update_Team_Members)

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

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        loader: true,
      }))
      try {
        const { data } = await GetDetails({
          variables: {
            getTeamDetailId: parseInt(id),

          },
          fetchPolicy: "no-cache",
        });

        if (data) {
          setState((prev) => ({
            ...prev,
            loader: false,
            detail: data,
          }))
        }
      } catch (e) {
        console.log(e)
        setState((prev) => ({
          ...prev,
          loader: false,
        }))
      }
    }
    !teamData?.modal && fetchData()
  }, [teamData?.modal])

  useEffect(() => {
    const fetchData1 = async () => {
      setState((prev) => ({
        ...prev,
        loader1: true,
      }))
      try {
        const { data } = await memberDetail({

          variables: {
            input: {
              cursor: null,
              invite_type: null,
              limit: 50,
              teamId: parseInt(id, 10),
              type: state?.type,
            },
          },
          fetchPolicy: "no-cache",
        });

        if (data) {
          setState((prev) => ({
            ...prev,
            loader1: false,
            detail1: data,
          }))
        }
      } catch (e) {
        console.log(e)
        setState((prev) => ({
          ...prev,
          loader1: false,
        }))
      }
    }

    fetchData1()
  }, [state?.type])

  useEffect(() => {
    const fetchData1 = async () => {

      try {
        const { data } = await memberDetail({

          variables: {
            input: {
              cursor: null,
              invite_type: null,
              limit: 50,
              teamId: parseInt(id, 10),
              type: state?.type,
            },
          },
          fetchPolicy: "no-cache",
        });

        if (data) {
          setState((prev) => ({
            ...prev,
            loader1: false,
            detail1: data,
          }))
        }
      } catch (e) {
        console.log(e)
        setState((prev) => ({
          ...prev,
          loader1: false,
        }))
      }
    }

    (!state?.addModal || !state?.addModal1) && fetchData1()
  }, [teamData?.activeData, state?.addModal, state?.addModal1])


  const handleTabChange = (tab) => {
    setState((prev) => ({
      ...prev,
      activeTab: tab
    }))

  };

  const handleProfileClick = (profile) => {
    setState((prev) => ({
      ...prev,
      selectedProfile: profile,
      isProfileModalOpen: true
    }))

  };

  const toggleProfileModal = () => {
    setState((prev) => ({
      ...prev,
      isProfileModalOpen: !state.isProfileModalOpen
    }))
  };

  const toggleQRModal = () => {
    setState((prev) => ({
      ...prev,
      isQRModalOpen: !state.isQRModalOpen
    }))
  };

  const toggle = (info) => {
    setTeamData((prev) => ({
      ...prev,
      modal: !teamData?.modal,
      detail: info,
      active: !teamData?.active
    }))
  }

  const handleDelete = async (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      background: "#1e1e1e", // Dark background
      borderColor: "white",
      color: "#ffffff",       // Light text
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Add_Member({
            variables: {
              "input": {
                "is_add": false,
                "memberIds": [id],
                "teamId": parseInt(searchParams.get("id")),
                "type": "Player"
              }
            }
          });

          if (response) {
            setTeamData((prev) => ({
              ...prev,
              activeData: !teamData?.activeData
            }))
            console.log("Team created:", response);
            toast.success(response?.data?.updateTeamMembers?.message)

            // navigate(`/coach/team-details?id=${response?.data?.createTeam?.data?.id}`);
          }

        } catch (error) {
          console.error("Error creating team:", error);

        }
      }
    });

  }

  const handleDelete1 = async (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      background: "#1e1e1e", // Dark background
      borderColor: "white",
      color: "#ffffff",       // Light text
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Add_Member({
            variables: {
              "input": {
                "is_add": false,
                "memberIds": [id],
                "teamId": parseInt(searchParams.get("id")),
                "type": "Coach"
              }
            }
          });

          if (response) {
            console.log("Team created:", response);
            toast.success(response?.data?.updateTeamMembers?.message)
            setTeamData((prev) => ({
              ...prev,
              activeData: !teamData?.activeData
            }))
            // navigate(`/coach/team-details?id=${response?.data?.createTeam?.data?.id}`);
          }

        } catch (error) {
          console.error("Error creating team:", error);

        }
      }
    });

  }

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

  const toggleAcc = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleProfileSelection = (e, profileId) => {
    e.stopPropagation();
    setSelectedProfileId(profileId);
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
    // setErrorCoach(null);
    // Optionally clear input field (if applicable)
  };



  return (
    <div className="team-page-container">
      {
        (state?.loader) ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"

              color="red"
            />
          </div>
        ) : (
          <Container>
            {/* Team Header Section */}

            <div className="team-header">
              <Row className="align-items-center">
                <Col md={6} xl={6} lg={6}>
                  <div className="team-logo-section">
                    <div className="d-flex align-items-center justify-content-center w-100 mb-3">
                      <img
                        async
                        src={
                          state?.detail?.getTeamDetail?.logo
                            ? `${import.meta.env.VITE_BASE_URL_IMAGE}${state?.detail?.getTeamDetail?.logo
                            }`
                            : RIPL
                        }
                        alt={state?.detail?.getTeamDetail?.name}
                        className="team-logo"
                        style={{
                          width: "140px", // or any fixed size
                          height: "140px",
                          borderRadius: "50%",
                          objectFit: "cover", // ensures image covers the circle nicely
                        }}
                      />

                      <h2 className="team-name">
                        {state?.detail?.getTeamDetail?.name}
                      </h2>
                    </div>

                    <div className="team-info">
                      <div className="d-flex justify-content-between">
                        <p className="team-counts">Team ID: </p>
                        <p className="coach-name-tag">
                          {state?.detail?.getTeamDetail?.team_id}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="team-counts">Head Coach: </p>
                        <p className="coach-name-tag">
                          {state?.detail?.getTeamDetail?.user?.full_name}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="team-counts">Team Level </p>
                        <p className="coach-names">
                          <span className="coach-name-tag">
                            {state?.detail?.getTeamDetail?.team_level}
                          </span>
                        </p>
                      </div>
                      {state?.detail?.getTeamDetail?.website_url && (
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="team-counts mb-0">Team Website URL</p>
                          <a
                            href={state.detail.getTeamDetail.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="coach-name-tag"
                            style={{ textDecoration: "underline", color: "white" }}
                          >
                            Visit Website
                          </a>
                        </div>
                      )}

                    </div>
                  </div>
                </Col>
                <Col md={6} xl={6} lg={6}>

                  {user?.data?.id === state?.detail?.getTeamDetail?.user?.id && (
                    <div className="d-flex justify-content-end align-items-start mb-4">
                      <button
                        className="edit-team-btn mx-1"
                        onClick={() => toggle(state?.detail)}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.23047 5.5H3.23047C2.70004 5.5 2.19133 5.71071 1.81626 6.08579C1.44118 6.46086 1.23047 6.96957 1.23047 7.5V16.5C1.23047 17.0304 1.44118 17.5391 1.81626 17.9142C2.19133 18.2893 2.70004 18.5 3.23047 18.5H12.2305C12.7609 18.5 13.2696 18.2893 13.6447 17.9142C14.0198 17.5391 14.2305 17.0304 14.2305 16.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M13.2305 3.50011L16.2305 6.50011M17.6155 5.08511C18.0093 4.69126 18.2306 4.15709 18.2306 3.60011C18.2306 3.04312 18.0093 2.50895 17.6155 2.11511C17.2216 1.72126 16.6875 1.5 16.1305 1.5C15.5735 1.5 15.0393 1.72126 14.6455 2.11511L6.23047 10.5001V13.5001H9.23047L17.6155 5.08511Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        Edit Details
                      </button>

                      {/* {
                        (single !== "Single") && (
                          <button
                            className="edit-team-btn mx-1"
                            onClick={() => navigate(`/create-team-coach`)}
                            disabled={single === "Single" || action === "Join"}
                          >
                            <svg
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a1.5 1.5 0 0 1 0 2.12l-1.086 1.086-2.12-2.12 1.086-1.086a1.5 1.5 0 0 1 2.12 0zm-2.561 2.561-2.12-2.12L1 10.44V13h2.56l9.38-9.38z"></path>
                            </svg>
                            Add Team
                          </button>
                        )
                      } */}

                    </div>
                  )}

                  <Row className="team-stats-row">
                    <Col className="stattttt">
                      <div className="team-stats wins-box d-flex justify-content-center align-items-center flex-column">
                        <div className="stat-label">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2m2.707 3.707a1 1 0 0 0-1.414-1.414L7 6.586 5.707 5.293a1 1 0 0 0-1.414 1.414L7 9.414l3.707-3.707Z"
                            />
                          </svg>
                          Wins
                        </div>
                        <div className="stat-value wins">
                          {state?.detail?.getTeamDetail?.win}
                        </div>
                      </div>
                    </Col>
                    <Col className="stattttt">
                      <div className="team-stats losses-box d-flex justify-content-center align-items-center flex-column">
                        <div className="stat-label">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m4.646-2.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                          Losses
                        </div>
                        <div className="stat-value losses">
                          {state?.detail?.getTeamDetail?.loss}
                        </div>
                      </div>
                    </Col>
                    <Col className="stattttt">
                      <div className="team-stats losses-box d-flex justify-content-center align-items-center flex-column">
                        <div className="stat-label">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.778 3.278a.5.5 0 0 1 0 .707l-4.5 4.5a.5.5 0 0 1-.707 0L7 5.914l-2.571 2.57a.5.5 0 0 1-.707-.707l3-3a.5.5 0 0 1 .707 0l2.571 2.57 4.147-4.146a.5.5 0 0 1 .707 0z" />
                            <path d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 1.5 1z" />
                          </svg>
                          Tie
                        </div>
                        <div className="stat-value tie">
                          {state?.detail?.getTeamDetail?.tie}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={toggleQRModal}
                        className="gold_card w-100  pe-3"
                      >
                        <Row className="">
                          <Col className=" bg-right " md={6}>
                            <div className="ms-3 h-100 d-flex align-items-center">
                              <img async className="me-3" src={qr} />
                              <h3>View QR Code </h3>{" "}
                            </div>
                          </Col>
                          <Col className=" pe-3" md={6}>
                            <div className="ms-3 h-100 justify-content-end d-flex align-items-center">
                              <img async className="me-1" src={right_qr} />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="25"
                                viewBox="0 0 15 25"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.0822 13.8801L3.45435 24.5079L0.797852 21.8514L10.0975 12.5518L0.797852 3.2522L3.45435 0.595703L14.0822 11.2236C14.4344 11.5759 14.6323 12.0536 14.6323 12.5518C14.6323 13.05 14.4344 13.5278 14.0822 13.8801Z"
                                  fill="white"
                                />
                              </svg>{" "}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>



            {/* QR Code Modal */}
            <Modal
              isOpen={
                // state?.detail?.getTeamDetail?.user?.id == user?.data?.id
                //   ? 
                state?.isQRModalOpen
                // : false
              }
              toggle={toggleQRModal}
              centered
              size="sm"
            >
              <div className="profile-modal-content text-center">
                <button
                  type="button"
                  className="close-button-modal"
                  onClick={toggleQRModal}
                >
                  &times;
                </button>
                <h2 className="profile-modal-title">Team QR Code</h2>
                {state?.detail?.getTeamDetail?.qr_code ? (
                  <img
                    async
                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${state?.detail?.getTeamDetail?.qr_code
                      }`}
                    alt="Team QR Code"
                    style={{ width: "200px", height: "200px", margin: "0 auto" }}
                  />
                ) : (
                  <p>No QR code available.</p>
                )}
                <div className="mt-3">
                  <span className="team-id-label">
                    Team ID: {state?.detail?.getTeamDetail?.team_id}
                  </span>
                </div>
              </div>
            </Modal>

            <EditTeamDetail
              isOpen={teamData?.modal}
              handleToggle={toggle}
              sportData={teamData?.detail}

            />

            <>
              {/* Tabs Section */}
              <div className="team-tabs mt-4">
                <button
                  className={`tab-button ${state?.activeTab === "players" ? "active" : ""}`}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      type: "Player"
                    }))

                    handleTabChange("players");
                  }}
                >
                  {`All Players (${state?.detail?.getTeamDetail?.players_count})`}
                </button>
                <button
                  className={`tab-button ${state?.activeTab === "coaches" ? "active" : ""}`}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      type: "Coach"
                    }))
                    handleTabChange("coaches");
                  }}
                >
                  {`All Coaches (${state?.detail?.getTeamDetail?.coaches_count})`}
                </button>
              </div>

              {/* Content Area (Player Grid or Coach List) */}
              {
                state?.loader1 ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                    <Loader show={true}
                      spinnerSize="60px"
                      radius="10"

                      color="red"
                    />
                  </div>
                ) : (
                  <div className="container tab-content mt-4">
                    {state?.activeTab === "players" && (
                      <>
                        <div className="d-flex justify-content-between align-items-center gap-3">
                          <h3 className="team-name">
                            Players
                          </h3>
                          {user?.data?.id === state?.detail?.getTeamDetail?.user?.id && (
                            <button className="primary-btn py-3 px-4" onClick={(e) => {
                              setState((prev) => ({
                                ...prev,
                                addModal: true
                              }))
                            }}>
                              Add Player
                            </button>
                          )}
                        </div>

                        <Row className="">
                          {
                            console.log(state?.detail1?.teamMembersByTeamId?.data)
                          }
                          {state?.detail1?.teamMembersByTeamId?.data
                            ?.slice()
                            ?.sort((a, b) => {
                              const jerseyA =
                                a?.player_profile_detail?.profile_detail?.sports_info?.jersey_no ??
                                a?.player_profile_detail?.profile_detail?.jersey_no ??
                                0;

                              const jerseyB =
                                b?.player_profile_detail?.profile_detail?.sports_info?.jersey_no ??
                                b?.player_profile_detail?.profile_detail?.jersey_no ??
                                0;

                              // If A is 0 or falsy, place it after B
                              if (!jerseyA && jerseyB) return 1;
                              if (!jerseyB && jerseyA) return -1;

                              return jerseyA - jerseyB;
                            })
                            ?.map((player) => (
                              <PlayerCard
                                key={player.id}
                                player={player}
                                onCardClick={handleProfileClick}
                                handleDelete={handleDelete}
                                userId={user?.data?.id}
                                teamUserId={state?.detail?.getTeamDetail?.user?.id}
                              />
                            ))}

                        </Row>

                      </>
                    )}
                    {state?.activeTab === "coaches" && (
                      <>
                        <div className="d-flex justify-content-between align-items-center gap-3">
                          <h3 className="team-name">
                            Coaches
                          </h3>
                          {user?.data?.id === state?.detail?.getTeamDetail?.user?.id && (
                            <button className="primary-btn py-3 px-4"
                              onClick={() => {
                                setState((prev) => ({
                                  ...prev,
                                  addModal1: true
                                }))
                              }}>
                              Add Coach
                            </button>
                          )}
                        </div>

                        <Row className="">

                          {state?.detail1?.teamMembersByTeamId?.data?.map((coach) => (
                            <CoachCard
                              key={coach.id}
                              coach={coach}
                              onCardClick={handleProfileClick}
                              handleDelete={handleDelete1}
                              userId={user?.data?.id}
                              teamUserId={state?.detail?.getTeamDetail?.user?.id}
                            />
                          ))}
                        </Row>

                      </>
                    )}
                  </div>
                )
              }
            </>

          </Container>
        )}

      {state?.addModal && (
        <SearchPlayerModal1
          setShow={(val) =>
            setState((prev) => ({
              ...prev,
              addModal: val,
            }))
          }
          show={state?.addModal}
          // handleOnclick={handleAddPlayer}
          id={searchParams.get("id")}
          handleOnclick={handleAddPlayer}
          setTags={setTags}
          tags={tags}
        />
      )}

      {state?.addModal1 && (
        <SearchCoachModal1
          setShow={(val) =>
            setState((prev) => ({
              ...prev,
              addModal1: val
            }))
          }
          id={searchParams.get("id")}
          show={state?.addModal1}
          handleCoachOnClick={handleCoachOnClick}
          setCoaches={setCoach}
          coaches={coach}
        />
      )}

      {/* Player/Coach Profile Modal */}
      <Modal
        isOpen={state?.isProfileModalOpen}
        toggle={toggleProfileModal}
        centered
        size="md"
      >
        <div className="profile-modal-content">
          <button
            type="button"
            className="close-button-modal"
            onClick={toggleProfileModal}
          >
            &times;
          </button>
          <div className="profile-modal-body">
            {
              state?.selectedProfile?.player_profile_detail == null && (
                <>
                  <h2 className="profile-modal-title">Profile Details</h2>
                  <div className="profile-modal-image-container">
                    <img
                      async
                      src={
                        state?.selectedProfile?.user?.picture ?
                          (import.meta.env.VITE_BASE_URL_IMAGE + state?.selectedProfile?.user?.picture) :
                          coachas
                      }
                      alt={state?.selectedProfile.players_profile?.user?.full_name}
                      className="profile-modal-imag0e border border-secondary rounded-circle"
                    />
                  </div>
                  <div className="profile-modal-details">
                    <div className="detail-line">
                      <span>Full Name:</span>
                      <span>{state?.selectedProfile?.user?.full_name || "-"}</span>
                    </div>
                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Email:</span>
                      <span>{state?.selectedProfile?.user?.email || "-"}</span>
                    </div>
                  </div>
                </>
              )
            }
            {state?.selectedProfile?.player_profile_detail?.profile_type ==
              "Basic" && (
                <>
                  <h2 className="profile-modal-title">Profile Details</h2>
                  <div className="profile-modal-image-container">
                    <img
                      async
                      src={
                        import.meta.env.VITE_BASE_URL_IMAGE +
                        state?.selectedProfile?.user?.picture
                      }
                      alt={state?.selectedProfile.players_profile?.user?.full_name}
                      className="profile-modal-image"
                    />
                  </div>
                  <div className="profile-modal-details">
                    <div className="detail-line">
                      <span>Full Name:</span>
                      <span>{state?.selectedProfile?.user?.full_name || "-"}</span>
                    </div>
                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Nick Name:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.players_profile
                          ?.nick_name || "-"}
                      </span>
                    </div>
                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Jersey no:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.profile_detail
                          ?.jersey_no || "-"}
                      </span>
                    </div>

                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Position:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.profile_detail?.positions?.map(
                          (p) => <span className="coach-name-tag">{p}</span>
                        ) || "-"}
                      </span>
                    </div>
                  </div>
                </>
              )}

            {state?.selectedProfile?.player_profile_detail?.profile_type ==
              "Advanced" && (
                <>
                  <h2 className="profile-modal-title">Profile Details</h2>
                  <div className="profile-modal-image-container">
                    <img
                      async
                      src={
                        import.meta.env.VITE_BASE_URL_IMAGE +
                        state?.selectedProfile?.user?.picture
                      }
                      alt={state?.selectedProfile.players_profile?.user?.full_name}
                      className="profile-modal-image"
                    />
                  </div>
                  <div className="profile-modal-details">
                    <div className="detail-line">
                      <span>Full Name:</span>
                      <span>{state?.selectedProfile?.user?.full_name || "-"}</span>
                    </div>
                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Nick Name:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.players_profile
                          ?.nick_name || "-"}
                      </span>
                    </div>
                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Jersey no:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.profile_detail
                          ?.sports_info?.jersey_no || "-"}
                      </span>
                    </div>

                    <hr className="detail-separator" />
                    <div className="detail-line">
                      <span>Position:</span>
                      <span>
                        {state?.selectedProfile?.player_profile_detail?.profile_detail?.sports_info?.positions?.map(
                          (p) => <span className="coach-name-tag">{p}</span>
                        ) || "-"}
                      </span>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </Modal>
      <Modal backdrop={false} size="lg" centered isOpen={showModel}>
        <>
          <div className="solid-card">
            <div className="d-flex justify-content-end mb-3">
              <svg
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowModel(false)
                  setProfileType("Basic")
                }}
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
                  <div className="player-name text-white">
                    {profileData?.playerProfile?.user?.full_name}{" "}
                    {
                      profileData?.playerProfile?.nick_name && (
                        <span style={{ color: "gray" }}>
                          ({profileData?.playerProfile?.nick_name})
                        </span>
                      )
                    }

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
                    toggle={toggleAcc}
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
                                  <div className="player-name text-white">
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
                                        ?.coach_trainer || "-"
                                    }
                                  </h6>
                                </div>
                                <div className="profile-detail-row">
                                  <h6> Preferred college </h6>
                                  <h6>
                                    {
                                      item?.profile_detail
                                        ?.recruiting_preferences
                                        ?.preferred_college || "-"
                                    }
                                  </h6>
                                </div>
                                <div className="profile-detail-row">
                                  <h6>Scholarship Offers</h6>
                                  <h6>
                                    {
                                      item?.profile_detail
                                        ?.recruiting_preferences
                                        ?.scholarship_offers || "-"
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
    </div>
  );
};

export default TeamDetails;
