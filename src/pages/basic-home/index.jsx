import "./index.css"
import { Col, Row, Spinner } from 'reactstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileType } from "../../redux/profileSlice";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { All_Highlights, GET_ALL_PACKAGES, MY_INVITES, Player_Profile, PLAYER_PROFILE_DETAIL, PLAYER_QR_CODE } from "../../graphql/query/query";
import ChildProfileCard from "../../components/elements/childProfileCard/index";
import Slider from "react-slick";
import Loader from "react-spinner-loader"
import ViewHighlightModal from "../../components/elements/view-highlight";
import AddHighlightModal from "../../components/elements/add-highlight";
import FollowModal from "../../components/modules/followModal";
import toast from "react-hot-toast";
import { Delete_Highlight } from "../../graphql/mutation";



const settings1 = {
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,

      }
    },

    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,

      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 440,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
}


export default function BasicHome() {

  const role = useSelector((state) => state.authSlice?.role);

  const [searchParams] = useSearchParams()

  const [state, setState] = useState({
    detail: null,
    detail1: null,
    cursor: null,
    active: null,
    loader: true,
    loader1: true,
    isAddHighlightModalOpen: false,
    isViewHighlightModalOpen: false,
    active: false,
    imageType: null,
    imageSelect: null,
    modal5: false,
    follow_data: null,
    cursor1: null
  })

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 10,
    slidesToScroll: 10,
    afterChange: (current) => {
      const preloadOffset = 2;
      const total = state?.detail1?.length ?? 0; // or states?.detail1?.data?.length
      const remaining = total - current;

      console.log("Current slide:", current, "Remaining:", remaining, "Cursor:", state.cursor1);

      if (state?.cursor1 && remaining <= preloadOffset && !state.loader1) {
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


  const navigate = useNavigate();

  const [All_Invites] = useLazyQuery(MY_INVITES)
  const [Profile_Detail] = useLazyQuery(Player_Profile)
  const [Get_Highlights] = useLazyQuery(All_Highlights)
  const [Highlight_Delete] = useMutation(Delete_Highlight)


  useEffect(() => {
    setState((prev) => ({
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
          setState((prev) => ({
            ...prev,
            detail1: data?.allHighlights,
            cursor1: data?.allHighlights?.nextCursor,
            loader1: false
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

    (role === "Athlete" || role === "Coach") && fetchData1()

  }, [state?.active])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await All_Invites({
          variables: {
            input: {
              limit: 10,
              cursor: null,
              invite_type: "Approved",
            },
          },
          fetchPolicy: "no-cache",
        });

        if (data) {
          if (state.cursor === null) {
            navigate(`/parent?id=${data?.myInvites?.data?.[0]?.user_id}`)
          }

          setState((prev) => ({
            ...prev,
            detail: data,
            cursor: data?.myInvites?.nextCursor,
            loader: false
          }))
        }
      } catch (e) {
        console.log(e)
        setState((prev) => ({
          ...prev,
          loader: false
        }))
      }
    }

    const fetchData1 = async () => {
      try {
        const { data } = await Profile_Detail({
          variables: {
            "input": {
              "user_id": parseInt(searchParams.get("id")) || null
            }
          },
          fetchPolicy: "no-cache",
        });

        if (data) {
          // if (searchParams.get("id")) {
          //   navigate(`/athlete?id=${searchParams.get("id")}`)
          // }
          // else {
          //   navigate(`/athlete?id=${data?.playerProfile?.user?.id}`)
          // }
          setState((prev) => ({
            ...prev,
            loader: false,
            detail: data?.playerProfile,
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

    const fetchData2 = async () => {
      console.log(role, "12345ytrew")
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
          navigate(`/recruiter/player?id=${parseInt(searchParams.get("id"))}`)
          setState((prev) => ({
            ...prev,
            loader: false,
            detail: data?.playerProfile,
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

    role === "Parent" && fetchData()

    role === "Athlete" && fetchData1()

    role === "Coach" && fetchData2()

    role === "Recruiter" && fetchData2()


  }, [])

  console.log(role)

  const fetchHighlights = async () => {
    try {
      const { data } = await Get_Highlights({
        variables: {
          input: {
            user_id: parseInt(searchParams.get("id")),
            limit: 10,
            cursor: state.cursor1
          }
        },
        fetchPolicy: "no-cache"
      });

      if (data?.allHighlights) {
        setState((prev) => ({
          ...prev,
          detail1: {
            ...prev.detail1,
            data: [...(prev.detail1?.data || []), ...(data.allHighlights.data || [])]
          },
          cursor1: data.allHighlights.nextCursor,
          loader1: false
        }));
      }
    } catch (err) {
      console.error("Error fetching highlights:", err);
      setState((prev) => ({ ...prev, loader1: false }));
    }
  };


  const toggleAddHighlightModal = () => {
    if (state?.isAddHighlightModalOpen) {
      setState((prev) => ({
        ...prev,
        active: !state?.active
      }))
    }
    setState((prev) => ({
      ...prev,
      isAddHighlightModalOpen: !state?.isAddHighlightModalOpen
    }))
  }

  const toggleViewHighlightModal = (img) => {
    console.log(img)
    if (!state?.isViewHighlightModalOpen) {
      setState((prev) => ({
        ...prev,
        imageType: img.type,
        imageSelect: `${import.meta.env.VITE_BASE_URL_IMAGE}${img.media}`,
        isViewHighlightModalOpen: !state?.isViewHighlightModalOpen
      }))
    }
    else {
      setState((prev) => ({
        ...prev,
        isViewHighlightModalOpen: !state?.isViewHighlightModalOpen,
        imageSelect: null,
        active: !state?.active,

      }))
    }


  }

  // const [
  //   playerProfileDetail,
  //   { loading: loading1, error: error1, data: data3, refetch: refetch1 },
  // ] = useLazyQuery(PLAYER_PROFILE_DETAIL, {
  //   fetchPolicy: "no-cache",
  // });


  const handleNav = (e) => {
    e.preventDefault()
    navigate("/parent/select-child")
  }

  const handleUser = (id) => {

    navigate(`/parent?id=${id}`)
  }

  const toggleFollow = (name) => {
    if (name) {
      setState((prev) => ({
        ...prev,
        follow_data: name,
        modal5: !state.modal5,
      }))
    }
    else {
      setState((prev) => ({
        ...prev,
        modal5: !state.modal5,
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
        setState((prev) => ({
          ...prev,
          active: !state?.active
        }));
        toast.success(data?.deleteHighlight?.message)
      }
    } catch (e) {
      console.log(e)

    }
  }


  return (


    <>
      {
        state?.loader ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"

              color="red"
            />
          </div>
        ) : (
          <div className="container mt-5">
            <Row className="mx-0">
              {
                role === "Parent" && (
                  <Col xl={12} md={12} className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-white">Your Athlete Profile</h1>
                    <button className="primary-btn d-flex gap-2 align-items-center p-3" onClick={handleNav}>
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6209 10.2097H10.5603V16.2703C10.5603 16.5917 10.4325 16.9001 10.2052 17.1274C9.97791 17.3547 9.6696 17.4824 9.34813 17.4824C9.02665 17.4824 8.71835 17.3547 8.49103 17.1274C8.26371 16.9001 8.13601 16.5917 8.13601 16.2703V10.2097H2.0754C1.75393 10.2097 1.44562 10.082 1.2183 9.85464C0.990987 9.62733 0.863281 9.31902 0.863281 8.99754C0.863281 8.67607 0.990987 8.36776 1.2183 8.14045C1.44562 7.91313 1.75393 7.78542 2.0754 7.78542H8.13601V1.72482C8.13601 1.40334 8.26371 1.09503 8.49103 0.867717C8.71835 0.6404 9.02665 0.512695 9.34813 0.512695C9.6696 0.512695 9.97791 0.6404 10.2052 0.867717C10.4325 1.09503 10.5603 1.40334 10.5603 1.72482V7.78542H16.6209C16.9423 7.78542 17.2506 7.91313 17.478 8.14045C17.7053 8.36776 17.833 8.67607 17.833 8.99754C17.833 9.31902 17.7053 9.62733 17.478 9.85464C17.2506 10.082 16.9423 10.2097 16.6209 10.2097Z" fill="#241C19" />
                      </svg>

                      Add Athlete
                    </button>
                  </Col>
                )
              }
              {
                (role === "Athlete" || role === "Coach" || role === "Recruiter") && (
                  <Col xl={12} md={12} className="d-flex flex-column  mb-4">


                    <h1 className="text-white">Profile</h1>

                    <div className="profile-info-card">
                      <Row className="align-items-center justify-content-center">

                        <Col xs="auto" xl={2} lg={2} md={4} sm={4}>
                          <img
                            className="profile-lg-image"
                            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${state?.detail?.user?.picture}`}
                            alt={`${state?.detail?.user?.full_name}'s profile`}
                          />
                        </Col>
                        <Col xl={10} lg={10} md={8} sm={8} className="ps-xl-2 ps-md-5 ps-2">
                          <Row className="align-items-center ">
                            <Col>
                              <h3 className="player-name mb-0 text-white">{state?.detail?.user?.full_name} <small style={{ opacity: "0.6" }}>{state?.detail?.nick_name ? `(${state?.detail?.nick_name})` : ''}</small></h3>
                              <div className="player-id d-flex gap-3 align-items-center mt-1">
                                ID: {state?.detail?.player_id}
                                <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} onClick={() => handleCopy(state?.detail?.player_id)}>
                                  <path d="M5.42569 18.025H4.58469C2.72048 18.025 1.2207 16.5252 1.2207 14.661V4.56907C1.2207 2.70486 2.72048 1.20508 4.58469 1.20508H14.6767C16.5409 1.20508 18.0406 2.70486 18.0406 4.56907V5.41006M12.9947 9.61505H23.0866C23.9788 9.61505 24.8345 9.96947 25.4653 10.6003C26.0962 11.2312 26.4506 12.0869 26.4506 12.979V23.071C26.4506 23.9632 26.0962 24.8188 25.4653 25.4497C24.8345 26.0806 23.9788 26.435 23.0866 26.435H12.9947C12.1025 26.435 11.2468 26.0806 10.616 25.4497C9.9851 24.8188 9.63068 23.9632 9.63068 23.071V12.979C9.63068 12.5373 9.71769 12.0998 9.88674 11.6917C10.0558 11.2836 10.3036 10.9127 10.616 10.6003C10.9283 10.288 11.2992 10.0402 11.7073 9.87112C12.1155 9.70206 12.5529 9.61505 12.9947 9.61505Z" stroke="white" stroke-width="2.10249" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                              </div>
                            </Col>
                            <Col className="d-flex justify-content-end">
                              {/* <button className="edit-profile-btn py-2 px-3" onClick={() => {
                                setEdit(true);
                                handleGetPlayerDetails(state?.user_id, "Basic");
                                setEditType("Basic");
                              }}>
                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 5.5H3C2.46957 5.5 1.96086 5.71071 1.58579 6.08579C1.21071 6.46086 1 6.96957 1 7.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H12C12.5304 18.5 13.0391 18.2893 13.4142 17.9142C13.7893 17.5391 14 17.0304 14 16.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M13 3.50011L16 6.50011M17.385 5.08511C17.7788 4.69126 18.0001 4.15709 18.0001 3.60011C18.0001 3.04312 17.7788 2.50895 17.385 2.11511C16.9912 1.72126 16.457 1.5 15.9 1.5C15.343 1.5 14.8088 1.72126 14.415 2.11511L6 10.5001V13.5001H9L17.385 5.08511Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Edit Profile
                              </button> */}
                            </Col>
                          </Row>
                          <div className="mt-3 stats-row d-flex flex-row">
                            <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Reacts")}>
                              <div className="stat-value">{state?.detail?.reaction}</div>
                              <div className="stat-label">Reacts</div>
                            </div>
                            <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Followers")}>
                              <div className="stat-value">{state?.detail?.followers}</div>
                              <div className="stat-label">Followers</div>
                            </div>
                            <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Following")}>
                              <div className="stat-value">{state?.detail?.following}</div>
                              <div className="stat-label">Following</div>
                            </div>
                          </div>
                          <Row className="mt-4 circular-icons-row mx-0" style={{ gap: '2px' }}>
                            <Slider {...settings} className="align-left">

                              {/* First slide: Add Highlight button */}
                              {
                                (role === "Parent" || role === "Athlete") && (
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
                                state?.detail1?.data?.map((item) => (
                                  <div className="">
                                    <div
                                      className="d-flex flex-column align-items-center position-relative"
                                      onClick={() => toggleViewHighlightModal(item.media)}
                                    >
                                      <div className="circular-icon position-relative media-wrapper1">
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
                                        <div
                                          className="remove-icon"
                                          onClick={(e) => {
                                            e.stopPropagation();

                                            handleHighlightDelete(item?.id)
                                          }}
                                        >
                                          X
                                        </div>
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

                  </Col>
                )
              }
              <Col xs={12} className="px-3">
                <Slider {...settings1} className="align-left">
                  {
                    state?.detail && state?.detail?.myInvites?.data?.map((item) => (
                      <ChildProfileCard
                        id={item?.player_id}
                        isSelected={parseInt(searchParams.get("id")) === item.user_id}
                        name={item?.user?.full_name}
                        image={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture}`}
                        // isAddCard="false"
                        onClick={() => handleUser(item.user_id)} />
                    ))
                  }
                </Slider>
              </Col>
              <div className="d-flex flex-wrap mt-2">

              </div>

            </Row>


            <Row className="mt-5 justify-content-center mx-0">
              <Col xl={12} md={12}><h1 className="text-white">View Profile</h1></Col>

              <div className="profile-cards-row mt-2">
                <div className="profilecheckcard linearbasic" onClick={() => navigate(`/${role.toLowerCase()}/player-details?type=basic${searchParams.get("id") ? `&id=${parseInt(searchParams.get("id"))}` : ""}`)}>
                  <Row className="w-100">
                    <Col xl={10} md={10} className="d-flex align-items-center">
                      <div>
                        <h1 className="text-white">Basic Profile</h1>
                        <p className="text-white" style={{ fontSize: "0.8rem" }}>check basic profiles of your child</p>
                      </div>
                    </Col>
                    <Col xl={2} md={2} className="d-flex justify-content-end align-items-center">
                      <button className="bg-white d-flex align-items-center justify-content-center border-0 rounded-circle" style={{ height: "24px", width: "24px" }}>
                        <svg width="8" height="14" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1024 11.6665L2.42021 21L0.5 18.667L7.22209 10.5L0.5 2.33297L2.42021 0L10.1024 9.33352C10.357 9.64292 10.5 10.0625 10.5 10.5C10.5 10.9375 10.357 11.3571 10.1024 11.6665Z" fill="#241C19" />
                        </svg>
                      </button>
                    </Col>
                  </Row>

                </div>

                <div className="profilecheckcard linearadvance" onClick={() => navigate(`/${role.toLowerCase()}/player-details?type=advanced${searchParams.get("id") ? `&id=${parseInt(searchParams.get("id"))}` : ""}`)}>
                  <Row className="w-100">
                    <Col xl={10} md={10} className="d-flex align-items-center">
                      <div>
                        <h1 className="text-white">Advance Profile</h1>
                        <p className="text-white" style={{ fontSize: "0.8rem", fontWeight: "lighter" }}>check advance profiles of your child</p>
                      </div>
                    </Col>
                    <Col xl={2} md={2} className="d-flex justify-content-end align-items-center">
                      <button className="bg-white d-flex align-items-center justify-content-center border-0 rounded-circle" style={{ height: "24px", width: "24px" }}>
                        <svg width="8" height="14" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1024 11.6665L2.42021 21L0.5 18.667L7.22209 10.5L0.5 2.33297L2.42021 0L10.1024 9.33352C10.357 9.64292 10.5 10.0625 10.5 10.5C10.5 10.9375 10.357 11.3571 10.1024 11.6665Z" fill="#241C19" />
                        </svg>

                      </button>
                    </Col>
                  </Row>

                </div>
              </div>

            </Row>
          </div>
        )
      }
      <ViewHighlightModal
        id={parseInt(searchParams.get("id"))}
        isOpen={state?.isViewHighlightModalOpen}
        toggle={toggleViewHighlightModal}
        image={state?.imageSelect}
        type={state?.imageType}
      />

      <AddHighlightModal
        id={parseInt(searchParams.get("id"))}
        isOpen={state?.isAddHighlightModalOpen}
        toggle={toggleAddHighlightModal}
        playerData={state} // Pass the player data available in state
        basicSportData={state?.selectedBasicSportDataForModal} // Pass the selected basic sport data

      />

      <FollowModal
        toggle={toggleFollow}
        isOpen={state?.modal5}
        follow_data={state?.follow_data}
      />
    </>

  );
}
