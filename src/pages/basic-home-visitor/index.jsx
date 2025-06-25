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
    slidesToShow: 6,
    slidesToScroll: 6,
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
                    //   navigate(`/player?id=${parseInt(searchParams.get("id"))}`)
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

        fetchData2()


    }, [searchParams])

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
                        <Row className="align-items-center mb-4">
                                        <Col xs="auto">
                                          <div onClick={() => navigate(-1)} className="d-flex align-items-center back-btn">
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
                                          <h2 className="profile-title text-white mb-0">Profile</h2>
                                        </Col>
                                      </Row>
                        <Row className="mx-0">
                            
                            <Col xl={12} md={12} className="d-flex flex-column  mb-4">



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
                                                    <h3 className="player-name text-white mb-0">{state?.detail?.user?.full_name} <small style={{ opacity: "0.6" }}>{state?.detail?.nick_name ? `(${state?.detail?.nick_name})` : ''}</small></h3>
                                                    <div className="player-id d-flex gap-3 align-items-center mt-1">
                                                        ID: {state?.detail?.player_id}
                                                        <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} onClick={() => handleCopy(state?.detail?.player_id)}>
                                                            <path d="M5.42569 18.025H4.58469C2.72048 18.025 1.2207 16.5252 1.2207 14.661V4.56907C1.2207 2.70486 2.72048 1.20508 4.58469 1.20508H14.6767C16.5409 1.20508 18.0406 2.70486 18.0406 4.56907V5.41006M12.9947 9.61505H23.0866C23.9788 9.61505 24.8345 9.96947 25.4653 10.6003C26.0962 11.2312 26.4506 12.0869 26.4506 12.979V23.071C26.4506 23.9632 26.0962 24.8188 25.4653 25.4497C24.8345 26.0806 23.9788 26.435 23.0866 26.435H12.9947C12.1025 26.435 11.2468 26.0806 10.616 25.4497C9.9851 24.8188 9.63068 23.9632 9.63068 23.071V12.979C9.63068 12.5373 9.71769 12.0998 9.88674 11.6917C10.0558 11.2836 10.3036 10.9127 10.616 10.6003C10.9283 10.288 11.2992 10.0402 11.7073 9.87112C12.1155 9.70206 12.5529 9.61505 12.9947 9.61505Z" stroke="white" stroke-width="2.10249" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </Col>
                                                <Col className="d-flex justify-content-end">

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
                                <div className="profilecheckcard linearbasic" onClick={() => navigate(`/player-details?type=basic${searchParams.get("id") ? `&id=${parseInt(searchParams.get("id"))}` : ""}`)}>
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

                                <div className="profilecheckcard linearadvance" onClick={() => navigate(`/player-details?type=advanced${searchParams.get("id") ? `&id=${parseInt(searchParams.get("id"))}` : ""}`)}>
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
