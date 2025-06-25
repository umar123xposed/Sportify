import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { Col, Row } from 'reactstrap';
import AvatarImg from "../../assets/avatar.svg"
import Heart from "../../assets/heart.svg"
import Message from "../../assets/message.svg"
import Heart1 from "../../assets/heart1.svg"
import Message1 from "../../assets/message1.svg"
import Share from "../../assets/share.svg"
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Loader from "react-spinner-loader"
import { Create_Comment, Delete_Comment, Follow_Player, Like_Post } from '../../graphql/mutation';
import { useSelector } from 'react-redux';
import { Single_Post, All_Comments } from '../../graphql/query/query';
import "./index.css"
import UserImg from "../../assets/coach.webp"

const SinglePost = () => {
    const user = useSelector(state => state?.authSlice?.user?.data)
    console.log(user, "user123456")
    // const user = useSelector(state => state?.content?.user)
    const tokenData = useSelector(state => state?.content?.tokens)

    const emojiReactions = {
        "🥰": "In Love",
        "😊": "Happy",
        "👍": "Like",
        "❤️": "Love",
        "🤚": "High Five",
        "🥳": "Party",
        "🤝": "Handshake"
    };

    const [searchParams, setSearchParams] = useSearchParams()

    const [Post_Like] = useMutation(Like_Post)
    const [Post_Comment] = useMutation(Create_Comment)
    const [Get_Comments] = useLazyQuery(All_Comments)
    const [Player_Follow] = useMutation(Follow_Player)
    const [Comment_Delete] = useMutation(Delete_Comment)

    const [state, setState] = useState({
        product: null,
        product1: null,
        loader: true,
        like: false,
        likeCount: null,
        commentsData: null,
        commentText: null,
        cursor1: null,
        openDropdowns: {},
        isOpen: false,
        isFetching: false,
        likeStates: null,
        isFollow: false,
        loader3: false

    })



    const [Post_Detail] = useLazyQuery(Single_Post)

    const commentsRef = useRef(null);
    const dropdownRefs = useRef({});
    const dropdownRefs2 = useRef();
    const isFetchingRef = useRef(null);
    const productRef = useRef(null);
    const cursorRef = useRef(null)
    const userComment = useRef(null)
    const dropdownRefs1 = useRef({});


    const toggleDropdown = (id) => {
        console.log(id)
        setState(prev => ({
            ...prev,
            openDropdowns: {
                ...prev.openDropdowns,
                [id]: !prev.openDropdowns[id]  // Toggle the specific dropdown
            }
        }));
    };


    useEffect(() => {
        isFetchingRef.current = state?.isFetching; // Keep ref updated
        productRef.current = state?.product;
        cursorRef.current = state?.cursor1;
        userComment.current = state?.commentsData
    }, [state?.isFetching, state?.product, state?.cursor1, state?.commentsData]);

    useEffect(() => {
        const addScrollListener = () => {
            if (!commentsRef.current) return;

            const handleScroll = () => {
                if (isFetchingRef.current) return; // Avoid multiple fetches

                const { scrollTop, scrollHeight, clientHeight } = commentsRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    console.log("User scrolled to the bottom!");

                    if (cursorRef.current !== null && productRef.current?.id) {
                        isFetchingRef.current = true; // Prevent duplicate calls
                        setState((prev) => ({
                            ...prev,
                            isFetching: true
                        }))
                        loadMoreComments();
                    }
                }
            };

            commentsRef.current.addEventListener("scroll", handleScroll);
            return () => {
                commentsRef.current?.removeEventListener("scroll", handleScroll);
            };
        };

        const timeout = setTimeout(addScrollListener, 500);
        return () => clearTimeout(timeout);
    }, [state?.cursor1]); // Depend on cursor changes

    useEffect(() => {
        const handleClickOutside = (event) => {

            Object.keys(dropdownRefs.current).forEach((id) => {
                if (dropdownRefs.current[id] && !dropdownRefs.current[id].contains(event.target)) {
                    setState(prev => ({
                        ...prev,
                        openDropdowns: {
                            ...prev.openDropdowns,
                            [id]: false, // Close the dropdown with this id
                        }
                    }));
                }

            });

            if (dropdownRefs1.current && !dropdownRefs1.current.contains(event.target)) {

                setState((prev) => ({
                    ...prev,
                    likeStates: false
                }))
            }


        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Post_Detail({
                    variables: {
                        "postDetailId": parseInt(searchParams?.get("id"))
                    },
                    fetchPolicy: "no-cache", // Ensure a fresh request every time
                });

                if (data) {
                    setState((prev) => ({
                        ...prev,
                        likeCount: Object.values(data?.postDetail?.reactions || {}).reduce((a, b) => a + b, 0),
                        product: data?.postDetail,
                        product1: data?.postDetail,
                        like: data?.postDetail?.my_reaction,
                        isFollow: data?.postDetail?.is_following
                    }))


                    try {
                        const { data: commentData } = await Get_Comments({
                            variables: {
                                input: {
                                    "cursor": null,
                                    "limit": 10,
                                    "post_id": data?.postDetail?.id
                                }
                            },
                            fetchPolicy: "no-cache", // Ensure a fresh request every time
                        });

                        if (commentData) {

                            setState((prev) => ({
                                ...prev,
                                cursor1: commentData?.getAllPostComments?.nextCursor,
                                commentsData: commentData?.getAllPostComments,
                                loader: false
                            }))


                        }

                    } catch (e) {
                        console.error("Error fetching data:", e);
                        setState((prev) => ({
                            ...prev,
                            loader: false
                        }))
                    }
                }
            } catch (e) {
                console.error("Error fetching data:", e);
                setState((prev) => ({
                    ...prev,
                    loader: false
                }))
            }
        };

        fetchData();


    }, [state?.isOpen]);



    const loadMoreComments = async () => {
        if (!cursorRef.current || !productRef.current?.id) return;

        try {
            const { data: commentData } = await Get_Comments({
                variables: {
                    input: {
                        cursor: cursorRef.current,
                        limit: 10,
                        post_id: productRef.current.id
                    }
                },
                fetchPolicy: "no-cache"
            });

            if (commentData) {
                cursorRef.current = commentData?.getAllPostComments?.nextCursor; // Keep ref updated


                setState(prev => ({
                    ...prev,
                    cursor1: commentData?.getAllPostComments?.nextCursor, // Update cursor
                    commentsData: {
                        ...prev.commentsData,
                        data: [
                            ...(prev.commentsData?.data || []),
                            ...(commentData?.getAllPostComments?.data || [])
                        ]
                    }
                }));
            }
        } catch (e) {
            console.error("Error fetching more comments:", e);
        } finally {
            setIsFetching(false);
            isFetchingRef.current = false;
        }
    };

    const handleReact = async (id, emo, unlike) => {

        var new_data;

        new_data = {
            "post_id": id,
            "reaction": unlike === "unlike" ? null : emo
        }

        try {
            const { data } = await Post_Like({
                variables: {
                    "input": new_data
                },
                fetchPolicy: "no-cache", // Ensure a fresh request every time
            });

            if (data) {

                if (state?.product1) {

                    let updatedReactions = { ...state?.product1.reactions };
                    let myReactions = state?.product1.my_reaction;



                    if (unlike === "unlike") {
                        updatedReactions = { ...state?.product.reactions };
                        // Handle LIKE
                        if (updatedReactions[emo]) {
                            if (updatedReactions[emo] > 1) {
                                updatedReactions[emo] -= 1;
                            } else {
                                delete updatedReactions[emo];
                            }
                        }
                        else {
                            // console.log(updatedReactions, updatedReactions1, emo, "rrw0099wrewe")

                            // console.log(updatedReactions, updatedReactions1, emo, "rrw0099wrewe")
                            delete updatedReactions[emo];


                        }
                    }
                    else {

                        // Handle LIKE
                        // console.log(updatedReactions[emo], myReactions, "rrw0099wrewe")
                        if (myReactions === emo) {
                            // User clicked the same emoji again — do nothing or toggle off (if desired)
                            console.log("Same emoji clicked, no update.");
                        } else {
                            // Increment new emoji
                            if (updatedReactions[emo]) {
                                updatedReactions[emo] += 1;
                            } else {
                                updatedReactions[emo] = 1;
                            }

                            // Decrement old reaction if it exists
                            if (myReactions && updatedReactions[myReactions]) {
                                updatedReactions[myReactions] -= 1;
                                if (updatedReactions[myReactions] <= 0) {
                                    delete updatedReactions[myReactions];
                                }
                            }
                        }
                    }

                    const updatedPost = {
                        ...state?.product1,
                        reactions: updatedReactions
                    };
                    setState((prev) => ({
                        ...prev,
                        product: updatedPost
                    }))


                    if (unlike === "unlike") {
                        setState((prev) => ({
                            ...prev,
                            like: false,
                            likeCount: state?.likeCount - 1
                        }))
                    }
                    else {
                        setState((prev) => ({
                            ...prev,
                            likeStates: !state?.likeStates,
                            like: emo,
                            likeCount: state?.likeCount + 1
                        }))
                    }
                }
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }



        // var new_data;

        // if (name === "unlike") {
        //     new_data = {
        //         "post_id": id,
        //         "reaction": null
        //     }
        // }
        // else {
        //     new_data = {
        //         "post_id": id,
        //         "reaction": "love"
        //     }
        // }

        // try {

        //     // console.log(new_add, "123456ytreasdf432")
        //     const { data } = await Post_Like({
        //         variables: {
        //             "input": new_data
        //         },
        //         fetchPolicy: "no-cache", // Ensure a fresh request every time
        //     });

        //     if (data) {
        //         setLike(!like);
        //         console.log(data)

        //         if (name === "unlike") {
        //             setLikeCount(likeCount - 1)
        //         }
        //         else {
        //             setLikeCount(likeCount + 1)
        //         }
        //         // setText("")

        //     }
        // } catch (e) {
        //     console.error("Error fetching data:", e);

        // }
    }

    const handleComment = async (e, id) => {
        // console.log(commentsData, commentsData?.data[commentsData?.data?.length - 1])

        e.preventDefault()






        if (state?.commentText !== "") {
            try {

                // console.log(new_add, "123456ytreasdf432")
                const { data } = await Post_Comment({
                    variables: {
                        "input": {
                            "comment": state?.commentText,
                            "post_id": id
                        }
                    },
                    fetchPolicy: "no-cache", // Ensure a fresh request every time
                });

                if (data) {
                    console.log(data)
                    const new_data = {
                        comment: data?.createPostComment?.data?.comment,
                        post_id: data?.createPostComment?.data?.post_id,
                        user: data?.createPostComment?.data?.user,
                        id: data?.createPostComment?.data?.id
                    }

                    setState(prev => ({
                        ...prev,
                        commentsData: {
                            ...prev.commentsData,
                            data: [new_data, ...(prev.commentsData?.data || [])] // Prepend new comment
                        },
                        commentText: "" // Clear the input
                    }));


                    // setText("")

                }
            } catch (e) {
                console.error("Error fetching data:", e);

            }
        }
    }

    const handleDelete = async (id) => {
        try {

            // console.log(new_add, "123456ytreasdf432")
            const { data } = await Comment_Delete({
                variables: {
                    "deletePostCommentId": id
                },
                fetchPolicy: "no-cache", // Ensure a fresh request every time
            });

            if (data) {
                // setLike(!like)
                setState(prev => ({
                    ...prev,
                    cursor1: null,
                    isOpen: !prev.isOpen,
                    openDropdowns: {
                        ...prev.openDropdowns,
                        [id]: !prev.openDropdowns[id] // Toggle the specific dropdown
                    }
                }));

                // setDeleteLoader(!deleteLoader)
                console.log(data)
                // setText("")

            }
        } catch (e) {
            console.error("Error fetching data:", e);

        }
    }

    function timeAgo(apiDate) {
        const date = new Date(apiDate);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return "Just now";
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
        }
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
        }
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        }
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    const setDropdownRef = (id) => (el) => {
        dropdownRefs.current[id] = el;
    };

    const handleReactOpen = (id) => {
        setState((prevState) => ({
            ...prevState,
            likeStates: !state?.likeStates,
        }));
    };

    const handleFollow = async () => {

        setState((prev) => ({
            ...prev,
            loader3: true
        }))

        try {
            const { data } = await Player_Follow({
                variables: {
                    "input": {
                        "user_id": parseInt(state?.product?.user?.id)
                    }
                }
            })

            if (data) {
                setState((prev) => ({
                    ...prev,
                    isFollow: state?.isFollow == null ? "Pending" : null,
                    loader3: false
                }))
                // toast.success(data?.followPlayer?.message)
            }
        }
        catch (e) {
            console.log(e)
            setState((prev) => ({
                ...prev,
                loader3: false
            }))
        }



    }

    return (
        <div className='marg-bottom' style={{ backgroundColor: !state?.loader && (state?.product?.images?.length !== 0 && "#323232") }}>
            {
                state?.loader ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <Loader show={true}
                            spinnerSize="60px"
                            radius="10"

                        />
                    </div>
                ) : (
                    <Row className={`mx-0 ${state?.product?.images?.length === 0 ? "d-flex  justify-content-center " : 'd-flex flex-md-row flex-column-reverse'}`}>
                        <Col lg={7} md={6} className='px-0'>

                            <Swiper navigation={true} modules={[Navigation]} className="single-post-image">
                                {
                                    state?.product && state?.product?.images?.map(item => (
                                        <SwiperSlide>
                                            <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item}`} alt='post' />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>

                        </Col>
                        <Col lg={state?.product?.images?.length === 0 ? 8 : 5} md={state?.product?.images?.length === 0 ? 8 : 6} className={`single-detail ${state?.product?.images?.length === 0 && ` back-color mt-5`}`}>


                            <div className="lis2 text-light">
                                <div className="user-info">
                                    <img className='rounded-circle' src={(state?.product?.user?.picture?.includes("https://") ? state?.product?.user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${state?.product?.user?.picture}`) || AvatarImg} alt="avatar" />
                                    <div style={{ marginTop: "-8px" }}>
                                        <span>{`${state?.product?.user?.full_name} `}</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <small>{timeAgo(state?.product?.updated_at)}</small>
                                            <svg width="4" height="4" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="3.22086" cy="3.50016" r="3.10465" fill="white" />
                                            </svg>

                                            <svg width="16" height="16" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.129 16.0773C16.8599 15.2493 16.0837 14.6388 15.1627 14.6388H14.1278V11.5341C14.1278 11.2596 14.0188 10.9964 13.8247 10.8023C13.6306 10.6083 13.3674 10.4992 13.0929 10.4992H6.88362V8.42946H8.95339C9.22785 8.42946 9.49108 8.32043 9.68516 8.12635C9.87924 7.93227 9.98827 7.66904 9.98827 7.39458V5.32481H12.058C12.607 5.32481 13.1334 5.10675 13.5216 4.71859C13.9097 4.33043 14.1278 3.80398 14.1278 3.25504V2.83074C15.366 3.32993 16.4648 4.12173 17.3302 5.13836C18.1955 6.15499 18.8016 7.36617 19.0966 8.66822C19.3916 9.97027 19.3667 11.3244 19.024 12.6147C18.6814 13.9051 18.0311 15.0931 17.129 16.0773ZM9.98827 18.7059C5.90048 18.1988 2.74408 14.7216 2.74408 10.4992C2.74408 9.8576 2.82687 9.23667 2.96141 8.64679L7.9185 13.6039V14.6388C7.9185 15.1877 8.13657 15.7142 8.52472 16.1023C8.91288 16.4905 9.43933 16.7085 9.98827 16.7085M11.0232 0.150391C9.66413 0.150391 8.3184 0.418071 7.06282 0.938149C5.80725 1.45823 4.6664 2.22052 3.70542 3.18149C1.76464 5.12228 0.674316 7.75455 0.674316 10.4992C0.674316 13.2439 1.76464 15.8762 3.70542 17.817C4.6664 18.7779 5.80725 19.5402 7.06282 20.0603C8.3184 20.5804 9.66413 20.8481 11.0232 20.8481C13.7678 20.8481 16.4001 19.7577 18.3409 17.817C20.2817 15.8762 21.372 13.2439 21.372 10.4992C21.372 9.1402 21.1043 7.79448 20.5842 6.5389C20.0642 5.28332 19.3019 4.14247 18.3409 3.18149C17.3799 2.22052 16.2391 1.45823 14.9835 0.938149C13.7279 0.418071 12.3822 0.150391 11.0232 0.150391Z" fill="white" />
                                            </svg>

                                        </div>
                                    </div>
                                </div>

                                {/* <svg width="20" height="5" viewBox="0 0 28 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.76742 6.83366C2.85075 6.83366 2.06603 6.50727 1.41325 5.85449C0.760471 5.20171 0.434082 4.41699 0.434082 3.50033C0.434082 2.58366 0.760471 1.79894 1.41325 1.14616C2.06603 0.493381 2.85075 0.166992 3.76742 0.166992C4.68408 0.166992 5.4688 0.493381 6.12158 1.14616C6.77436 1.79894 7.10075 2.58366 7.10075 3.50033C7.10075 4.41699 6.77436 5.20171 6.12158 5.85449C5.4688 6.50727 4.68408 6.83366 3.76742 6.83366ZM13.7674 6.83366C12.8507 6.83366 12.066 6.50727 11.4132 5.85449C10.7605 5.20171 10.4341 4.41699 10.4341 3.50033C10.4341 2.58366 10.7605 1.79894 11.4132 1.14616C12.066 0.493381 12.8507 0.166992 13.7674 0.166992C14.6841 0.166992 15.4688 0.493381 16.1216 1.14616C16.7744 1.79894 17.1007 2.58366 17.1007 3.50033C17.1007 4.41699 16.7744 5.20171 16.1216 5.85449C15.4688 6.50727 14.6841 6.83366 13.7674 6.83366ZM23.7674 6.83366C22.8507 6.83366 22.066 6.50727 21.4132 5.85449C20.7605 5.20171 20.4341 4.41699 20.4341 3.50033C20.4341 2.58366 20.7605 1.79894 21.4132 1.14616C22.066 0.493381 22.8507 0.166992 23.7674 0.166992C24.6841 0.166992 25.4688 0.493381 26.1216 1.14616C26.7744 1.79894 27.1007 2.58366 27.1007 3.50033C27.1007 4.41699 26.7744 5.20171 26.1216 5.85449C25.4688 6.50727 24.6841 6.83366 23.7674 6.83366Z" fill="#1C1B1F" />
                                </svg> */}

                                {
                                    user?.id !== state?.product?.user?.id && (
                                        <div className={`${state?.isFollow === null ? "edit-profile-btn" : "follow-btn"} px-4 py-1`} style={{ opacity: state?.loader3 && "0.6" }} onClick={() => !state?.loader3 && handleFollow()}>

                                            {state?.isFollow == null ? "Follow" : state?.isFollow === "Approved" ? "Following" : state?.isFollow}
                                        </div>
                                    )
                                }

                            </div>
                            <div className="sub-list3">
                                <p>{state?.product?.content}</p>
                                {/* <div className="d-flex gap-2 align-items-center">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.50025 10.7861L10.5003 5.78606M7.16692 3.28606L7.55275 2.8394C8.33426 2.058 9.39416 1.61906 10.4993 1.61914C11.6044 1.61922 12.6643 2.05831 13.4457 2.83981C14.2271 3.62132 14.666 4.68122 14.6659 5.78636C14.6658 6.89149 14.2268 7.95134 13.4453 8.73273L13.0003 9.1194M8.83359 13.2861L8.50275 13.7311C7.71192 14.5125 6.64495 14.9507 5.53317 14.9507C4.42139 14.9507 3.35442 14.5125 2.56359 13.7311C2.17368 13.3458 1.86412 12.8871 1.65284 12.3813C1.44156 11.8756 1.33276 11.3329 1.33276 10.7848C1.33276 10.2367 1.44156 9.69405 1.65284 9.18831C1.86412 8.68256 2.17368 8.22378 2.56359 7.83856L3.00025 7.45273" stroke="#1E9CD7" stroke-width="2.19444" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <p>www.tcm/surfshreddeals.com/wave-slayer-3000</p>
                        </div> */}
                            </div>
                            <div className="d-flex gap-4 sub-list5">
                                <div className="left">
                                    <div className="d-flex flex-row-reverse gap-3 align-items-center position-relative">
                                        {Object.entries(state?.product?.reactions || {}).length > 0 ? (
                                            Object.entries(state?.product.reactions).map(([emoji, count], index) => (
                                                <div className={index === 0 ? "img9" : "img3"} key={emoji}>
                                                    <span className="pb-0" style={{ fontSize: "20px" }}>{emoji}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="img9">
                                                <span className="pb-0" style={{ fontSize: "20px" }}>❤️</span>
                                            </div>
                                        )}

                                    </div>

                                    <p className='mb-0 text-light ps-1'>{Object.values(state?.product?.reactions || {}).reduce((a, b) => a + b, 0)}</p>


                                </div>
                                <div className="d-flex gap-1 align-items-center text-light">
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.3906 30.6797C19.9517 30.6797 22.4553 29.9202 24.5848 28.4974C26.7143 27.0745 28.374 25.0521 29.3541 22.6859C30.3342 20.3198 30.5907 17.7161 30.091 15.2042C29.5914 12.6923 28.3581 10.385 26.5471 8.57399C24.7361 6.76301 22.4288 5.52972 19.9169 5.03007C17.405 4.53042 14.8013 4.78686 12.4352 5.76696C10.069 6.74705 8.04662 8.40679 6.62374 10.5363C5.20086 12.6658 4.44141 15.1694 4.44141 17.7305C4.44141 19.8023 4.92772 21.7591 5.79388 23.4958C6.44566 24.8065 5.53921 26.5748 5.1939 27.8654C5.1174 28.1508 5.11738 28.4514 5.19386 28.7368C5.27034 29.0223 5.42061 29.2826 5.62957 29.4915C5.83853 29.7005 6.09882 29.8508 6.38426 29.9272C6.66971 30.0037 6.97026 30.0037 7.2557 29.9272C8.54631 29.5819 10.3146 28.6754 11.6253 29.3287C13.417 30.2183 15.3903 30.6807 17.3906 30.6797Z" stroke="white" stroke-width="1.72656" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <small style={{ fontSize: "16px" }}>{state?.product?.comments_count}</small>
                                    {/* <img src={Download} alt="msg" />
                            <small>12</small> */}
                                </div>
                            </div>

                            <div className="d-flex gap-4 sub-list6">
                                <div className="position-relative" ref={dropdownRefs2} onMouseEnter={() => handleReactOpen(state?.product?.id)} onMouseLeave={() => handleReactOpen(state?.product?.id)}>

                                    {
                                        state?.like ? (
                                            <div className="d-flex gap-2 align-items-center position-relative"
                                                onClick={() => handleReact(state?.product?.id, state?.like, "unlike")}

                                            >

                                                <p className='mb-0' style={{ fontSize: "20px" }}>{state?.like}</p>
                                                <small className='text-white' style={{ fontSize: "16px" }}>{emojiReactions[state?.like] || "React"}</small>
                                            </div>
                                        ) : (

                                            <div className="d-flex gap-2 align-items-center text-light"
                                                onClick={() => handleReact(state?.product?.id, "👍", "like")}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M9.566 19.112C9.69273 19.2018 9.8442 19.25 9.9995 19.25C10.1548 19.25 10.3063 19.2018 10.433 19.112L10 18.5L10.434 19.112L10.442 19.106L10.463 19.091L10.543 19.033C10.6123 18.983 10.7107 18.91 10.838 18.814C12.324 17.6924 13.7267 16.4645 15.035 15.14C16.183 13.972 17.35 12.607 18.234 11.159C19.114 9.719 19.75 8.135 19.75 6.547C19.75 4.662 19.165 3.189 18.13 2.189C17.1 1.195 15.71 0.75 14.25 0.75C12.525 0.75 11.002 1.583 10 2.867C8.998 1.583 7.474 0.75 5.75 0.75C2.67 0.75 0.25 3.389 0.25 6.547C0.25 8.135 0.887 9.718 1.766 11.159C2.65 12.607 3.817 13.972 4.965 15.141C6.35981 16.5521 7.86161 17.8534 9.457 19.033L9.537 19.091L9.558 19.106L9.566 19.112Z" fill="none" stroke='white' />
                                                </svg>
                                                <small style={{ fontSize: "16px" }}>Like</small>
                                            </div>


                                        )
                                    }
                                    {state?.likeStates && (
                                        <div className="reaction-dropdown d-flex gap-2 p-2">
                                            {Object.keys(emojiReactions).map((emoji) => (
                                                <span className="border-0" key={emoji} style={{ fontSize: "20px" }} onClick={() => handleReact(state?.product?.id, emoji)}>
                                                    {emoji}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="d-flex gap-1 align-items-center text-light"
                                // onClick={() => toggle(itm)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.3906 30.6797C19.9517 30.6797 22.4553 29.9202 24.5848 28.4974C26.7143 27.0745 28.374 25.0521 29.3541 22.6859C30.3342 20.3198 30.5907 17.7161 30.091 15.2042C29.5914 12.6923 28.3581 10.385 26.5471 8.57399C24.7361 6.76301 22.4288 5.52972 19.9169 5.03007C17.405 4.53042 14.8013 4.78686 12.4352 5.76696C10.069 6.74705 8.04662 8.40679 6.62374 10.5363C5.20086 12.6658 4.44141 15.1694 4.44141 17.7305C4.44141 19.8023 4.92772 21.7591 5.79388 23.4958C6.44566 24.8065 5.53921 26.5748 5.1939 27.8654C5.1174 28.1508 5.11738 28.4514 5.19386 28.7368C5.27034 29.0223 5.42061 29.2826 5.62957 29.4915C5.83853 29.7005 6.09882 29.8508 6.38426 29.9272C6.66971 30.0037 6.97026 30.0037 7.2557 29.9272C8.54631 29.5819 10.3146 28.6754 11.6253 29.3287C13.417 30.2183 15.3903 30.6807 17.3906 30.6797Z" stroke="white" stroke-width="1.72656" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <small style={{ fontSize: "16px" }}>Comment</small>
                                </div>
                                {/* <div className="d-flex gap-2 align-items-center" onClick={() => handleShare(itm.id)}>
                                                              <img src={Share} alt="share" />
                                                              <small>Share</small>
                                                            </div> */}
                            </div>

                            <div className='all-comments pb-5 text-light' ref={commentsRef}>

                                <p>All Comments</p>
                                {
                                    state?.commentsData?.data?.length === 0 ? (
                                        <div className='d-flex justify-content-center align-items-center border border-secondary rounded text-secondary' style={{ height: "80px", fontSize: "14px" }}>
                                            No Comments Yet
                                        </div>
                                    ) : (
                                        <div>
                                            {
                                                state?.commentsData && state?.commentsData?.data?.map(item => (
                                                    <div className='d-flex gap-2 comment-1'>
                                                        <img className='rounded-circle' src={(item?.user?.picture?.includes("https://") ? item?.user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture}`) || AvatarImg} alt='users' />
                                                        <div className='border border-secondary rounded p-2'>
                                                            <div className='d-flex gap-2 justify-content-between align-items-center'>
                                                                <p style={{ width: "100%" }}>{`${item?.user?.full_name}`}</p>

                                                                {
                                                                    user?.id === item?.user?.id &&
                                                                    <div className='position-relative d-flex justify-content-end'
                                                                        ref={(el) => (dropdownRefs.current[item.id] = el)}
                                                                    >

                                                                        <svg
                                                                            onClick={() => toggleDropdown(item.id)}
                                                                            style={{ cursor: "pointer" }}
                                                                            width="20"
                                                                            height="5"
                                                                            viewBox="0 0 28 7"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="M3.76742 6.83366C2.85075 6.83366 2.06603 6.50727 1.41325 5.85449C0.760471 5.20171 0.434082 4.41699 0.434082 3.50033C0.434082 2.58366 0.760471 1.79894 1.41325 1.14616C2.06603 0.493381 2.85075 0.166992 3.76742 0.166992C4.68408 0.166992 5.4688 0.493381 6.12158 1.14616C6.77436 1.79894 7.10075 2.58366 7.10075 3.50033C7.10075 4.41699 6.77436 5.20171 6.12158 5.85449C5.4688 6.50727 4.68408 6.83366 3.76742 6.83366ZM13.7674 6.83366C12.8507 6.83366 12.066 6.50727 11.4132 5.85449C10.7605 5.20171 10.4341 4.41699 10.4341 3.50033C10.4341 2.58366 10.7605 1.79894 11.4132 1.14616C12.066 0.493381 12.8507 0.166992 13.7674 0.166992C14.6841 0.166992 15.4688 0.493381 16.1216 1.14616C16.7744 1.79894 17.1007 2.58366 17.1007 3.50033C17.1007 4.41699 16.7744 5.20171 16.1216 5.85449C15.4688 6.50727 14.6841 6.83366 13.7674 6.83366ZM23.7674 6.83366C22.8507 6.83366 22.066 6.50727 21.4132 5.85449C20.7605 5.20171 20.4341 4.41699 20.4341 3.50033C20.4341 2.58366 20.7605 1.79894 21.4132 1.14616C22.066 0.493381 22.8507 0.166992 23.7674 0.166992C24.6841 0.166992 25.4688 0.493381 26.1216 1.14616C26.7744 1.79894 27.1007 2.58366 27.1007 3.50033C27.1007 4.41699 26.7744 5.20171 26.1216 5.85449C25.4688 6.50727 24.6841 6.83366 23.7674 6.83366Z"
                                                                                fill="white"
                                                                            />
                                                                        </svg>
                                                                        {state?.openDropdowns[item.id] && (
                                                                            <div className=" headerDropdownComment py-2">

                                                                                <div className="d-flex gap-3 align-items-center" onClick={() => handleDelete(item.id)}>


                                                                                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                                    </svg>


                                                                                    <p className='mb-0'>Delete</p>
                                                                                </div>

                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                }

                                                            </div>
                                                            <span>{item?.comment}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }




                            </div>
                            {/* <form onSubmit={(e) => handleComment(e, singlePost?.id)} className="sub-modal4">
                                <img className="rounded-circle" src={(singlePost?.user?.picture?.includes("https://") ? singlePost?.user?.picture : `${import.meta.env.VITE_IMAGEURL}${singlePost?.user?.picture}`) || AvatarImg} alt="user" />
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={comment}
                                        className="form-control"
                                        placeholder="Write a comment"
                                        onChange={(e) => setComment(e.target.value)}
                                    />

                                </div>
                                <button type="submit" className="send-msg2" style={{ opacity: (comment !== "") ? 1 : 0.6, cursor: (comment !== "") ? "pointer" : "not-allowed" }}>
                                    <svg width="30" height="30" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.0004 9.00001L1.69842 1.03401C1.60543 0.997838 1.50374 0.990318 1.40644 1.01242C1.30913 1.03451 1.22067 1.08522 1.15242 1.15801C1.08242 1.23268 1.03423 1.32511 1.01307 1.42524C0.991915 1.52538 0.998607 1.62941 1.03242 1.72601L3.50042 9.00001M18.0004 9.00001L1.69842 16.966C1.60543 17.0022 1.50374 17.0097 1.40644 16.9876C1.30913 16.9655 1.22067 16.9148 1.15242 16.842C1.08242 16.7673 1.03423 16.6749 1.01307 16.5748C0.991915 16.4746 0.998607 16.3706 1.03242 16.274L3.50042 9.00001M18.0004 9.00001H3.50042" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                </button>
                            </form> */}
                            <form onSubmit={(e) => handleComment(e, state?.product?.id)} className="sub-modal4 d-flex gap-2  my-3">
                                <img className="rounded-circle border user-img" src={user?.picture ? (user?.picture?.includes("https://") ? user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${user?.picture}`) : UserImg} alt="user" />
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={state?.commentText}
                                        className="form-control-comment"
                                        placeholder="Write a comment"
                                        onChange={(e) => {
                                            setState((prev) => ({
                                                ...prev,
                                                commentText: e.target.value
                                            }))
                                        }}
                                    />

                                </div>
                                <button type="submit" className="send-msg2" style={{ opacity: (state?.commentText !== "") ? 1 : 0.6, cursor: (state?.commentText !== "") ? "pointer" : "not-allowed" }}>
                                    <svg width="30" height="30" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.0004 9.00001L1.69842 1.03401C1.60543 0.997838 1.50374 0.990318 1.40644 1.01242C1.30913 1.03451 1.22067 1.08522 1.15242 1.15801C1.08242 1.23268 1.03423 1.32511 1.01307 1.42524C0.991915 1.52538 0.998607 1.62941 1.03242 1.72601L3.50042 9.00001M18.0004 9.00001L1.69842 16.966C1.60543 17.0022 1.50374 17.0097 1.40644 16.9876C1.30913 16.9655 1.22067 16.9148 1.15242 16.842C1.08242 16.7673 1.03423 16.6749 1.01307 16.5748C0.991915 16.4746 0.998607 16.3706 1.03242 16.274L3.50042 9.00001M18.0004 9.00001H3.50042" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                </button>
                            </form>
                        </Col>

                    </Row>
                )
            }

        </div>
    );
}

export default SinglePost;