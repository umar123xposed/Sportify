import React, { Fragment, useEffect, useState } from "react";
import "./index.css";
import { Col, Row, Modal } from "reactstrap";
import slider1 from "./../../assets/slider1.png";
import slider2 from "./../../assets/slider2.png";
import slider3 from "./../../assets/slider3.png";
import forword from "./../../assets/forword.png";

import PlayerCard from "../../components/elements/playerCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ListPlayer, GET_ALL_TEAMS, All_User_By_Role, Get_All_Sports, ListPlayerCoach } from "../../graphql/query/query";
import { useNavigate } from "react-router-dom";
import PlayerCard1 from "../../components/elements/playerCard1";
import { useSelector } from "react-redux";
import UserImg from "../../assets/coach.webp"
import Loader from "react-spinner-loader"
import Select from "react-select"

const settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  cssEase: "linear",
  slidesToScroll: 1,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: "120px",
  initialSlide: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        centerPadding: "10px",
        slidesToShow: 1,
      },
    },
  ],
};

var settings2 = {
  dots: false,
  autoplay: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 6,
  slidesToShow: 2,

  // variableWidth: true
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate1', label: 'Chocolate' },
  { value: 'strawberry1', label: 'Strawberry' },
  { value: 'vanilla1', label: 'Vanilla' },
  { value: 'chocolate2', label: 'Chocolate' },
  { value: 'strawberry2', label: 'Strawberry' },
  { value: 'vanilla2', label: 'Vanilla' }
]

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1f1f1f",
    borderColor: state.isFocused ? "#4f46e5" : "#333",
    color: "#fff",
    fontSize: "16px",
    boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : "none",
    "&:hover": {
      borderColor: "#4f46e5",
    },
    width: "300px", // ✅ fixed width
    // minHeight: "60px",
    flexWrap: "wrap",
    overflowY: "auto", // vertical scroll
    maxHeight: "80px", // ~2 rows height depending on font size
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontSize: "16px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4f46e5"
      : state.isFocused
        ? "#2d2d2d"
        : "#1f1f1f",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "16px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ccc",
    ":hover": {
      backgroundColor: "#4f46e5",
      color: "#fff",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
    fontSize: "16px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "16px",
  }),
};



