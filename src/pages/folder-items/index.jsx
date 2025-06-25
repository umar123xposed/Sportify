import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import SearchPlayerModal from "../../components/modules/searchPlayer";
import MovePlayersModal from "./MovePlayersModal";
import { Get_ALL_FOLDERS, Get_All_Sports, GET_FOLDER_BY_ID, GET_FOLDER_DETAILS, GET_PLAYERPROFILE_BY_ID, Sport_List } from "../../graphql/query/query";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Button, Col, Input, Modal, Row } from "reactstrap";
import {
  AddPlayerToFolder,
  RemoveOrMovePlayerFromFolderCall,
} from "../../graphql/mutation";
import toast from "react-hot-toast";
const dummyPlayers = [
  { id: 1, name: "Jack - Lacrosse", badge: "Basic", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jack - Lacrosse", badge: "Advance", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Jack - Lacrosse", badge: "Advance", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "Jack - Lacrosse", badge: "Basic", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Jack - Lacrosse", badge: "Advance", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, name: "Jack - Lacrosse", badge: "Basic", tags: "Left Handed, Fast Runner.", img: "https://randomuser.me/api/portraits/men/6.jpg" },
];

const FolderItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [profileData, setProfileData] = useState(null); // new state for result
  const [sportsData, setSportData] = useState(null); // new state for result


  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [currendPlayer, setCurrentPLayer] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [page , setPage ] = useState(1)
  const [profileType, setProfileType] = useState("Basic");
  const [selectCurrentFolder, setSelectCurrentFolder] = useState(null);
  const [cursor , setCursor ] = useState(null)
  const [folderSearchInput, setFolderSearchInput] = useState("");
  const [debouncedFolderSearch, setDebouncedFolderSearch] = useState("");

const [steps, setSteps] = useState(1);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput?.trim();
    if (trimmed && !tags?.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
      setError(""); // clear error if a tag is added
    }
  };

  const handleRemoveTag = (index) => {
    const updated = [...tags];
    updated?.splice(index, 1);
    setTags(updated);
  };

  const handleNext = () => {
    if (tags.length === 0) {
      setError("At least one tag is required.");
    } else {
      // Submit tags
      console.log("Tags submitted:", tags);
      setSteps(2);
    }
  };


  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    console.log(selectAll, "what is thsaas");

    const allIds = folderInnerData?.getFolderPlayer?.data?.player
      ?.map((p) => p.players_profile?.id)
      .filter(Boolean); // ensures only valid ids
    setSelected(!selectAll ? allIds : []);
  };

  const {
    data: folderInnerData,
    loading,
    refetch,
  } = useQuery(GET_FOLDER_DETAILS, {
    variables: {
      input: {
        cursor: null,
        limit: 50,
        folder_id: Number(id),
      },
    },
  });



  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedFolderSearch(folderSearchInput);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [ folderSearchInput ]);


  const {
    loading: loading3,
    error: error3,
    data: AllFolders,
    refetch: refetchFolders,
  } = useQuery( Get_ALL_FOLDERS, {
    variables: {
      input: {
        cursor: null,
        excludeId: null,
        limit: 50,
        search: debouncedFolderSearch,
      },
    },
    fetchPolicy: "no-cache",
  });

  // Optional: re-trigger refetch on debounce change
  // useEffect(() => {
  //   refetchFolders({
  //     input: {
  //       cursor: null,
  //       excludeId: null,
  //       limit: 3,
  //       search: debouncedFolderSearch,
  //     },
  //   });
  // }, [debouncedFolderSearch]);

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

   const [addPlayerToFolder] = useMutation(AddPlayerToFolder);
   const [removeOrMovePlayerFromFolder] = useMutation(
     RemoveOrMovePlayerFromFolderCall
   );

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

  const handleSelect = (id) => {
    setSelected(
      (prevSelected) =>
        prevSelected?.includes(id)
          ? prevSelected.filter((i) => i !== id)
          : [...(prevSelected || []), id] // fallback in case prevSelected is null
    );
  };

  // Dummy handler for adding a player

 const handleAddPlayer = async (e, player) => {
    console.log(player, "what asfsaf");
    setShowModel(true);
    setSteps(1)
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

  console.log(currendPlayer, "what is thisasffsa ");
  // Dummy handler for moving players
  const handleMovePlayers = async (folderId) => {
    console.log(folderId, "what is this id");
 //HERE

 await removeOrMovePlayerFromFolder({
   variables: {
     input: {
       action: 'move',
       folder_id: Number(id),
       player_ids: selected,
       target_folder_id: folderId,
     },
   },
 })
   .then((response) => {
     if (response?.data?.removeOrMovePlayerFromFolder?.statusCode == 200)
       toast.success(response?.data?.removeOrMovePlayerFromFolder?.message);
     setSelected([]);
     setSelectAll(false);
     refetch();
   })
   .catch((error) => {
     console.error("Purchase failed:", error);
   });



    // Implement logic to move selected players to folderId
  //  setShowMoveModal(false);
  };

const  handleRemoveFolder =  async () => {

  await removeOrMovePlayerFromFolder({
   variables: {
     input: {
       action: 'remove',
       folder_id: Number(id),
       player_ids: selected,

     },
   },
 })
   .then((response) => {
     if (response?.data?.removeOrMovePlayerFromFolder?.statusCode == 200)
       toast.success(response?.data?.removeOrMovePlayerFromFolder?.message);
     setSelected([]);
     setSelectAll(false);
     refetch();
   })
   .catch((error) => {
     console.error("Purchase failed:", error);
   });


}

 const addPlayerstoFolderSubmit = async () => {


    if (tags?.length === 0) {
      setError("At least one tag is required.");
    } else {

      await addPlayerToFolder({
        variables: {
          input: {
            folder_id: Number(id),
            user_id: Number(currendPlayer?.user_id),
            tags: tags,
          },
        },
      })
        .then((response) => {
          if (response?.data?.addPlayerToFolder?.statusCode == 200)
            toast.success(response?.data?.addPlayerToFolder?.message);
          setShowModel(false);
          setCurrentPLayer(null);
          setTags([]);
          setShowSearchModal(false);
          setSelectCurrentFolder(null);
          setSelected(null);
          setSteps(1);
          refetch();
        })
        .catch((error) => {
          console.error("Purchase failed:", error);
        });



      // Submit tags
    //  console.log("Tags submitted:", tags);
   //   setSteps(2);
    }





  }

  const formated = (dateF)=> {
    const isoDate = dateF;
     const formattedDate = new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  console.log(allSportData, "allSportData");

return (
  <>
    <div className="folder-items-bg">
      <div className="folder-items-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
        <div>
          <div className="folder-items-title">
            {folderInnerData?.getFolderPlayer?.data?.folder?.name}
          </div>
          <div className="folder-items-date">
            Created on:{" "}
            { formated(
              folderInnerData?.getFolderPlayer?.data?.folder?.created_at
             ) }{" "}
          </div>
        </div>
        <div className="folder-items-actions">
          <button
            className="add-player-btn"
            onClick={() => setShowSearchModal(true)}
          >
            + Add Player
          </button>
          <button className="filter-btn">Filter</button>
        </div>
      </div>
      <div className="folder-items-bar">
        <div className="d-flex justify-content-between">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />{" "}
            Select All Items
          </label>

          <div className="folder-items-bar-actions">
            <span
              className="move-action"
              onClick={() => setShowMoveModal(true)}
            >
              Move
            </span>
            <span
              onClick={() => handleRemoveFolder()}
              className="remove-action"
            >
              Remove
            </span>
          </div>
        </div>
        <div className="folder-items-bar-desc">
          You can remove, drag and drop players in this folder
        </div>
      </div>
      <Row>
        <Col>
          {/* <Button
            onClick={() =>
              setCursor(folderInnerData?.getFolderPlayer?.nextCursor)
            }
          >
            Load More
          </Button> */}
        </Col>
      </Row>
      <div className="folder-items-grid">
        <Row>
          {folderInnerData?.getFolderPlayer?.data?.player?.map((player) => (
            <Col md={3}>
              <div
                className="folder-player-card"
                key={player?.players_profile?.id}
              >
                <input
                  type="checkbox"
                  className="player-checkbox"
                  checked={selected?.includes(player?.players_profile?.id)}
                  onChange={() => handleSelect(player?.players_profile?.id)}
                />
                <img
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                    player?.players_profile?.user?.picture
                  }`}
                  alt={player?.name}
                  className="player-img"
                />
                <div className="player-info">
                  <div className="player-name">
                    { player?.players_profile?.user?.full_name}
                  </div>
                  {/* <div className={`player-badge ${player.badge === "Advance" ? "advance" : "basic"}`}>{player.badge}</div> */}
                  <div className="player-id">
                    ID: {player?.players_profile?.player_id}
                  </div>
                  <div className="player-tags">
                    <b>Tags:</b> {player.tags}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
    <Modal backdrop={false} size="lg" centered isOpen={showModal}>
      {steps == 1 ? (
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
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                    profileData?.playerProfile?.user?.picture
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
                  {/* <div className="player-tags" style={{ paddingTop: "10px" }}>
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
                          <span style={{ paddingLeft: "7px" }}>Following</span>
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
            <Row>
              <div style={{ padding: "20px" }}>
                <Accordion
                  open={open}
                  toggle={toggle}
                  className="custom-accordion"
                >
                  {sportsData?.playerSportsProfile?.data?.map((item, index) => {
                    return (
                      <>
                        <AccordionItem
                          style={{ background: "#2d2d2d", border: "none" }}
                        >
                          <AccordionHeader
                            targetId={index}
                            style={{ background: "#2d2d2d", color: "#fff" }}
                            className="accordion-header-white-icon"
                          >
                            <div
                              className="folder-player-card"
                              style={{
                                border: "none",
                                background: "#2d2d2d",
                                boxShadow: "none",
                              }}
                            >
                              {item?.profile_type == "Advanced" && (
                                <>
                                  <img
                                    src={`${
                                      import.meta.env.VITE_BASE_URL_IMAGE
                                    }${
                                      item?.profile_detail?.sports_info
                                        ?.sport_picture
                                    }`}
                                    alt={"fakedp"}
                                    className="player-img"
                                    height={10}
                                  />
                                </>
                              )}

                              <div
                                className="player-info"
                                style={{ paddingLeft: "30px" }}
                              >
                                <div className="player-name">
                                  {profileData?.playerProfile?.user?.full_name}{" "}
                                  -{item?.sport?.name}{" "}
                                </div>
                              </div>
                            </div>
                          </AccordionHeader>
                          <AccordionBody
                            accordionId={index}
                            style={{ background: "#2d2d2d", color: "#fff" }}
                          >
                            {item?.profile_type == "Advanced" && (
                              <>
                                <>
                                  <h4 className="my-4">Sports info</h4>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Sports Name</h6>
                                    <h6>{item?.sport?.name}</h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Dominant hand</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.dominant_hand
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>jersey no</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.jersey_no
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Team Name</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.sports_info
                                          ?.team_name
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Positions</h6>
                                    <h6>
                                      {item?.profile_detail?.sports_info?.positions?.join(
                                        ", "
                                      )}
                                    </h6>
                                  </div>
                                </>
                                <>
                                  <h4 className="my-4">Career Stats</h4>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Awards</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.career_stats
                                          ?.awards
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Highlights</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.career_stats
                                          ?.highlights
                                      }
                                    </h6>
                                  </div>
                                </>
                                <>
                                  <h4 className="my-4">Academic Info</h4>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Year</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.year
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Address</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.address
                                      }
                                    </h6>
                                  </div>

                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Highschool</h6>
                                    <h6>
                                      {
                                        item?.profile_detail?.academic_info
                                          ?.highschool
                                      }
                                    </h6>
                                  </div>
                                </>
                                <>
                                  <h4 className="my-4">
                                    Recruiting Preferences
                                  </h4>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Direct phone</h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences?.direct_phone
                                      }
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Coach Trainer</h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences
                                          ?.coach_trainer
                                      }
                                    </h6>
                                  </div>

                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <h6>Preferred college</h6>
                                    <h6>
                                      {
                                        item?.profile_detail
                                          ?.recruiting_preferences
                                          ?.preferred_college
                                      }
                                    </h6>
                                  </div>

                                  <div
                                    style={{
                                      marginTop: "25px",
                                      padding: "2px",
                                      borderBottom: "1px solid #575050",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
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
                              </>
                            )}
                            {item?.profile_type == "Basic" && (
                              <>
                                <div
                                  style={{
                                    marginTop: "25px",
                                    padding: "2px",
                                    borderBottom: "1px solid #575050",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h6>Sports Name</h6>
                                  <h6>{item?.sport?.name}</h6>
                                </div>
                                <div
                                  style={{
                                    marginTop: "25px",
                                    padding: "2px",
                                    borderBottom: "1px solid #575050",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h6>Dominant hand</h6>
                                  <h6>{item?.profile_detail?.dominant_hand}</h6>
                                </div>
                                <div
                                  style={{
                                    marginTop: "25px",
                                    padding: "2px",
                                    borderBottom: "1px solid #575050",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h6>jersey no</h6>
                                  <h6>{item?.profile_detail?.jersey_no}</h6>
                                </div>
                                <div
                                  style={{
                                    marginTop: "25px",
                                    padding: "2px",
                                    borderBottom: "1px solid #575050",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h6>Team Name</h6>
                                  <h6>{item?.profile_detail?.team_name}</h6>
                                </div>
                                <div
                                  style={{
                                    marginTop: "25px",
                                    padding: "2px",
                                    borderBottom: "1px solid #575050",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
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
                      </>
                    );
                  })}
                </Accordion>
              </div>
            </Row>

            <Row>
              <h5
                style={{
                  color: "white",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                Add Tags
              </h5>
            </Row>
            <Row>
              {" "}
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <label style={{ color: "white", fontSize: "18px" }}>Tags</label>
                <Input
                  value={tagInput}
                  onChange={(e) => {
                    setError(null);
                    setTagInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  style={{
                    marginTop: "4px",
                    background: "#2d2d2d",
                    color: "#fff",
                    border: "1px solid #444",
                    borderRadius: "6px",
                  }}
                  placeholder="Enter tags and press Enter"
                />

                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      color="primary"
                      style={{
                        background: "#10F3ED",
                        color: "#000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveTag(idx)}
                    >
                      {tag} &times;
                    </Badge>
                  ))}
                </div>

                {error && (
                  <p style={{ color: "red", marginTop: "4px" }}>{error}</p>
                )}
              </div>
            </Row>

            <Row>
              <Col lg={7}></Col>
              <Col lg={4}>
                <div style={{ paddingTop: "25px" }}>
                  <Button
                    //  onClick={() => handleNext()}
                    onClick={() => addPlayerstoFolderSubmit()}
                    color="warning"
                    style={{
                      borderRadius: "18px",
                      width: "100%",
                      minWidth: "160px",
                      fontWeight: 600,
                    }}
                  >
                    Add To Folder
                  </Button>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </>
      ) : (
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
              <h5
                style={{
                  color: "white",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                Select Folder
              </h5>
            </Row>
            <Row>
              {" "}
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Input
                  value={folderSearchInput}
                  onChange={(e) => {
                    setFolderSearchInput(e.target.value);
                  }}
                  style={{
                    marginTop: "4px",
                    background: "#2d2d2d",
                    color: "#fff",
                    border: "1px solid #444",
                    borderRadius: "6px",
                  }}
                  placeholder="Search by Folder Name"
                />
              </div>
            </Row>
            {AllFolders?.getAllFolders?.data?.map((folder) => {
              return (
                <>
                  <div
                    className="w-100 d-flex align-items-center   my-4 px-4"
                    style={{
                      borderRadius: "8px",
                      cursor: "pointer",
                      background:
                        selectCurrentFolder?.id == folder?.id
                          ? "linear-gradient(90.46deg, #F27825 0.4%, #9747FF 99.66%)"
                          : "transparent",
                    }}
                    onClick={
                      () => setSelectCurrentFolder(folder)
                      //  navigate(`/recruiter/folder-items/${folder?.id}`)
                    }
                  >
                    <span
                      className="folder-icon me-3"
                      role="img"
                      aria-label="folder"
                    >
                      📁
                    </span>
                    <div>
                      <div className="folder-title">{folder?.name}</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                </>
              );
            })}
            <Row>
              <Col lg={7}></Col>
              <Col lg={4}>
                <div style={{ paddingTop: "25px" }}>
                  <Button
                    disabled={selectCurrentFolder == null}
                    onClick={() => addPlayerstoFolderSubmit()}
                    color="warning"
                    style={{
                      borderRadius: "18px",
                      width: "100%",
                      minWidth: "160px",
                      fontWeight: 600,
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </>
      )}
    </Modal>
    {showSearchModal && (
      <SearchPlayerModal
        folder_id={id}
        show={showSearchModal}
        setShow={setShowSearchModal}
        handleOnclick={handleAddPlayer}
        tags={[]}
      />
    )}
    {showMoveModal && (
      <MovePlayersModal
        folder_id={id}
        show={showMoveModal}
        setShow={setShowMoveModal}
        onMove={handleMovePlayers}
      />
    )}
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
  </>
);
};

export default FolderItems;