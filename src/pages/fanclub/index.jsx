import { useEffect, useRef, useState } from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import AvatarImg from "../../assets/avatar.svg"
import Heart from "../../assets/heart.svg"
import Message from "../../assets/message.svg"
import Heart1 from "../../assets/heart1.svg"
import Message1 from "../../assets/message1.svg"
import Share from "../../assets/share.svg"
import { useNavigate } from "react-router-dom";
import { Create_Comment, Create_Post, Like_Post } from "../../graphql/mutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import Loader from "react-spinner-loader"
import { AsyncImage } from "loadable-image";
import SkeletonLoader from "../../components/elements/skeleton-loader";
import { All_Community_Post } from "../../graphql/query/query";
import UserImg from "../../assets/coach.webp"

import "./fanclub.css"



const Community = () => {

  const user = useSelector(state => state?.authSlice?.user?.data)
  console.log(user, "user123456")

  const userRole = useSelector(state => state?.authSlice?.role)
  console.log(userRole)


  const emojiReactions = {
    "🥰": "In Love",
    "😊": "Happy",
    "👍": "Like",
    "❤️": "Love",
    "🤚": "High Five",
    "🥳": "Party",
    "🤝": "Handshake"
  };


  const navigate = useNavigate()
  const dropdownRefs = useRef({});

  const [state, setState] = useState({
    text: "",
    upload: { selectedImages: [], allImages: [] },
    detail: null,
    detail1: null,
    product: null,
    cursor: null,
    loader: false,
    loader1: true,
    loader2: false,
    loader3: false,
    loader4: false,
    likes: {},
    likeStates: {},
    modal: false,
    singlePost: null,
    comment: "",
    isOpen: false
  });

  console.log(state)

  const [Post_Create] = useMutation(Create_Post)
  const [Post_Like] = useMutation(Like_Post)
  const [Post_Comment] = useMutation(Create_Comment)
  const [Get_Post] = useLazyQuery(All_Community_Post)
  // const [Get_Products] = useLazyQuery(Get_Home_Products);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAny = Object.values(dropdownRefs.current).some(ref => ref && ref.contains(event.target));
      if (!isClickInsideAny) {
        setState(prevState => ({
          ...prevState,
          likeStates: {}, // close all
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const { data: productData } = await Get_Products({
      //     variables: {
      //       input: {
      //         lat: loc?.latitude,
      //         limit: 10,
      //         lon: loc?.longitude
      //       }
      //     },
      //     fetchPolicy: "no-cache", // Ensure a fresh request every time
      //   });

      const { data: postData } = await Get_Post({
        variables: {
          "input": {
            "cursor": null,
            "limit": 10,
            "my_post": false
          }
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });



      // if (productData) {
      //   setState(prevState => ({
      //     ...prevState,
      //     product: productData,
      //     loader: false
      //   }));
      // }

      if (postData) {
        const initialLikes = {};
        postData.allPosts.data.forEach((post) => {
          initialLikes[post.id] = post.my_reaction;
        });
        setState(prevState => ({
          ...prevState,
          cursor: postData.allPosts.nextCursor,
          detail: postData.allPosts.data,
          detail1: postData.allPosts.data,
          likes: initialLikes,
          loader1: false
        }));
      }
      // } catch (e) {
      //   console.error("Error fetching data:", e);
      //   setState(prevState => ({
      //     ...prevState,
      //     loader: false,
      //     loader1: false
      //   }));
      // }
    };

    fetchData();

  }, [state.loader2,]);

  const toggle = (info) => {
    console.log(info, "info123oin")
    setState(prevState => ({
      ...prevState,
      singlePost: info,
      modal: !prevState.modal
    }));
  };

  const setDropdownRef = (id) => (el) => {
    dropdownRefs.current[id] = el;
  };

  const handleChange = (event) => {
    setState(prevState => ({
      ...prevState,
      text: event.target.value
    }));
    // event.target.style.height = event.target.scrollHeight + "px"; // Adjust height
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    console.log("Newly Selected Files:", files);

    if (files.length > 0) {
      setState(prevState => ({
        ...prevState,
        upload: {
          selectedImages: [...prevState.upload.selectedImages, ...files.map(file => URL.createObjectURL(file))], // Add new image previews
          allImages: [...prevState.upload.allImages, ...files], // Store actual files
        }
      }));
    }
  };

  const handleRemove = (index) => {
    console.log(index, state.upload.selectedImages.filter((_, i) => i != index))
    setState(prevState => {

      const updatedImages = prevState.upload.selectedImages.filter((_, i) => i !== index);
      const updatedFiles = prevState.upload.allImages.filter((_, i) => i !== index);

      return {
        ...prevState,
        upload: {
          selectedImages: updatedImages,
          allImages: updatedFiles, // Ensure actual file data is also updated
        }
      };
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (state.text !== "" || state.upload.selectedImages.length !== 0) {
      try {
        const { data } = await Post_Create({
          variables: {
            "input": {
              "content": state.text
            },
            "images": state.upload.allImages
          },
          fetchPolicy: "no-cache", // Ensure a fresh request every time
        });

        if (data) {
          console.log(data)
          setState(prevState => ({
            ...prevState,
            text: "",
            loader2: !prevState.loader2,
            upload: { selectedImages: [], allImages: [] }
          }));
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }
  }

  const handleReactOpen = (id) => {
    setState((prevState) => ({
      ...prevState,
      likeStates: {
        [id]: !prevState.likeStates[id], // toggle current
      },
    }));
  };
  console.log(state)

  const handleReact = async (id, name, unlike) => {

    var new_data;

    new_data = {
      "post_id": id,
      "reaction": unlike === "unlike" ? null : name
    }

    try {
      const { data } = await Post_Like({
        variables: {
          "input": new_data
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });

      if (data) {
        console.log(data?.likePost?.statusCode)
        // if (data?.likePost?.statusCode == 201) {
        const post = state?.detail1?.find(itm => itm.id === id); // find one post
        const post1 = state?.detail?.find(itm => itm.id === id);

        if (post) {
          let updatedReactions = { ...post.reactions };
          let myReactions = post.my_reaction;

          if (unlike === "unlike") {
            updatedReactions = { ...post1.reactions };
            // Handle LIKE
            if (updatedReactions[name]) {
              if (updatedReactions[name] > 1) {
                console.log("rrw0099wrewe")
                updatedReactions[name] -= 1;
              } else {
                console.log("rrw0099wrewe")
                delete updatedReactions[name];
              }
            }
            else {
              console.log(updatedReactions, name, "rrw0099wrewe")
              delete updatedReactions[name];
            }
          }
          else {
            console.log("rrw0099wrewe")
            // Handle LIKE
            if (myReactions === name) {
              // User clicked the same emoji again — do nothing or toggle off (if desired)
              console.log("Same emoji clicked, no update.");
            } else {
              // Increment new emoji
              if (updatedReactions[name]) {
                console.log("rrw0099wrewe")
                updatedReactions[name] += 1;
              } else {
                console.log("rrw0099wrewe")
                updatedReactions[name] = 1;
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
            ...post,
            reactions: updatedReactions
          };

          const updatedDetail = state.detail.map(itm =>
            itm.id === post.id ? updatedPost : itm
          );

          setState(prevState => ({
            ...prevState,
            detail: updatedDetail,
            likeStates: {
              [id]: unlike === "like" ? true : unlike === "unlike" ? true : !prevState.likeStates[id],
            },
            likes: {
              ...prevState.likes,
              [id]: unlike === "unlike" ? null : name
            }
          }));
        }
        // }
        // if (data?.likePost?.statusCode == 200) {

        // }




        // console.log(data)
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  const handleComment = async (e, id) => {
    e.preventDefault()

    if (state.comment !== "" && !state.loader3) {
      try {
        setState(prevState => ({ ...prevState, loader3: true }));
        // console.log(new_add, "123456ytreasdf432")
        const { data } = await Post_Comment({
          variables: {
            "input": {
              "comment": state.comment,
              "post_id": id
            }
          },
          fetchPolicy: "no-cache", // Ensure a fresh request every time
        });

        if (data) {
          console.log(data)
          setState(prevState => ({
            ...prevState,
            comment: "",
            loader3: false
          }));
        }
      } catch (e) {
        console.error("Error fetching data:", e);
        setState(prevState => ({ ...prevState, loader3: false }));
      }
    }

  }

  const showMoreProduct = async () => {
    setState(prevState => ({
      ...prevState,
      loader4: true
    }));
    try {
      const { data: postData } = await Get_Post({
        variables: {
          "input": {
            "cursor": state?.cursor,
            "limit": 10,
            "my_post": false
          }
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });

      if (postData) {
        const initialLikes = {};
        postData.allPosts.data.forEach((post) => {
          initialLikes[post.id] = post.is_liked;
        });
        setState(prevState => ({
          ...prevState,
          cursor: postData.allPosts.nextCursor,
          detail: [...prevState.detail, ...postData.allPosts.data],
          likes: initialLikes,
          loader1: false,
          loader4: false
        }));
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      setState(prevState => ({
        ...prevState,
        loader: false,
        loader1: false,
        loader4: false
      }));
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



  const handleShare = async (url) => {
    try {
      await navigator.share({
        title: "TCM",
        text: `${window.location.origin}/fanclub/post?id=${url}`,
        url: `${window.location.origin}/fanclub/post?id=${url}`, // Use the URL passed into the function
      });
      // console.log("Shared successfully");
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <>
      {
        (state.loader1) ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"
              color="red"

            />
          </div>
        ) : (
          <>

            <Row className="containerPadding my-5 community-list d-flex justify-content-center mx-0">
              <Col md={12}>
                <div
                  onClick={() => navigate(-1)}
                  className="d-flex back-btn mb-4"
                >
                  <svg
                    className="me-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="14"
                    viewBox="0 0 10 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                      fill="white"
                    />
                  </svg>
                  <h4>Back</h4>
                </div>
              </Col>
              <Col xl={10} lg={9} className="list1 ">
                {/* <BackButton /> */}
                {
                  console.log(userRole)
                }
                {
                  userRole === "Athlete" && (
                    <form className="sub-list1 back-color" onSubmit={(e) => handlePost(e)}>
                      <img src={user?.picture ? (user?.picture?.includes("https://") ? user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${user?.picture}`) : UserImg} className="rounded-circle border border-secondary" alt="user" />
                      {
                        console.log(user?.picture, "user?.picture")
                      }
                      <svg
                        style={{ marginTop: "14px" }}
                        width="24"
                        height="24"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => document.getElementById("fileInput").click()}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 3.5C0 2.70435 0.316071 1.94129 0.87868 1.37868C1.44129 0.816071 2.20435 0.5 3 0.5H17C17.7956 0.5 18.5587 0.816071 19.1213 1.37868C19.6839 1.94129 20 2.70435 20 3.5V10C19.9999 10.0843 19.9892 10.1684 19.968 10.25C19.9892 10.3316 19.9999 10.4157 20 10.5V17.5C20 18.2956 19.6839 19.0587 19.1213 19.6213C18.5587 20.1839 17.7956 20.5 17 20.5H3C2.20435 20.5 1.44129 20.1839 0.87868 19.6213C0.316071 19.0587 0 18.2956 0 17.5V14.5C8.02958e-05 14.4157 0.0108324 14.3316 0.0320001 14.25C0.0108324 14.1684 8.02958e-05 14.0843 0 14V3.5ZM2.994 13.33C2.646 13.3367 2.31467 13.352 2 13.376V3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5H17C17.2652 2.5 17.5196 2.60536 17.7071 2.79289C17.8946 2.98043 18 3.23478 18 3.5V9.516C13.703 9.655 10.6 10.69 8.42 12.139C9.246 12.432 10.17 12.849 11.076 13.395C12.475 14.235 13.897 15.415 14.854 16.978C14.9226 17.09 14.9684 17.2144 14.9888 17.3442C15.0093 17.4739 15.004 17.6064 14.9733 17.7341C14.9425 17.8617 14.887 17.9821 14.8097 18.0883C14.7324 18.1945 14.635 18.2845 14.523 18.353C14.411 18.4216 14.2866 18.4674 14.1568 18.4878C14.0271 18.5083 13.8946 18.503 13.7669 18.4723C13.6393 18.4415 13.5189 18.386 13.4127 18.3087C13.3065 18.2314 13.2165 18.134 13.148 18.022C12.412 16.819 11.27 15.844 10.046 15.109C8.824 14.375 7.581 13.917 6.719 13.717C5.50466 13.44 4.26136 13.3104 3.016 13.331H2.994V13.33ZM4.978 4.988C5.4236 4.67374 5.95474 4.50344 6.5 4.5C6.91 4.5 7.503 4.615 8.022 4.988C8.592 5.398 9 6.074 9 7C9 7.926 8.592 8.601 8.022 9.011C7.57652 9.32562 7.04537 9.49627 6.5 9.5C6.09 9.5 5.497 9.385 4.978 9.011C4.408 8.601 4 7.927 4 7C4 6.074 4.408 5.399 4.978 4.988Z"
                          fill="white"
                        />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        multiple // Allow multiple images
                        style={{ display: "none" }}
                        id="fileInput"
                        className="text-white"
                        onClick={(e) => (e.target.value = null)}
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />

                      <div className="d-flex align-items-start gap-3 w-100">
                        <div className="d-flex flex-column w-100">
                          <textarea
                            value={state.text}
                            onChange={handleChange}
                            className="text-message"
                            placeholder="What's on your mind"
                            rows={3}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // prevent newline
                                if (state.text !== "") {
                                  handlePost(e);
                                }

                                // handleSearch(e);    // call your search function
                              }
                            }}
                          />
                          {
                            (state.upload?.selectedImages != null || state.upload?.selectedImages?.length != 0) && (
                              <div className="d-flex align-items-center gap-2 mt-3">

                                {
                                  state.upload?.selectedImages.map((image, index) => (
                                    index < 3 &&
                                    <div className="upload-img1">
                                      <img src={image} alt="upload-img" />
                                      <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => handleRemove(index)}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                      </svg>

                                    </div>
                                  ))
                                }
                                {
                                  state.upload?.selectedImages?.length > 3 &&
                                  <small className="fw-bold">+{state.upload?.selectedImages?.length - 3}</small>
                                }

                              </div>

                            )
                          }
                        </div>

                        <button type="submit" className="send-msg1" style={{ opacity: (state.text !== "" || state.upload.selectedImages.length !== 0) ? 1 : 0.6, cursor: (state.text !== "" || state.upload.selectedImages.length !== 0) ? "pointer" : "not-allowed" }}>
                          <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.6896 0.996969C21.715 0.896439 21.7131 0.790957 21.6838 0.691448C21.6546 0.59194 21.5992 0.502024 21.5234 0.431012C21.4476 0.359998 21.3541 0.310471 21.2526 0.28756C21.1511 0.264649 21.0454 0.269187 20.9462 0.300703L18.0432 1.22445C12.3228 3.04546 6.8043 5.44422 1.57353 8.38335L0.864922 8.7812C0.785432 8.82611 0.717635 8.88898 0.666988 8.96476C0.616341 9.04054 0.584258 9.12711 0.573323 9.2175C0.562389 9.3079 0.572908 9.39958 0.604033 9.48518C0.635158 9.57079 0.686019 9.64791 0.752524 9.71035L5.64312 14.291C5.75205 14.3933 5.89625 14.45 6.04593 14.4494C6.19561 14.4488 6.33933 14.3909 6.44738 14.2877L7.3 13.474C9.37784 11.4908 11.6178 9.6835 13.9967 8.07076L14.2321 7.91129C14.2838 7.87514 14.3209 7.87317 14.3458 7.8757C14.3854 7.88136 14.4221 7.89955 14.4506 7.9276C14.4846 7.95946 14.5032 7.99757 14.5091 8.02865C14.5131 8.05321 14.5135 8.09023 14.4804 8.14391L14.3352 8.38782C12.8662 10.8534 11.1942 13.1931 9.33624 15.3828L8.57378 16.2809C8.47755 16.3946 8.42871 16.5408 8.43731 16.6893C8.44591 16.8378 8.51129 16.9774 8.62001 17.0793L13.5106 21.66C13.5774 21.7225 13.658 21.7685 13.7459 21.7943C13.8339 21.82 13.9266 21.8247 14.0167 21.8081C14.1069 21.7915 14.1918 21.7539 14.2646 21.6985C14.3375 21.6431 14.3962 21.5714 14.436 21.4891L14.79 20.7607C17.4109 15.3777 19.4728 9.7418 20.9435 3.941L21.6896 0.996969Z" fill="#241C19" />
                          </svg>



                        </button>
                      </div>
                    </form>
                  )
                }


                {
                  state.detail && state.detail.length === 0 ? (
                    <div className="containerPadding text-white border border-secondary rounded p-3 d-flex flex-column justify-content-center align-items-center my-5" style={{ height: "400px" }}>

                      <h5>
                        No Post Yet
                      </h5>

                    </div>
                  ) : (
                    <div className="">
                      {
                        state.detail && state.detail?.map((itm, index) => (
                          <div className="sub-list2 back-color" >
                            <div className="list-pad">
                              <div className="lis2">
                                {
                                  console.log(state?.product)
                                }
                                <div className="user-info" style={{ cursor: "pointer" }} onClick={() => navigate(`/player?id=${itm?.user_id}`)}>
                                  <img height={"50px"} width={"50px"} className="rounded-circle border" src={(itm?.user?.picture?.includes("https://") ? itm?.user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${itm?.user?.picture}`) || AvatarImg} alt="avatar" />
                                  <div style={{ marginTop: "-8px" }}>
                                    <span>{`${itm?.user?.full_name}`}</span>
                                    <div className="d-flex gap-1 align-items-center gap-2">
                                      <small>{timeAgo(itm.updated_at)}</small>
                                      <svg
                                        width="4"
                                        height="4"
                                        viewBox="0 0 7 7"
                                        fill="white"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <circle
                                          cx="3.22086"
                                          cy="3.50016"
                                          r="3.10465"
                                          fill="white"
                                        />
                                      </svg>

                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 22 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M17.129 16.0773C16.8599 15.2493 16.0837 14.6388 15.1627 14.6388H14.1278V11.5341C14.1278 11.2596 14.0188 10.9964 13.8247 10.8023C13.6306 10.6083 13.3674 10.4992 13.0929 10.4992H6.88362V8.42946H8.95339C9.22785 8.42946 9.49108 8.32043 9.68516 8.12635C9.87924 7.93227 9.98827 7.66904 9.98827 7.39458V5.32481H12.058C12.607 5.32481 13.1334 5.10675 13.5216 4.71859C13.9097 4.33043 14.1278 3.80398 14.1278 3.25504V2.83074C15.366 3.32993 16.4648 4.12173 17.3302 5.13836C18.1955 6.15499 18.8016 7.36617 19.0966 8.66822C19.3916 9.97027 19.3667 11.3244 19.024 12.6147C18.6814 13.9051 18.0311 15.0931 17.129 16.0773ZM9.98827 18.7059C5.90048 18.1988 2.74408 14.7216 2.74408 10.4992C2.74408 9.8576 2.82687 9.23667 2.96141 8.64679L7.9185 13.6039V14.6388C7.9185 15.1877 8.13657 15.7142 8.52472 16.1023C8.91288 16.4905 9.43933 16.7085 9.98827 16.7085M11.0232 0.150391C9.66413 0.150391 8.3184 0.418071 7.06282 0.938149C5.80725 1.45823 4.6664 2.22052 3.70542 3.18149C1.76464 5.12228 0.674316 7.75455 0.674316 10.4992C0.674316 13.2439 1.76464 15.8762 3.70542 17.817C4.6664 18.7779 5.80725 19.5402 7.06282 20.0603C8.3184 20.5804 9.66413 20.8481 11.0232 20.8481C13.7678 20.8481 16.4001 19.7577 18.3409 17.817C20.2817 15.8762 21.372 13.2439 21.372 10.4992C21.372 9.1402 21.1043 7.79448 20.5842 6.5389C20.0642 5.28332 19.3019 4.14247 18.3409 3.18149C17.3799 2.22052 16.2391 1.45823 14.9835 0.938149C13.7279 0.418071 12.3822 0.150391 11.0232 0.150391Z"
                                          fill="white"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className="sub-list3"
                                onClick={() => navigate(`/fanclub/post?id=${itm.id}`)}
                              >
                                <p>
                                  {itm.content}
                                </p>

                              </div>
                              <div className="d-flex align-items-center gap-4 sub-list4"
                                onClick={() => navigate(`/fanclub/post?id=${itm.id}`)}
                              >
                                {
                                  itm.images && itm.images.map((img, imgIndex) => (
                                    imgIndex < 3 &&
                                    <AsyncImage
                                      src={`${import.meta.env.VITE_BASE_URL_IMAGE}${img}`}
                                      className="border border-secondary rounded single-post"
                                      style={{ objectFit: "contain", overflow: "hidden", backgroundColor: "#4b4b4b" }}
                                      alt="post"
                                      loader={<SkeletonLoader />}

                                    />
                                  ))
                                }
                                {itm.images?.length > 3 &&
                                  <small className="fw-bold">+{itm.images?.length - 3}</small>
                                }
                              </div>

                              <div className="d-flex gap-4 sub-list5">
                                <div className="left">
                                  <div className="d-flex flex-row-reverse gap-2 align-items-center position-relative">
                                    {Object.entries(itm?.reactions || {}).length > 0 ? (
                                      Object.entries(itm.reactions).map(([emoji, count], index) => (
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

                                  <p className="mb-0">{Object.values(itm?.reactions || {}).reduce((a, b) => a + b, 0)}</p>


                                </div>
                                <div className="d-flex gap-2 align-items-center" style={{ cursor: "pointer" }}
                                  onClick={() => navigate(`/fanclub/post?id=${itm.id}`)}
                                >
                                  <svg width="20" height="20" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3906 27.6797C16.9517 27.6797 19.4553 26.9202 21.5848 25.4974C23.7143 24.0745 25.374 22.0521 26.3541 19.6859C27.3342 17.3198 27.5907 14.7161 27.091 12.2042C26.5914 9.69231 25.3581 7.38497 23.5471 5.57399C21.7361 3.76301 19.4288 2.52972 16.9169 2.03007C14.405 1.53042 11.8013 1.78686 9.43517 2.76696C7.06901 3.74705 5.04662 5.40679 3.62374 7.53627C2.20086 9.66576 1.44141 12.1694 1.44141 14.7305C1.44141 16.8023 1.92772 18.7591 2.79388 20.4958C3.44566 21.8065 2.53921 23.5748 2.1939 24.8654C2.1174 25.1508 2.11738 25.4514 2.19386 25.7368C2.27034 26.0223 2.42061 26.2826 2.62957 26.4915C2.83853 26.7005 3.09882 26.8508 3.38426 26.9272C3.66971 27.0037 3.97026 27.0037 4.2557 26.9272C5.54631 26.5819 7.3146 25.6754 8.62534 26.3287C10.417 27.2183 12.3903 27.6807 14.3906 27.6797Z" stroke="white" stroke-width="1.72656" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                  <small className="text-white">{itm.comments_count}</small>

                                </div>
                              </div>

                              <div className="d-flex gap-4 sub-list6">
                                <div className="position-relative" ref={setDropdownRef(itm.id)} onMouseEnter={() => handleReactOpen(itm.id)} onMouseLeave={() => handleReactOpen(itm.id)}>
                                  {
                                    console.log(state.likes[itm.id])
                                  }
                                  {
                                    state.likes[itm.id] ? (
                                      <div className="d-flex gap-2 align-items-center position-relative"
                                        onClick={() => handleReact(itm?.id, state.likes[itm.id], "unlike")}

                                      >

                                        <p className="mb-0" style={{ fontSize: "20px" }}>{state.likes[itm.id]}</p>
                                        <small className="text-white" style={{ fontSize: "16px" }}>{emojiReactions[state.likes[itm.id]] || "React"}</small>
                                      </div>
                                    ) : (

                                      <div className="d-flex gap-2 align-items-center"
                                        onClick={() => handleReact(itm?.id, "👍", "like")}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                          <path d="M9.566 19.112C9.69273 19.2018 9.8442 19.25 9.9995 19.25C10.1548 19.25 10.3063 19.2018 10.433 19.112L10 18.5L10.434 19.112L10.442 19.106L10.463 19.091L10.543 19.033C10.6123 18.983 10.7107 18.91 10.838 18.814C12.324 17.6924 13.7267 16.4645 15.035 15.14C16.183 13.972 17.35 12.607 18.234 11.159C19.114 9.719 19.75 8.135 19.75 6.547C19.75 4.662 19.165 3.189 18.13 2.189C17.1 1.195 15.71 0.75 14.25 0.75C12.525 0.75 11.002 1.583 10 2.867C8.998 1.583 7.474 0.75 5.75 0.75C2.67 0.75 0.25 3.389 0.25 6.547C0.25 8.135 0.887 9.718 1.766 11.159C2.65 12.607 3.817 13.972 4.965 15.141C6.35981 16.5521 7.86161 17.8534 9.457 19.033L9.537 19.091L9.558 19.106L9.566 19.112Z" fill="none" stroke='white' />
                                        </svg>
                                        <small className="text-white" style={{ fontSize: "16px" }}>Like</small>
                                      </div>


                                    )
                                  }
                                  {state.likeStates[itm.id] && (
                                    <div className="reaction-dropdown d-flex gap-2 p-2">
                                      {Object.keys(emojiReactions).map((emoji) => (
                                        <span className="border-0" key={emoji} style={{ fontSize: "20px" }} onClick={() => handleReact(itm.id, emoji)}>
                                          {emoji}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="d-flex gap-2 align-items-center"
                                  onClick={() => toggle(itm)}
                                >
                                  <svg width="20" height="20" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3906 27.6797C16.9517 27.6797 19.4553 26.9202 21.5848 25.4974C23.7143 24.0745 25.374 22.0521 26.3541 19.6859C27.3342 17.3198 27.5907 14.7161 27.091 12.2042C26.5914 9.69231 25.3581 7.38497 23.5471 5.57399C21.7361 3.76301 19.4288 2.52972 16.9169 2.03007C14.405 1.53042 11.8013 1.78686 9.43517 2.76696C7.06901 3.74705 5.04662 5.40679 3.62374 7.53627C2.20086 9.66576 1.44141 12.1694 1.44141 14.7305C1.44141 16.8023 1.92772 18.7591 2.79388 20.4958C3.44566 21.8065 2.53921 23.5748 2.1939 24.8654C2.1174 25.1508 2.11738 25.4514 2.19386 25.7368C2.27034 26.0223 2.42061 26.2826 2.62957 26.4915C2.83853 26.7005 3.09882 26.8508 3.38426 26.9272C3.66971 27.0037 3.97026 27.0037 4.2557 26.9272C5.54631 26.5819 7.3146 25.6754 8.62534 26.3287C10.417 27.2183 12.3903 27.6807 14.3906 27.6797Z" stroke="white" stroke-width="1.72656" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>

                                  <small className="text-white" style={{ fontSize: "16px" }}>Comment</small>
                                </div>
                                {/* <div className="d-flex gap-2 align-items-center" onClick={() => handleShare(itm.id)}>
                                  <img src={Share} alt="share" />
                                  <small>Share</small>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ))
                      }

                    </div>
                  )
                }
                {
                  state?.cursor != null &&
                  <div className="d-flex justify-content-center mt-4" onClick={showMoreProduct}>
                    {
                      state.loader4 ? (
                        <div className="d-flex justify-content-center align-items-center" >
                          <Loader show={true}
                            spinnerSize="30px"
                            radius="10"
                          />
                        </div>
                      ) : (
                        <button className="primary-btn py-1 px-4">
                          Show more
                        </button>
                      )
                    }
                  </div>
                }

              </Col>
              {/* <Col xl={5} lg={4} className="list2 mt-lg-0 mt-md-3">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <h2>Explore More Items</h2>
                  {
                    state.product && state.product?.getAdStoreItems?.pre_owned?.length > 10 &&
                    <span className="viewAll" onClick={() => navigate("/web-app/products-list?type=ad")}>View All</span>
                  }

                </div>
                <Row>
                  {state.product && state.product?.getAdStoreItems?.pre_owned?.map((item, index) => (
                    <Col xl={6} lg={12} md={4} sm={6} xs={12} className="my-2">
                      <NearByCard
                        key={index}
                        image={`${import.meta.env.VITE_IMAGEURL}${item.images[0]}`}
                        title={item.title}
                        price={item.price}
                        id={item.id}
                      />
                    </Col>
                  ))}
                </Row>
              </Col> */}
            </Row>

            <Modal isOpen={state.modal} toggle={toggle} size="lg" centered>
              <ModalBody className="p-0">
                {
                  state.singlePost && (
                    <>
                      <div className="d-flex justify-content-end pt-2 pe-2">
                        <svg
                          onClick={toggle}
                          style={{ cursor: "pointer" }}
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>

                      <div class="modal-body">
                        <div className="d-flex gap-4 modal-img">
                          {
                            state.singlePost &&
                            <div className="sub-modal3">
                              {
                                state.singlePost?.images?.map((img, imgIndex) => (
                                  imgIndex < 3 &&
                                  <AsyncImage
                                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${img}`}
                                    className="border border-secondary rounded single-post"
                                    style={{ objectFit: "contain", overflow: "hidden" }}
                                    alt="post"
                                    loader={<SkeletonLoader />}

                                  />

                                ))
                              }
                              {state.singlePost?.images?.length > 3 &&
                                <small className="fw-bold">+{state.singlePost.images?.length - 3}</small>
                              }

                            </div>
                          }
                          <div className="sub-modal1 text-white">

                            <div className="user-info">
                              <img className="rounded-circle border" src={state.singlePost?.user?.picture ? ((state.singlePost?.user?.picture?.includes("https://") ? state.singlePost?.user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${state.singlePost?.user?.picture}`)) : AvatarImg} alt="avatar" />
                              <div>
                                <span>{`${state.singlePost?.user?.full_name} `}</span>
                                <div className="d-flex gap-2 align-items-center gap-2">
                                  <small>{timeAgo(state.singlePost.updated_at)}</small>
                                  <svg
                                    width="4"
                                    height="4"
                                    viewBox="0 0 7 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="3.22086"
                                      cy="3.50016"
                                      r="3.10465"
                                      fill="white"
                                    />
                                  </svg>

                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 22 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M17.129 16.0773C16.8599 15.2493 16.0837 14.6388 15.1627 14.6388H14.1278V11.5341C14.1278 11.2596 14.0188 10.9964 13.8247 10.8023C13.6306 10.6083 13.3674 10.4992 13.0929 10.4992H6.88362V8.42946H8.95339C9.22785 8.42946 9.49108 8.32043 9.68516 8.12635C9.87924 7.93227 9.98827 7.66904 9.98827 7.39458V5.32481H12.058C12.607 5.32481 13.1334 5.10675 13.5216 4.71859C13.9097 4.33043 14.1278 3.80398 14.1278 3.25504V2.83074C15.366 3.32993 16.4648 4.12173 17.3302 5.13836C18.1955 6.15499 18.8016 7.36617 19.0966 8.66822C19.3916 9.97027 19.3667 11.3244 19.024 12.6147C18.6814 13.9051 18.0311 15.0931 17.129 16.0773ZM9.98827 18.7059C5.90048 18.1988 2.74408 14.7216 2.74408 10.4992C2.74408 9.8576 2.82687 9.23667 2.96141 8.64679L7.9185 13.6039V14.6388C7.9185 15.1877 8.13657 15.7142 8.52472 16.1023C8.91288 16.4905 9.43933 16.7085 9.98827 16.7085M11.0232 0.150391C9.66413 0.150391 8.3184 0.418071 7.06282 0.938149C5.80725 1.45823 4.6664 2.22052 3.70542 3.18149C1.76464 5.12228 0.674316 7.75455 0.674316 10.4992C0.674316 13.2439 1.76464 15.8762 3.70542 17.817C4.6664 18.7779 5.80725 19.5402 7.06282 20.0603C8.3184 20.5804 9.66413 20.8481 11.0232 20.8481C13.7678 20.8481 16.4001 19.7577 18.3409 17.817C20.2817 15.8762 21.372 13.2439 21.372 10.4992C21.372 9.1402 21.1043 7.79448 20.5842 6.5389C20.0642 5.28332 19.3019 4.14247 18.3409 3.18149C17.3799 2.22052 16.2391 1.45823 14.9835 0.938149C13.7279 0.418071 12.3822 0.150391 11.0232 0.150391Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="sub-modal2">
                            <p className="text-white">
                              {state.singlePost?.content}
                            </p>

                          </div>
                          <form onSubmit={(e) => handleComment(e, state.singlePost?.id)} className="sub-modal4">
                            <img src={user?.picture ? ((user?.picture?.includes("https://") ? user?.picture : `${import.meta.env.VITE_BASE_URL_IMAGE}${user?.picture}`)) : UserImg} className="rounded-circle user-img border border-secondary" alt="user" />
                            <div className="input-group">
                              <input
                                type="text"
                                value={state.comment}
                                className="form-control"
                                placeholder="Write a comment"
                                onChange={(e) => setState(prevState => ({ ...prevState, comment: e.target.value }))}
                              />

                            </div>
                            <button type="submit" className="send-msg2" style={{ opacity: (state.comment !== "" && !state.loader3) ? 1 : 0.6, cursor: (state.comment !== "" && !state.loader3) ? "pointer" : "not-allowed" }}>
                              <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.6896 0.996969C21.715 0.896439 21.7131 0.790957 21.6838 0.691448C21.6546 0.59194 21.5992 0.502024 21.5234 0.431012C21.4476 0.359998 21.3541 0.310471 21.2526 0.28756C21.1511 0.264649 21.0454 0.269187 20.9462 0.300703L18.0432 1.22445C12.3228 3.04546 6.8043 5.44422 1.57353 8.38335L0.864922 8.7812C0.785432 8.82611 0.717635 8.88898 0.666988 8.96476C0.616341 9.04054 0.584258 9.12711 0.573323 9.2175C0.562389 9.3079 0.572908 9.39958 0.604033 9.48518C0.635158 9.57079 0.686019 9.64791 0.752524 9.71035L5.64312 14.291C5.75205 14.3933 5.89625 14.45 6.04593 14.4494C6.19561 14.4488 6.33933 14.3909 6.44738 14.2877L7.3 13.474C9.37784 11.4908 11.6178 9.6835 13.9967 8.07076L14.2321 7.91129C14.2838 7.87514 14.3209 7.87317 14.3458 7.8757C14.3854 7.88136 14.4221 7.89955 14.4506 7.9276C14.4846 7.95946 14.5032 7.99757 14.5091 8.02865C14.5131 8.05321 14.5135 8.09023 14.4804 8.14391L14.3352 8.38782C12.8662 10.8534 11.1942 13.1931 9.33624 15.3828L8.57378 16.2809C8.47755 16.3946 8.42871 16.5408 8.43731 16.6893C8.44591 16.8378 8.51129 16.9774 8.62001 17.0793L13.5106 21.66C13.5774 21.7225 13.658 21.7685 13.7459 21.7943C13.8339 21.82 13.9266 21.8247 14.0167 21.8081C14.1069 21.7915 14.1918 21.7539 14.2646 21.6985C14.3375 21.6431 14.3962 21.5714 14.436 21.4891L14.79 20.7607C17.4109 15.3777 19.4728 9.7418 20.9435 3.941L21.6896 0.996969Z" fill="#241C19" />
                              </svg>


                            </button>
                          </form>
                        </div>
                      </div></>
                  )
                }
              </ModalBody>
            </Modal>
          </>
        )
      }
    </>
  );
}

export default Community;