const Home = () => {

  const [All_Sport] = useLazyQuery(Get_All_Sports)

  const [sports, setSports] = useState()
  const [selectedSport, setSelectedSport] = useState()

  const [selectiontags, setselectiontags] = useState({
    all: true,
    players: false,
    coaches: false,
    teams: false
  })

  const updateSportId = selectedSport?.map(item => item.value) || [];

  const navigate = useNavigate()
  const { loading, error, data, refetch } = useQuery(ListPlayerCoach, {
    variables: {
      input: {
        limit: 12,
        cursor: null,
        sport_id: updateSportId,
        type: "All"
      },
    },
  });

  const { loading: loading2, error: error2, data: data2, refetch: refetch2 } = useQuery(All_User_By_Role, {
    variables: {
      "input": {
        "role": [
          "Coach"
        ],
        "limit": 10,
        "page_start": 0
      }
    },
  });

  const { loading: loading1, error: error1, data: data1, refetch: refetch1 } = useQuery(ListPlayerCoach, {
    variables: {
      input: {
        limit: 12,
        cursor: null,
        sport_id: updateSportId,
        type: "New"
      },
    },
  },);

  const { loading: teamsLoading, error: teamsError, data: teamsData } = useQuery(GET_ALL_TEAMS, {
    variables: {
      input: {
        limit: 12,
        myTeams: false,
        cursor: null
      }
    }
  });

 useEffect(() => {
  // Step 1: Extract sport IDs from selectedSport safely
  const updateSportId = selectedSport?.map(item => item.value) || [];

  // Step 2: Don't proceed unless either selectiontags.all or selectiontags.players is true
  if (!selectiontags || (!selectiontags.all && !selectiontags.players)) return;

  // Step 3: Conditionally refetch based on selectiontags flags
  if (selectiontags.all) {
    refetch();
  }

  if (selectiontags.players) {
    refetch1();
  }
}, [selectedSport]); // Include selectiontags in dependency



  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await All_Sport({
          variables: {
            "input": {
              "profile_type": null,
              // "user_id": parseInt(searchParams.get("id"))
            }

          },
          fetchPolicy: "no-cache", // Ensure a fresh request every time
        });

        if (data) {
          const new_data = data?.listSport?.map((item) => ({
            label: item.name,
            value: item.id
          }));

          setSports(new_data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])


  const selectAll = () => {
    setselectiontags({
      all: true,
      players: false,
      coaches: false,
      teams: false

    })
  }

  const selectPlayers = () => {
    setselectiontags({
      all: false,
      players: true,
      coaches: false,
      teams: false

    })
  }

  const selectCoaches = () => {
    setselectiontags({
      all: false,
      players: false,

      coaches: true,
      teams: false
    })
  }

  const selectTeams = () => {
    setselectiontags({
      all: false,
      players: false,
      coaches: false,
      teams: true
    })
  }

  const userRole = useSelector((state) => state.authSlice?.role);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)

  const toggle = (info) => {
    console.log(open)
    setDetail(info)
    setOpen(!open)
  }

  return (
    <>
      {
        (loading || loading1 || loading2 || teamsLoading) ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"

              color="red"
            />
          </div>
        ) : (
          <div style={{ overflowX: "hidden" }}>
            <div className="CustomeConatiner">
              <Row>
                <h3 className="slider_main-heading">Find Best Players</h3>
              </Row>
            </div>
            <Row className="mx-0">
              <Col md={12}>
                <div className="player-slider">
                  <Slider {...settings}>
                    {Array(3)
                      .fill("_")
                      .map((item, index) => (
                        <div className="mx-2">
                          <div
                            style={{
                              background:
                                (index == 0 &&
                                  "var(--primary-grad-slider-color1)") ||
                                (index == 1 && "var(--slider-grad2)") ||
                                (index == 2 && "#F5BA06"),
                            }}
                            className="slider-card relative d-flex flex-sm-row flex-column justify-content-between"
                          >
                            <div className="card-left">
                              <h3>Find the best players with expert insights!</h3>
                              <p>
                                Discover top players across all sports with expert
                                insights and up-to-date rankings!
                              </p>
                              <button
                                onClick={() => navigate("/coach/players")}
                                className="white-btn mb-5"
                              >
                                <h4
                                  style={{ fontSize: "15px", fontWeight: "500" }}
                                  className="grdiant-text2"
                                >
                                  Find Players
                                </h4>
                              </button>
                            </div>
                            <div className="card-right d-flex align-items-end">
                              <img
                                src={
                                  (index == 0 && slider1) ||
                                  (index == 1 && slider2) ||
                                  (index == 2 && slider3)
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </Col>
              {/* tags selection */}
              <Col md={12} className="mt-5 CustomeConatiner">
                <div className="selecttag" >
                  <div className={`${selectiontags.all ? "active-tagss" : "tagss"}`} onClick={selectAll}>
                    New Players
                  </div>
                  <div className={`${selectiontags.players ? "active-tagss" : "tagss"}`} onClick={selectPlayers}>
                    Players
                  </div>
                  <div className={`${selectiontags.coaches ? "active-tagss" : "tagss"}`} onClick={selectCoaches}>
                    Coaches
                  </div>
                  <div className={`${selectiontags.teams ? "active-tagss" : "tagss"}`} onClick={selectTeams}>
                    Teams
                  </div>
                </div>
              </Col>
            </Row>
            {/* New Folder Section */}
            {/* New Folder Section */}
            {userRole === "Recruiter" && (
              <div className="CustomeConatiner">
                <h3 className="slider_main-heading mt-5">My Folder</h3>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <button
                    className="create-folder-btn"
                    onClick={() => setShowFolderModal(true)}
                  >
                    + Create New Folder
                  </button>
                  <button
                    className="view-all-btn"
                    onClick={() => navigate("/recruiter/new-folder")}
                  >
                    View All &gt;
                  </button>
                </div>
                <div className="folder-grid">
                  {/* Example folders, replace with dynamic data as needed */}
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/1")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">National Lacrosse League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/2")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">National Hockey League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/3")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">English Premier League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/4")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">Major League Baseball</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/5")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">Canadian Premier League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/6")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">USL Super League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/7")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">USL Championship</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                  <div
                    className="folder-card"
                    onClick={() => navigate("/recruiter/folder-items/8")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="folder-icon" role="img" aria-label="folder">
                      📁
                    </span>
                    <div>
                      <div className="folder-title">National Football League</div>
                      <div className="folder-date">Created on: 02/10/2024</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectiontags.all && (
              <div className="CustomeConatiner">
                <Row className="my-5 mx-0">
                  {
                    data1?.teamPlayersBySportId?.data?.length !== 0 && (
                      <div className="d-flex flex-md-row flex-column gap-3 align-items-center justify-content-between">
                        <h3 className="slider_main-heading mt-0">New Players Listed</h3>
                        <div className="d-flex flex-wrap  gap-2 align-items-center">
                          <span className="text-white" style={{ fontSize: "16px" }}>Filter by: </span>
                          <Select
                            isMulti
                            name="colors"
                            options={sports}
                            defaultValue={selectedSport}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customStyles}
                            placeholder="select sports"
                            onChange={(e) => setSelectedSport(e)}
                          />
                        </div>
                      </div>
                    )
                  }

                  <Col>
                    <div className="mt-4 players-grid">
                      {data1?.teamPlayersBySportId?.data?.map((item) => {
                        return (
                          <>
                            <PlayerCard1
                              // id={item?.player_id}
                              title={item?.player_profile_detail?.players_profile?.user?.full_name}
                              picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.player_profile_detail?.players_profile?.user?.picture
                                }`}
                              data={item}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {(selectiontags.players) && (
              <div className="CustomeConatiner">
                <Row className="my-5 mx-0">
                  {
                    data?.teamPlayersBySportId?.data?.length !== 0 && (
                      <div className="d-flex flex-md-row flex-column gap-3 align-items-center justify-content-between">
                        <h3 className="slider_main-heading mt-0">Players</h3>
                        <div className="d-flex flex-wrap  gap-2 align-items-center">
                          <span className="text-white" style={{ fontSize: "16px" }}>Filter by: </span>
                          <Select
                            isMulti
                            name="colors"
                             defaultValue={selectedSport}
                            options={sports}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="select sports"
                            onChange={(e) => setSelectedSport(e)}
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    )
                  }

                  <Col>
                    <div className="mt-4 players-grid">
                      {data?.teamPlayersBySportId?.data?.map((item) => {
                        return (
                          <>
                            <PlayerCard1
                              // id={item?.player_id}
                              title={item?.player_profile_detail?.players_profile?.user?.full_name}
                              picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.player_profile_detail?.players_profile?.user?.picture
                                }`}
                              data={item}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {(selectiontags.coaches) && (
              <div className="CustomeConatiner">
                <Row className="my-5 mx-0">
                  {
                    data2?.allUserByRole?.data?.length !== 0 && (
                      <h3 className="slider_main-heading">Coaches</h3>
                    )
                  }

                  <Col>
                    <div className="mt-4 players-grid">
                      {data2?.allUserByRole?.data?.map((item) => {
                        return (
                          <>
                            <PlayerCard1
                              // id={item?.player_id}
                              title={item?.full_name}
                              picture={
                                item?.picture
                                  ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.picture
                                  }`
                                  : UserImg
                              }
                              data={item}
                              type="coach"
                              onClick1={() => toggle(item)}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {(selectiontags.teams) && (
              <div className="CustomeConatiner">
                <Row className="my-5 mx-0">
                  {
                    teamsData?.getAllTeams?.data?.length !== 0 && (
                      <h3 className="slider_main-heading">Teams</h3>
                    )
                  }

                  <Col>
                    <div className="mt-4 players-grid">
                      {teamsLoading ? (
                        <div>Loading teams...</div>
                      ) : teamsError ? (
                        <div>Error loading teams</div>
                      ) : (
                        teamsData?.getAllTeams?.data?.map((team) => (
                          <PlayerCard1
                            key={team.id}
                            title={team.name}
                            picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${team.logo
                              }`}
                            data={team}
                          />
                        ))
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        )
      }

      {/* Folder Create Modal */}
      <Modal
        isOpen={showFolderModal}
        toggle={() => setShowFolderModal(false)}
        centered
        className="folder-modal"
      >
        <div className="folder-modal-content">
          <button
            className="folder-modal-close"
            onClick={() => setShowFolderModal(false)}
          >
            &times;
          </button>
          <div className="folder-modal-label">Folder Name</div>
          <input
            className="folder-modal-input"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
          />
          <div className="folder-modal-actions">
            <button
              className="folder-modal-cancel"
              onClick={() => setShowFolderModal(false)}
            >
              Cancel
            </button>
            <button className="folder-modal-create">Create new folder</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={open} toggle={toggle} centered size="md">
        <div className="profile-modal-content">
          <button type="button" className="close-button-modal" onClick={toggle}>
            &times;
          </button>
          <div className="profile-modal-body">
            <h2 className="profile-modal-title">Profile Details</h2>
            <div className="profile-modal-image-container">
              <img
                async
                src={
                  detail?.picture ?
                    import.meta.env.VITE_BASE_URL_IMAGE + detail?.picture :
                    UserImg
                }
                alt={"coach"}
                className="profile-modal-image border border-secondary rounded-circle"
              />
            </div>
            <div className="profile-modal-details mt-4">
              <div className="detail-line">
                <span>Full Name:</span>
                <span>{detail?.full_name || "-"}</span>
              </div>
              <hr className="detail-separator" />
              <div className="detail-line">
                <span>Email:</span>
                <span>
                  {detail?.email || "-"}
                </span>
              </div>
              <hr className="detail-separator" />
              <div className="detail-line">
                <span>Role</span>
                <span>
                  {detail?.role?.name || "-"}
                </span>
              </div>

            </div>


          </div>
        </div>

      </Modal>
    </>
  );
};

export default Home;
