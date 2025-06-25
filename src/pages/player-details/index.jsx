import React, { useEffect, useState } from "react";
import "./index.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Modal, Row, Container, ModalBody, Spinner } from "reactstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { All_Highlights, Player_Profile, PLAYER_PROFILE_DETAIL, Sport_List } from "../../graphql/query/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import AdvanceImage from "../../components/modules/editAdvanceImage";
import BasicProfileDetailModal from '../../components/modules/BasicProfileDetailModal';
import CategoryCard from "../../components/elements/CategoryCard";
import AddHighlightModal from "../../components/elements/add-highlight";
import Slider from "react-slick";
import ViewHighlightModal from "../../components/elements/view-highlight";
import Loader from "react-spinner-loader"
import AdvanceProfileDetailModal from "../../components/modules/AdvanceProfileDetailModal";
import EditProfileBasicModal from "../../components/modules/editProfileBasicModal";
import EditSportBasicModal from "../../components/modules/editSportBasicModal";
import EditAdvancedAtheleteModal from "../../components/modules/editAdvancedAthelete";
import EditSportAdvanceModal from "../../components/modules/editSportAdvanceModal";
import EditCareerSportModal from "../../components/modules/editSportCareerModal";
import EditAcademicSportModal from "../../components/modules/editSportAcademicModal";
import EditRecruitSportModal from "../../components/modules/editSportRecruitModal";
import { Delete_Highlight, Follow_Player, Player_React } from "../../graphql/mutation";
import toast from "react-hot-toast";
import SearchPlayerModal from "../../components/modules/searchPlayer";
import FollowModal from "../../components/modules/followModal";
import { useSelector } from "react-redux";




const PlayerDetails1 = () => {

  const [searchParams] = useSearchParams()
  const [isEditBasicModalOpen, setIsEditBasicModalOpen] = useState(false)
  const [type, setType] = useState(false)
  const [editType, setEditType] = useState(false)
  const [states, setStates] = useState({
    detail: null,
    detail1: [],
    detail2: null,
    loader: true,
    loader1: true,
    loader2: true,
    loader3: null,
    imageSelect: null,
    imageType: null,
    active: false,
    isBasicProfileDetailModalOpen: false,
    isAdvanceProfileDetailModalOpen: false,
    isAddHighlightModalOpen: false,
    isViewHighlightModalOpen: false,
    selectedBasicSportDataForModal: null,
    selectedAdvanceSportDataForModal: null,
    isAdvanceCareerDetailModalOpen: null,
    editType: false,
    edit: false,
    modal: false,
    detailType: null,
    currentImage: null,
    imgModal: null,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    editSportData: null,
    active1: false,
    active2: false,
    follow_state: false,
    modal5: false,
    follow_data: null,
    like: null,
    cursor: null,
    cursor1: null,
    showLoader: false
  })

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 10,
    slidesToScroll: 10,
    afterChange: (current) => {
      const preloadOffset = 2;
      const total = states?.detail1?.length ?? 0; // or states?.detail1?.data?.length
      const remaining = total - current;

      console.log("Current slide:", current, "Remaining:", remaining, "Cursor:", states.cursor);

      if (states?.cursor && remaining <= preloadOffset && !states.loader1) {
        fetchHighlights();
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,

        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  }

  const isAthlete = useSelector((state) => state.authSlice.role)
  console.log("role?", isAthlete)
  const [Profile_Detail] = useLazyQuery(Player_Profile)
  const [Get_Highlights] = useLazyQuery(All_Highlights)
  const [List_Sports] = useLazyQuery(Sport_List)

  const [Player_Follow] = useMutation(Follow_Player)
  const [React_Player] = useMutation(Player_React)
  const [Highlight_Delete] = useMutation(Delete_Highlight)

  const navigate = useNavigate()


  const { state } = useLocation()

  console.log(state, 'what is start')

  const [
    playerProfileDetail,
    { loading: loading1, error: error1, data: data3, refetch: refetch1 },
  ] = useLazyQuery(PLAYER_PROFILE_DETAIL);


  useEffect(() => {
    // setStates((prev) => ({
    //   ...prev,
    //   loader: true,
    // }))
    const fetchData = async () => {
      try {
        const { data } = await Profile_Detail({
          variables: {
            "input": {
              "user_id": parseInt(searchParams.get("id"))
            }
          },
          fetchPolicy: "no-cache",
        });

        if (data) {

          setStates((prev) => ({
            ...prev,
            loader: false,
            like: data?.playerProfile?.my_reaction,
            follow_state: data?.playerProfile?.is_following,
            detail: data?.playerProfile,
          }))
        }
      } catch (e) {
        console.log(e)
        setStates((prev) => ({
          ...prev,
          loader: false,
        }))
      }
    }



    fetchData()

  }, [states?.active2])


  useEffect(() => {
    setStates((prev) => ({
      ...prev,
      loader1: true,
    }))
    const fetchData1 = async () => {
      try {
        const { data } = await Get_Highlights({
          variables: {
            "input": {
              "user_id": parseInt(searchParams.get("id")),
              "limit": 10,
              "cursor": null
            }
          },
          fetchPolicy: "no-cache",
        });

        if (data) {

          setStates((prev) => ({
            ...prev,
            detail1: data?.allHighlights,
            cursor: data?.allHighlights?.nextCursor,
            loader1: false
          }))
        }
      } catch (e) {
        console.log(e)
        setStates((prev) => ({
          ...prev,
          loader1: false,
        }))
      }
    }

    fetchData1()

  }, [states?.active])

  useEffect(() => {
    setStates((prev) => ({
      ...prev,
      loader2: true,
    }))
    const fetchData1 = async () => {
      try {
        const { data } = await List_Sports({
          variables: {
            "input": {
              "limit": 10,
              "profile_type": searchParams.get("type") == "basic" ? "Basic" : "Advanced",
              "user_id": parseInt(searchParams.get("id")),
              "cursor": null
            }
          },
          fetchPolicy: "no-cache",
        });

        if (data) {

          setStates((prev) => ({
            ...prev,
            detail2: data?.playerSportsProfile?.data,
            cursor1: data?.playerSportsProfile?.nextCursor,
            loader2: false
          }))
        }
      } catch (e) {
        console.log(e)
        setStates((prev) => ({
          ...prev,
          loader: false,
        }))
      }
    }

    fetchData1()

  }, [states?.active1])

  const fetchHighlights = async () => {
    try {
      const { data } = await Get_Highlights({
        variables: {
          input: {
            user_id: parseInt(searchParams.get("id")),
            limit: 10,
            cursor: states.cursor
          }
        },
        fetchPolicy: "no-cache"
      });

      if (data?.allHighlights) {
        setStates((prev) => ({
          ...prev,
          detail1: {
            ...prev.detail1,
            data: [...(prev.detail1?.data || []), ...(data.allHighlights.data || [])]
          },
          cursor: data.allHighlights.nextCursor,
          loader1: false
        }));
      }
    } catch (err) {
      console.error("Error fetching highlights:", err);
      setStates((prev) => ({ ...prev, loader1: false }));
    }
  };

  console.log(states?.detail2, "states?.detail2")
  const handleShowMore = async () => {
    setStates((prev) => ({
      ...prev,
      showLoader: true
    }))
    try {
      const { data } = await List_Sports({
        variables: {
          "input": {
            "limit": 1,
            "profile_type": searchParams.get("type") == "basic" ? "Basic" : "Advanced",
            "user_id": parseInt(searchParams.get("id")),
            "cursor": states?.cursor1
          }
        },
        fetchPolicy: "no-cache",
      });

      if (data) {
        setStates((prev) => ({
          ...prev,
          detail2: [
            ...prev.detail2,
            ...data?.playerSportsProfile?.data,
          ],
          cursor1: data?.playerSportsProfile?.nextCursor,
          showLoader: false,
        }));
      }
    } catch (e) {
      console.log(e)
      setStates((prev) => ({
        ...prev,
        showLoader: false,
      }))
    }
  }



  const toggleFollow = (name) => {
    if (name) {
      setStates((prev) => ({
        ...prev,
        follow_data: name,
        modal5: !states.modal5,
      }))
    }
    else {
      setStates((prev) => ({
        ...prev,
        modal5: !states.modal5,
      }))
    }
  }

  const toggleEditSportBasicModal = () => {
    setStates((prev) => ({
      ...prev,
      modal: !states.modal,
    }))
  }

  const toggleEditSportAdvanceModal = () => {
    setStates((prev) => ({
      ...prev,
      modal1: !states.modal1,
    }))
  }

  const toggleEditCareerAdvanceModal = () => {
    setStates((prev) => ({
      ...prev,
      modal2: !states.modal2,
    }))
  }

  const toggleEditAcademicAdvanceModal = () => {
    setStates((prev) => ({
      ...prev,
      modal3: !states.modal3,
    }))
  }

  const toggleEditRecruitAdvanceModal = () => {
    setStates((prev) => ({
      ...prev,
      modal4: !states.modal4,
    }))
  }


  const toggleBasicProfileDetailModal = () => {
    setStates((prev) => ({
      ...prev,
      isBasicProfileDetailModalOpen: !states.isBasicProfileDetailModalOpen,
    }))
  }

  const toggleAdvanceProfileDetailModal = () => {
    setStates((prev) => ({
      ...prev,
      isAdvanceProfileDetailModalOpen: !states.isAdvanceProfileDetailModalOpen,
    }))
  }

  const toggleAdvanceCareerDetailModal = () => {
    setStates((prev) => ({
      ...prev,
      isAdvanceCareerDetailModalOpen: !states.isAdvanceCareerDetailModalOpen,
    }))
  }

  const toggleAddHighlightModal = () => {
    if (states?.isAddHighlightModalOpen) {
      setStates((prev) => ({
        ...prev,
        active: !states?.active
      }))
    }
    setStates((prev) => ({
      ...prev,
      isAddHighlightModalOpen: !states?.isAddHighlightModalOpen
    }))
  }

  const toggleViewHighlightModal = (img) => {
    console.log(img)
    if (!states?.isViewHighlightModalOpen) {
      setStates((prev) => ({
        ...prev,
        imageSelect: `${import.meta.env.VITE_BASE_URL_IMAGE}${img.media}`,
        imageType: img.type,
        isViewHighlightModalOpen: !states?.isViewHighlightModalOpen
      }))
    }
    else {
      setStates((prev) => ({
        ...prev,
        imageSelect: null,
        imageType: null,
        active: !state?.active,
        isViewHighlightModalOpen: !states?.isViewHighlightModalOpen
      }))
    }


  }
  // --- End new state ---



  const [isOpenupgrade, setIsopenupgrade] = useState(false)

  const handleAdvanceClick = () => {
    navigate("/checkout-payment")
  }

  const toggleupgrade = () => {
    if (isOpenupgrade) {
      setIsopenupgrade(!isOpenupgrade)
    }
    setIsopenupgrade(!isOpenupgrade)
  }
  const handleGetPlayerDetails = (id, type) => {
    playerProfileDetail({
      variables: {
        input: {
          user_id: id,
          profile_type: type,
        },
      },
    });
  };
  const [open, setOpen] = useState("0");

  const toggleAccordion = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleFollow = async () => {
    console.log(states?.follow_state == null)

    setStates((prev) => ({
      ...prev,
      loader3: true
    }))

    try {
      const { data } = await Player_Follow({
        variables: {
          "input": {
            "user_id": parseInt(states?.detail?.user?.id)
          }
        }
      })

      if (data) {
        setStates((prev) => ({
          ...prev,
          follow_state: states?.follow_state == null ? "Pending" : null,
          loader3: false
        }))
        // toast.success(data?.followPlayer?.message)
      }
    }
    catch (e) {
      console.log(e)
      setStates((prev) => ({
        ...prev,
        loader3: false
      }))
    }



  }

  const handleReact = async () => {
    console.log(states?.follow_state == null)

    setStates((prev) => ({
      ...prev,
      loader3: true
    }))

    try {
      const { data } = await React_Player({
        variables: {
          "input": {
            "user_id": parseInt(states?.detail?.user?.id),
            "reaction_type": '❤️'
          }
        }
      })

      if (data) {
        console.log(data?.playerReaction)
        setStates((prev) => ({
          ...prev,
          like: states?.like == '❤️' ? null : '❤️',
          loader3: false,
          active2: !states?.active2
        }))
        // toast.success(data?.followPlayer?.message)
      }
    }
    catch (e) {
      console.log(e)
      setStates((prev) => ({
        ...prev,
        loader3: false
      }))
    }



  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied:', text);
        toast.success("Text copied..")
        // Optional: Show a toast or feedback here
      })
      .catch((err) => {
        console.error('Copy failed:', err);
      });
  };

  const handleHighlightDelete = async (id) => {
    try {
      const { data } = await Highlight_Delete({
        variables: {
          "deleteHighlightId": parseInt(id)
        },
        fetchPolicy: "no-cache",
      });

      if (data) {
        setStates((prev) => ({
          ...prev,
          active: !states?.active
        }));
        toast.success(data?.deleteHighlight?.message)
      }
    } catch (e) {
      console.log(e)

    }
  }



  return (
    <>
      {(states?.loader || states?.loader2) ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <Loader show={true}
            spinnerSize="60px"
            radius="10"

            color="red"
          />
        </div>
      ) : (
        <div className="player-details-container position-relative w-100 ">
          <div className={`d-flex align-items-start ${searchParams.get("type") === "basic" ? "profile-header-basic" : "profile-header-advance "}`}>
            <div className="px-md-3 px-2">
              <Row className="align-items-center">
                <Col xs="auto">
                  <div onClick={() => navigate(-1)} className="d-flex align-items-center back-btn1">
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
                        d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Back</h4>
                  </div>
                </Col>
                <Col>
                  <h2 className="profile-title text-white mb-0">{searchParams.get("type") === "basic" ? "Basic" : "Advance"} Sports Profile</h2>
                </Col>
              </Row>
            </div>
          </div>

          <Container className="container-post position-absolute start-50 translate-middle-x z-3">
            <div className="profile-info-card">
              <Row className="align-items-center justify-content-center">

                <Col xs="auto" xl={2} lg={2} md={2} sm={2}>
                  <div className="position-relative d-flex flex-column align-items-center justify-content-center">
                    <img
                      className="profile-lg-image"
                      src={`${import.meta.env.VITE_BASE_URL_IMAGE}${states?.detail?.user?.picture}`}
                      alt={`${states?.detail?.user?.full_name}'s profile`}
                    />
                    {
                      isAthlete !== "Athlete" && (
                        <div className="d-flex gap-3 text-center  justify-content-center" style={{ width: "100%" }} onClick={() => handleReact()}>


                          <span className={states?.detail?.my_reaction == "❤️" ? "profile-reacted" : "profile-react"}>
                            {
                              states?.detail?.my_reaction == "❤️" ? (
                                <svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.1882 0.125C18.3527 0.125 20.9173 2.72917 20.9173 6.375C20.9173 7.85938 20.5944 9.21458 20.0559 10.4448C18.8712 9.70548 17.473 9.38422 16.0844 9.53226C14.6958 9.68031 13.3968 10.2891 12.3946 11.2616C11.3924 12.2341 10.7448 13.5142 10.555 14.8977C10.3652 16.2812 10.6442 17.6884 11.3475 18.8948C11.0277 19.0844 10.7423 19.251 10.5007 19.3958C7.89648 17.8333 0.0839844 13.6667 0.0839844 6.375C0.0839844 2.72917 2.68815 0.125 5.81315 0.125C7.75065 0.125 9.45898 1.16667 10.5007 2.20833C11.5423 1.16667 13.2507 0.125 15.1882 0.125ZM17.7923 14.7083V11.5833H15.709V14.7083H12.584V16.7917H15.7079L15.709 19.9167H17.7923L17.7913 16.7917H20.9173V14.7083H17.7923Z" fill="url(#paint0_linear_7405_24322)" />
                                  <defs>
                                    <linearGradient id="paint0_linear_7405_24322" x1="-0.15142" y1="10.5557" x2="20.9293" y2="10.8019" gradientUnits="userSpaceOnUse">
                                      <stop stop-color="#F27825" />
                                      <stop offset="1" stop-color="#D1244D" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.1882 0.125C18.3527 0.125 20.9173 2.72917 20.9173 6.375C20.9173 7.85938 20.5944 9.21458 20.0559 10.4448C18.8712 9.70548 17.473 9.38422 16.0844 9.53226C14.6958 9.68031 13.3968 10.2891 12.3946 11.2616C11.3924 12.2341 10.7448 13.5142 10.555 14.8977C10.3652 16.2812 10.6442 17.6884 11.3475 18.8948C11.0277 19.0844 10.7423 19.251 10.5007 19.3958C7.89648 17.8333 0.0839844 13.6667 0.0839844 6.375C0.0839844 2.72917 2.68815 0.125 5.81315 0.125C7.75065 0.125 9.45898 1.16667 10.5007 2.20833C11.5423 1.16667 13.2507 0.125 15.1882 0.125ZM17.7923 14.7083V11.5833H15.709V14.7083H12.584V16.7917H15.7079L15.709 19.9167H17.7923L17.7913 16.7917H20.9173V14.7083H17.7923Z" fill="url(#paint0_linear_7405_24322)" />
                                  <defs>
                                    <linearGradient id="paint0_linear_7405_24322" x1="-0.15142" y1="10.5557" x2="20.9293" y2="10.8019" gradientUnits="userSpaceOnUse">
                                      <stop stop-color="#F27825" />
                                      <stop offset="1" stop-color="#D1244D" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              )
                            }

                            <small>React</small>
                          </span>
                        </div>
                      )
                    }

                  </div>
                </Col>
                <Col xl={10} lg={10} md={10} sm={10} className="ps-5 mt-md-0 mt-5">
                  <Row className="align-items-center ">
                    <Col>
                      <h3 className="player-name text-white mb-0">{states?.detail?.user?.full_name} <small style={{ opacity: "0.6" }}>{states?.detail?.nick_name ? `(${states?.detail?.nick_name})` : ""}</small></h3>
                      <div className="player-id d-flex gap-3 align-items-center mt-1">
                        ID: {states?.detail?.player_id}
                        <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} onClick={() => handleCopy(states?.detail?.player_id)}>
                          <path d="M5.42569 18.025H4.58469C2.72048 18.025 1.2207 16.5252 1.2207 14.661V4.56907C1.2207 2.70486 2.72048 1.20508 4.58469 1.20508H14.6767C16.5409 1.20508 18.0406 2.70486 18.0406 4.56907V5.41006M12.9947 9.61505H23.0866C23.9788 9.61505 24.8345 9.96947 25.4653 10.6003C26.0962 11.2312 26.4506 12.0869 26.4506 12.979V23.071C26.4506 23.9632 26.0962 24.8188 25.4653 25.4497C24.8345 26.0806 23.9788 26.435 23.0866 26.435H12.9947C12.1025 26.435 11.2468 26.0806 10.616 25.4497C9.9851 24.8188 9.63068 23.9632 9.63068 23.071V12.979C9.63068 12.5373 9.71769 12.0998 9.88674 11.6917C10.0558 11.2836 10.3036 10.9127 10.616 10.6003C10.9283 10.288 11.2992 10.0402 11.7073 9.87112C12.1155 9.70206 12.5529 9.61505 12.9947 9.61505Z" stroke="white" stroke-width="2.10249" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        {/* <span className="ms-2"><CopyIcon /></span> */}
                      </div>
                    </Col>
                    <Col className="d-flex gap-3 justify-content-end">
                      {
                        isAthlete !== "Athlete" && (
                          <div className={`${states?.follow_state === null ? "edit-profile-btn" : "follow-btn"} px-4`} style={{ opacity: states?.loader3 && "0.6" }} onClick={() => !states?.loader3 && handleFollow()}>

                            {states?.follow_state == null ? "Follow" : states?.follow_state === "Approved" ? "Following" : states?.follow_state}
                          </div>
                        )
                      }

                      {
                        ((isAthlete === "Parent" && states?.detail?.is_connect ) || isAthlete === "Athlete") && (
                          <button className="edit-profile-btn py-2 px-3" onClick={() => {
                            setIsEditBasicModalOpen(true);
                            // handleGetPlayerDetails(state?.user_id, "Basic");
                            setType(states?.detail?.has_advance)
                            setEditType("Basic");
                          }}>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 5.5H3C2.46957 5.5 1.96086 5.71071 1.58579 6.08579C1.21071 6.46086 1 6.96957 1 7.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H12C12.5304 18.5 13.0391 18.2893 13.4142 17.9142C13.7893 17.5391 14 17.0304 14 16.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M13 3.50011L16 6.50011M17.385 5.08511C17.7788 4.69126 18.0001 4.15709 18.0001 3.60011C18.0001 3.04312 17.7788 2.50895 17.385 2.11511C16.9912 1.72126 16.457 1.5 15.9 1.5C15.343 1.5 14.8088 1.72126 14.415 2.11511L6 10.5001V13.5001H9L17.385 5.08511Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Edit Profile
                          </button>
                        )
                      }

                    </Col>
                  </Row>
                  <div className="mt-3 stats-row d-flex flex-row">
                    <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Reacts")} >
                      <div className="stat-value">{states?.detail?.reaction}</div>
                      <div className="stat-label">Reacts</div>
                    </div>
                    <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Followers")}>
                      <div className="stat-value">{states?.detail?.followers}</div>
                      <div className="stat-label">Followers</div>
                    </div>
                    <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Following")}>
                      <div className="stat-value">{states?.detail?.following}</div>
                      <div className="stat-label">Following</div>
                    </div>
                  </div>
                  <Row className="mt-4 circular-icons-row mx-0" style={{ gap: '2px' }}>
                    <Slider {...settings} className="align-left">

                      {/* First slide: Add Highlight button */}
                      {
                        ((isAthlete === "Parent" && states?.detail?.is_connect) || isAthlete === "Athlete") && (
                          <div>
                            <div className="d-flex flex-column align-items-center">
                              <div className="circular-icon" onClick={toggleAddHighlightModal}>
                                <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M5.23934 0.859628C9.73478 0.361895 14.2714 0.361895 18.7669 0.859628C21.2559 1.13861 23.2639 3.09872 23.556 5.59644C24.0887 10.156 24.0887 14.762 23.556 19.3216C23.2639 21.8193 21.2559 23.7794 18.7669 24.0584C14.2714 24.5561 9.73478 24.5561 5.23934 24.0584C2.75034 23.7794 0.742281 21.8193 0.450226 19.3216C-0.0823671 14.7625 -0.0823671 10.1569 0.450226 5.59789C0.59795 4.38444 1.15113 3.25643 2.0201 2.39669C2.88908 1.53694 4.02293 0.995839 5.23789 0.861081M12.0031 5.20412C12.2921 5.20412 12.5693 5.31894 12.7737 5.52331C12.978 5.72768 13.0929 6.00486 13.0929 6.29388V11.3692H18.1682C18.4572 11.3692 18.7344 11.4841 18.9388 11.6884C19.1432 11.8928 19.258 12.17 19.258 12.459C19.258 12.748 19.1432 13.0252 18.9388 13.2296C18.7344 13.4339 18.4572 13.5488 18.1682 13.5488H13.0929V18.6241C13.0929 18.9131 12.978 19.1903 12.7737 19.3947C12.5693 19.5991 12.2921 19.7139 12.0031 19.7139C11.7141 19.7139 11.4369 19.5991 11.2325 19.3947C11.0282 19.1903 10.9133 18.9131 10.9133 18.6241V13.5488H5.83798C5.54896 13.5488 5.27178 13.4339 5.06741 13.2296C4.86304 13.0252 4.74823 12.748 4.74823 12.459C4.74823 12.17 4.86304 11.8928 5.06741 11.6884C5.27178 11.4841 5.54896 11.3692 5.83798 11.3692H10.9133V6.29388C10.9133 6.00486 11.0282 5.72768 11.2325 5.52331C11.4369 5.31894 11.7141 5.20412 12.0031 5.20412Z" fill="black" />
                                </svg>
                              </div>
                              <div className="icon-label mt-1 text-center" style={{ fontSize: "12px" }}>Add Highlights</div>
                            </div>
                          </div>
                        )
                      }

                      {
                        states?.detail1?.data?.map((item) => (
                          <div className="">
                            <div
                              className="d-flex flex-column align-items-center position-relative"
                              onClick={() => toggleViewHighlightModal(item.media)}
                            >
                              <div className="circular-icon position-relative media-wrapper">
                                {item.media.type === "image" ? (
                                  <img
                                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item.media.media}`}
                                    alt="img"
                                    className="rounded-circle border"
                                    height={50}
                                    width={50}
                                  />
                                ) : (
                                  <video
                                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item.media.media}`}
                                    className="rounded-circle border"
                                    height={50}
                                    width={50}
                                  />
                                )}

                                {/* ❌ X icon */}
                                {
                                  ((isAthlete === "Parent" && states?.detail?.is_connect) || isAthlete === "Athlete") && (
                                    <div
                                      className="remove-icon"
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        handleHighlightDelete(item?.id)
                                      }}
                                    >
                                      X
                                    </div>
                                  )

                                }

                              </div>
                              <div className="icon-label mt-1 text-center px-1" style={{ fontSize: "12px" }}>
                                {item.title}
                              </div>
                            </div>
                          </div>

                        ))
                      }
                    </Slider>
                  </Row>
                </Col>
              </Row>

            </div>

            <Row className="mt-5 align-items-center">
              <Col>
                <h3 className="section-title-sm">My Sports</h3>
              </Col>
              <Col xs="auto">

                {((isAthlete === "Parent" && states?.detail?.is_connect) || isAthlete === "Athlete") && (
                  <button className="add-sport-btn py-2 px-3" onClick={() => {
                    // console.log('Add Sport clicked');
                    // Navigate to the add sport page or open a modal
                    navigate(`/parent/select-type?id=${searchParams.get("id")}`);
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z" fill="white" />
                    </svg>

                    Add Sport
                  </button>
                )}
              </Col>
            </Row>

            {
              searchParams.get("type") == "basic" && (
                <Row className="my-3 mx-0">
                  {
                    states?.detail2 && states?.detail2?.map((item) => (
                      <Col md={12} className="my-2 px-0">
                        {
                          console.log(state)
                        }
                        {/* {state?.profile_type?.includes("Basic") && ( */}
                        <div
                          style={{ cursor: "pointer" }}
                          className="card d-flex align-items-center flex-row"
                          onClick={() => {
                            setStates((prev) => ({
                              ...prev,
                              selectedBasicSportDataForModal: item
                            }))

                            // setSelectedBasicSportDataForModal(item); // Set the sport data
                            toggleBasicProfileDetailModal(); // Open the modal
                          }}
                        >
                          <div className="mx-3">
                            <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.profile_detail?.sport_picture}`} alt="qr" height={50} width={50} className=" rounded-circle" />
                          </div>


                          <div className="w-100">
                            <span>{states?.detail?.user?.full_name}</span>
                            <span> - {item?.sport?.name}</span>
                          </div>
                          <div className="mx-3">
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.54323 8.05247L2.00057 0.509802L0.115234 2.39513L6.71523 8.99514L0.115234 15.5951L2.00057 17.4805L9.54323 9.9378C9.79319 9.68777 9.93362 9.34869 9.93362 8.99514C9.93362 8.64158 9.79319 8.30251 9.54323 8.05247Z" fill="white" />
                            </svg>
                          </div>
                        </div>


                        {state?.profile_type?.includes("Advanced") && (
                          <div
                            style={{ cursor: "pointer" }}
                            className="card d-flex align-items-center flex-row"
                            onClick={() => {
                              // Add logic here to open an Advanced profile modal if needed
                              console.log('Advanced sport item clicked');
                            }}
                          >
                            <div className="">
                              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.54323 8.05247L2.00057 0.509802L0.115234 2.39513L6.71523 8.99514L0.115234 15.5951L2.00057 17.4805L9.54323 9.9378C9.79319 9.68777 9.93362 9.34869 9.93362 8.99514C9.93362 8.64158 9.79319 8.30251 9.54323 8.05247Z" fill="white" />
                              </svg>

                            </div>


                            <div className="w-100">
                              <span>{state?.user?.full_name}</span>
                              <span> - Football</span>
                            </div>
                          </div>
                        )}
                      </Col>
                    ))
                  }
                </Row>
              )
            }
            {
              searchParams.get("type") == "advanced" && (
                <Row className="my-3 mx-0">
                  {
                    states?.detail2 && states?.detail2?.map((item) => (
                      <Col md={12} className="my-2">
                        {
                          console.log(state)
                        }
                        {/* {state?.profile_type?.includes("Basic") && ( */}
                        <div
                          style={{ cursor: "pointer" }}
                          className="card d-flex align-items-center flex-row"
                          onClick={() => {
                            setStates((prev) => ({
                              ...prev,
                              selectedAdvanceSportDataForModal: item
                            }))
                            // setSelectedBasicSportDataForModal(item); // Set the sport data
                            toggleAdvanceProfileDetailModal(); // Open the modal
                          }}
                        >
                          <div className="mx-3">
                            <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.profile_detail?.sports_info?.sport_picture}`} alt="qr" height={50} width={50} className=" rounded-circle" />
                          </div>


                          <div className="w-100">
                            <span>{states?.detail?.user?.full_name}</span>
                            <span> - {item?.sport?.name}</span>
                          </div>
                          <div className="mx-3">
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.54323 8.05247L2.00057 0.509802L0.115234 2.39513L6.71523 8.99514L0.115234 15.5951L2.00057 17.4805L9.54323 9.9378C9.79319 9.68777 9.93362 9.34869 9.93362 8.99514C9.93362 8.64158 9.79319 8.30251 9.54323 8.05247Z" fill="white" />
                            </svg>
                          </div>
                        </div>


                        {state?.profile_type?.includes("Advanced") && (
                          <div
                            style={{ cursor: "pointer" }}
                            className="card d-flex align-items-center flex-row"
                            onClick={() => {
                              // Add logic here to open an Advanced profile modal if needed
                              console.log('Advanced sport item clicked');
                            }}
                          >
                            <div className="">
                              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.54323 8.05247L2.00057 0.509802L0.115234 2.39513L6.71523 8.99514L0.115234 15.5951L2.00057 17.4805L9.54323 9.9378C9.79319 9.68777 9.93362 9.34869 9.93362 8.99514C9.93362 8.64158 9.79319 8.30251 9.54323 8.05247Z" fill="white" />
                              </svg>

                            </div>


                            <div className="w-100">
                              <span>{state?.user?.full_name}</span>
                              <span> - Football</span>
                            </div>
                          </div>
                        )}
                      </Col>
                    ))
                  }
                </Row>
              )
            }
            <div className="d-flex justify-content-center">
              {
                states?.cursor1 != null && (
                  <button className="primary-btn py-1 px-4 d-flex gap-4" disabled={states?.showLoader} style={{ opacity: states?.showLoader && "0.6" }} onClick={handleShowMore}>

                    Show more
                    {
                      states?.showLoader && (
                        <Loader show={true}
                          spinnerSize="16px"
                          radius="10"

                          color="red"
                        />
                      )
                    }

                  </button>
                )
              }
            </div>
          </Container >

          <Modal backdrop={false} size="xl" centered isOpen={states?.modal}>
            {states?.detailType == "sport_type" && (
              <div className="gray-modal team-details">
                <div className="d-flex justify-content-between mb-3">
                  <h3>View all sports details </h3>
                  <svg
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setModal(false)}
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
                  <Col md={12}>
                    <Accordion
                      className="py-2"
                      open={open}
                      toggle={toggleAccordion}
                    >
                      {data3?.playerProfileDetail?.profile_detail?.sports_info?.map(
                        (sport, index) => {
                          console.log(sport, "awhat is");
                          return (
                            <>
                              <AccordionItem className="py-2">
                                <AccordionHeader targetId={index}>
                                  {sport?.type}
                                </AccordionHeader>
                                <AccordionBody accordionId={index}>
                                  <div className="team-card">
                                    <div className="team-card-item d-flex justify-content-between">
                                      <p>Sports Type</p>
                                      <p>{sport?.type || "-----"}</p>
                                    </div>
                                    <div className="team-card-item d-flex justify-content-between">
                                      <p>Team Name</p>
                                      <p>{sport?.team_name || "-----"}</p>
                                    </div>
                                    <div className="team-card-item d-flex justify-content-between">
                                      <p>Jersey Number </p>
                                      <p>{sport?.jersey_no} </p>
                                    </div>
                                    {sport?.match_played !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p> Games Played </p>
                                        <p>{sport?.match_played} </p>
                                      </div>
                                    )}
                                    {sport?.points !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p>Assists </p>
                                        <p>{sport?.points} </p>
                                      </div>
                                    )}
                                    {sport?.losses !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p>Losses </p>
                                        <p>{sport?.losses} </p>
                                      </div>
                                    )}

                                    {sport?.draws !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p>Draws </p>
                                        <p>{sport?.draws} </p>
                                      </div>
                                    )}

                                    {sport?.goals !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p>Goals</p>
                                        <p>{sport?.goals} </p>
                                      </div>
                                    )}

                                    {sport?.wins !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p> Wins </p>
                                        <p>{sport?.wins} </p>
                                      </div>
                                    )}

                                    <div className="team-card-item d-flex justify-content-between">
                                      <p>Positions </p>
                                      <p>{sport?.positions.join(", ")}</p>
                                    </div>
                                    {sport?.goals !== undefined && (
                                      <div className="team-card-item d-flex justify-content-between">
                                        <p>Coach Contacts</p>
                                        <p>{sport?.coach_contact} </p>
                                      </div>
                                    )}
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                            </>
                          );
                        }
                      )}
                    </Accordion>
                  </Col>
                </Row>
              </div>
            )}

            {states?.detailType == "Career_and_stats" && (
              <>
                <div className="gray-modal team-details">
                  <div className="d-flex justify-content-between mb-3">
                    <h3>Career Stats & Highlights </h3>

                    <svg
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setModal(false)}
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
                    <div className="team-card p-3">
                      <div className="team-card-item d-flex justify-content-between">
                        <p>Top Scorer</p>
                        <p>
                          {data3?.playerProfileDetail?.profile_detail?.career_stats?.top_scorer.join(
                            ", "
                          )}
                        </p>
                      </div>

                      <div className="team-card-item d-flex justify-content-between">
                        <p>Valuable Player</p>
                        <p>
                          {data3?.playerProfileDetail?.profile_detail?.career_stats?.valuable_player.join(
                            ", "
                          )}
                        </p>
                      </div>
                    </div>
                  </Row>
                </div>
              </>
            )}
          </Modal>
          <AdvanceImage
            // setImage={setCurrentImage}
            // setShow={setImageModal}
            show={states?.imgModal}
            data={states?.currentImage}
          />

          {
            isEditBasicModalOpen && (
              <EditProfileBasicModal
                setShow={setIsEditBasicModalOpen}
                show={isEditBasicModalOpen}
                toggle={() => {
                  setIsEditBasicModalOpen(false);
                  setEditType(null);
                }}
                profile_type={type}
                data={states?.detail}
                active={states?.active2}
                setActive={(activeData) => {
                  setStates(prev => ({
                    ...prev,
                    active2: activeData
                  }));
                }}
              // refetch={handleGetPlayerDetails}
              />
            )
          }

          <ViewHighlightModal
            id={parseInt(searchParams.get("id"))}
            isOpen={states?.isViewHighlightModalOpen}
            toggle={toggleViewHighlightModal}
            image={states?.imageSelect}
            type={states?.imageType}
          />

          <AddHighlightModal
            id={parseInt(searchParams.get("id"))}
            isOpen={states?.isAddHighlightModalOpen}
            toggle={toggleAddHighlightModal}
            playerData={state} // Pass the player data available in state
            basicSportData={states?.selectedBasicSportDataForModal} // Pass the selected basic sport data
            onUpgradeClick={() => toggleupgrade()} // Placeholder handler
            onGenerateQrClick={() => console.log('Generate QR clicked from modal')} // Placeholder handler
            onEditDetailedInfoClick={() => console.log('Edit Detailed Info clicked from modal')} // Placeholder handler
          />

          {/* Render the Basic Profile Detail Modal */}
          <BasicProfileDetailModal
            isOpen={states?.isBasicProfileDetailModalOpen}
            toggle={toggleBasicProfileDetailModal}
            playerData={states?.detail} // Pass the player data available in state
            basicSportData={states?.selectedBasicSportDataForModal} // Pass the selected basic sport data
            onUpgradeClick={() => toggleupgrade()} // Placeholder handler
            onGenerateQrClick={() => console.log('Generate QR clicked from modal')} // Placeholder handler
            onEditData={(editedData) => {
              setStates(prev => ({
                ...prev,
                editSportData: editedData
              }));
            }}
            onEditDetailedInfoClick={() => toggleEditSportBasicModal()} // Placeholder handler
          />

          <EditSportBasicModal
            sportData={states?.editSportData}
            isOpen={states?.modal}
            toggle={toggleEditSportBasicModal}
            toggle1={toggleBasicProfileDetailModal}
            active={states?.active1}
            setActive={(activeData) => {
              setStates(prev => ({
                ...prev,
                active1: activeData
              }));
            }}
          />

          <EditSportAdvanceModal
            sportData={states?.editSportData}
            isOpen={states?.modal1}
            toggle={toggleEditSportAdvanceModal}
            toggle1={toggleAdvanceProfileDetailModal}
            active={states?.active1}
            setActive={(activeData) => {
              setStates(prev => ({
                ...prev,
                active1: activeData
              }));
            }}
          />


          <EditCareerSportModal
            sportData={states?.editSportData}
            isOpen={states?.modal2}
            toggle={toggleEditCareerAdvanceModal}
            toggle1={toggleAdvanceProfileDetailModal}
            active={states?.active1}
            setActive={(activeData) => {
              setStates(prev => ({
                ...prev,
                active1: activeData
              }));
            }}
          />

          <EditRecruitSportModal
            sportData={states?.editSportData}
            isOpen={states?.modal4}
            toggle={toggleEditRecruitAdvanceModal}
            toggle1={toggleAdvanceProfileDetailModal}
            active={states?.active1}
            setActive={(activeData) => {
              setStates(prev => ({
                ...prev,
                active1: activeData
              }));
            }}
          />

          <EditAcademicSportModal
            sportData={states?.editSportData}
            isOpen={states?.modal3}
            toggle={toggleEditAcademicAdvanceModal}
            toggle1={toggleAdvanceProfileDetailModal}
            active={states?.active1}
            setActive={(activeData) => {
              setStates(prev => ({
                ...prev,
                active1: activeData
              }));
            }}
          />


          <AdvanceProfileDetailModal
            isOpen={states?.isAdvanceProfileDetailModalOpen}
            toggle={toggleAdvanceProfileDetailModal}
            playerData={states?.detail} // Pass the player data available in state
            basicSportData={states?.selectedAdvanceSportDataForModal} // Pass the selected basic sport data
            onUpgradeClick={() => toggleupgrade()} // Placeholder handler
            onGenerateQrClick={() => console.log('Generate QR clicked from modal')} // Placeholder handler
            onEditData={(editedData) => {
              setStates(prev => ({
                ...prev,
                editSportData: editedData
              }));
            }}
            onEditDetailedInfoClick={() => toggleEditSportAdvanceModal()} // Placeholder handler
            onEditDetailedInfoClick1={() => toggleEditCareerAdvanceModal()} // Placeholder handler
            onEditDetailedInfoClick2={() => toggleEditAcademicAdvanceModal()}
            onEditDetailedInfoClick3={() => toggleEditRecruitAdvanceModal()}
          />


          <Modal isOpen={isOpenupgrade} toggle={toggleupgrade} centered >
            <ModalBody className="d-flex justify-content-center" style={{ backgroundColor: "transparent" }}>
              <CategoryCard
                title="Advance Profile"
                price="$34.99"
                description="Built for serious athletes looking to get recruited"
                features={[
                  "Everything in Basic, plus:",
                  "Academic Info (GPA, Graduation Year)",
                  "Upcoming Tournaments",
                  "Career Highlights",
                  "Recruitment Preferences",
                  "References & Contact Info",
                  "Social Media & Scouting Reports",
                  "QR Code shows full advanced profile"
                ]}
                headerBgColor="linear-gradient(to right, #6C27DF, #E6474D)"
                buttonBgGradient="linear-gradient(to right, #F7D16A, #F5A623)"
                footerText="*If you purchase this plan in advance, you'll receive an exclusive 10% discount*"
                buttonText="Get Advance"
                onButtonClick={handleAdvanceClick}
              />
            </ModalBody>
          </Modal>
          <FollowModal
            toggle={toggleFollow}
            isOpen={states?.modal5}
            follow_data={states?.follow_data}
          />
        </div >
      )}
    </>
  )
}

export default PlayerDetails1;

