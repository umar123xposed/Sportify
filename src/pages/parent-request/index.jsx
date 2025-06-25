import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Get_All_Following, Get_All_Teams, Get_Team_Invites, MY_INVITES_REQUEST } from "../../graphql/query/query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Accept_Reject_Follow, Accpet_Reject_Team_Invite, CHANGE_NOTIFICATION_STATUS, Follow_Player } from "../../graphql/mutation";
import { UpdateStatusNotificationOnSubmit } from "../../graphql/api-callings";
import profile from "./../../assets/profile.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "react-spinner-loader"

const ParentRequests = () => {
  const userRole = useSelector(state => state?.authSlice?.role)
  const userRole1 = useSelector(state => state?.authSlice?.user?.data?.meta?.meta?.coach_role)


  
  const [state, setState] = useState({
    detail1: null,
    detail2: null,
    detail3: null,
    detail4: null,
    loader: true,
    followData: null,
    selected: (["Recruiter","Coach","Head","Assistant"].includes(userRole)) ? "following" : "parent_request",
    active: false

  })

  const [My_Invites] = useLazyQuery(MY_INVITES_REQUEST)
  const [Get_Teams] = useLazyQuery(Get_Team_Invites)
  const [Get_Follower] = useLazyQuery(Get_All_Following)

  const [Accept_Follow] = useMutation(Accept_Reject_Follow)
  const [Player_Follow] = useMutation(Follow_Player)
  const [Accept_Team] = useMutation(Accpet_Reject_Team_Invite)

  const navigate = useNavigate();





  useEffect(() => {
    setState((prev) => ({
      ...prev,
      detail1: null,
      detail2: null,
      detail3: null,
      detail4: null,
      loader: true,
      cursor: null
    }))

    state.selected === "parent_request" && fetchData()
    state.selected === "team_invite" && fetchData1()
    state.selected === "follower" && fetchData2()
    state.selected === "following" && fetchData3()

  }, [state?.selected, state?.active]);

  const fetchData = async () => {
    try {
      const { data } = await My_Invites({
        variables: {
          input: {
            limit: 10,
            cursor: state.cursor,
            invite_type: "Both",
          },
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });

      if (data) {

        setState((prev) => ({
          ...prev,
          detail1: data?.myInvites?.data,
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
      const { data } = await Get_Teams({
        variables: {
          input: {
            "cursor": null,
            "invite_type": "Both",
            "limit": 20
          },
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });

      if (data) {

        setState((prev) => ({
          ...prev,
          detail1: data?.teamInvites,
          // cursor: data?.teamInvites?.nextCursor,
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

  const fetchData2 = async () => {
    try {
      const { data } = await Get_Follower({
        variables: {
          "input": {
            "cursor": null,
            "limit": 20,
            "status": "Both",
            "type": "follower",
            "user_id": null
          }
        },
        fetchPolicy: "no-cache",
      });

      if (data) {

        setState((prev) => ({
          ...prev,
          detail2: data?.getAllFollowing,

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

  const fetchData3 = async () => {
    try {
      const { data } = await Get_Follower({
        variables: {
          "input": {
            "cursor": null,
            "limit": 20,
            "status": "Both",
            "type": "following",
            "user_id": null
          }
        },
        fetchPolicy: "no-cache",
      });

      if (data) {

        setState((prev) => ({
          ...prev,
          detail3: data?.getAllFollowing,
          // cursor: data?.getAllFollowing?.nextCursor,
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



  const [
    acceptRejectInvite,
    { loading: loading2, error: error2, data: changeStatus },
  ] = useMutation(CHANGE_NOTIFICATION_STATUS);


  const handleAcceptOrReject = async (status, id) => {
    try {

      const { data } = await acceptRejectInvite({
        variables: {
          "input": {
            "id": parseInt(id),
            "status": status
          }
        }
      })

      if (data) {
        setState((prev) => ({
          ...prev,
          active: !state?.active
        }))

        toast.success(data?.acceptRejectInvite?.message)

      }

    } catch (e) {
      console.log(e)
    }


  }


  const handleAcceptOrReject1 = async (status, id) => {
    try {

      const { data } = await Accept_Follow({
        variables: {
          "input": {
            "id": parseInt(id),
            "status": status
          }
        }
      })

      if (data) {
        setState((prev) => ({
          ...prev,
          active: !state?.active
        }))

        toast.success(data?.acceptRejectFollow?.message)

      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleAcceptOrReject2 = async (status, id) => {
    try {

      const { data } = await Accept_Follow({
        variables: {
          "input": {
            "id": parseInt(id),
            "status": status
          }
        }
      })

      if (data) {
        setState((prev) => ({
          ...prev,
          active: !state?.active
        }))

        toast.success(data?.acceptRejectFollow?.message)

      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleAcceptOrReject3 = async (status, id) => {
    try {

      const { data } = await Accept_Team({
        variables: {
          "input": {
            "id": parseInt(id),
            "status": status
          }
        }
      })

      if (data) {
        setState((prev) => ({
          ...prev,
          active: !state?.active
        }))

        toast.success(data?.acceptRejectTeamInvite?.message)

      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleTab = (type) => {
    setState((prev) => ({
      ...prev,
      followData: null,
      detail1: null,
      detail2: null,
      detail3: null,
      detail4: null,
      selected: type
    }))
  }

  const showMoreParentRequest = async () => {
    try {
      const { data } = await My_Invites({
        variables: {
          input: {
            limit: 10,
            cursor: state.cursor,
            invite_type: "Both",
          },
        },
        fetchPolicy: "no-cache", // Ensure a fresh request every time
      });

      if (data) {

        setState((prev) => ({
          ...prev,
          detail1: [
            ...(state?.detail1 || []),
            ...(data?.myInvites?.data || [])
          ],
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

  return (
    <>
      <div className="page-wrapper  pb-4">
        <div className="slider">
          <div className="CustomeConatiner">
            <Row className="">
              <Col md={12}></Col>
              <h3 className="my-5 main-heading_key text-center">My Requests</h3>
              {/* <p className="main-heading_key_para text-center">
                Pick the role that best describes you to personalize your
                journey.
              </p> */}
              <Col xs={12}>
                <div
                  className="d-flex justify-content-center gap-2 mb-3 pb-3"
                  style={{ overflow: "auto" }}
                >
                  {["Parent", "Athlete"].includes(userRole) && (
                    <div
                      onClick={() => {
                        state?.selected != "parent_request" &&
                          handleTab("parent_request");
                      }}
                      className={`role-button glass ${state?.selected == "parent_request" && "solid"
                        } `}
                    >
                      <label className="text-nowrap">Parent Requests</label>
                    </div>
                  )}
              
                  {(["Athlete", "Assistant"].includes(userRole) || ["Head", "Assistant"].includes(userRole1)) && (
                    <div
                      onClick={() => {
                        state?.selected != "team_invite" &&
                          handleTab("team_invite");
                      }}
                      className={`role-button glass ${state?.selected == "team_invite" && "solid"
                        } `}
                    >
                      <label className="text-nowrap">Team Invites</label>
                    </div>
                  )}
                  {userRole == "Athlete" && (
                    <div
                      onClick={() => {
                        state?.selected != "follower" && handleTab("follower");
                      }}
                      className={`role-button glass ${state?.selected == "follower" && "solid"
                        } `}
                    >
                      <label className="text-nowrap">Followers</label>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      state?.selected != "following" && handleTab("following");
                    }}
                    className={`role-button glass ${state?.selected == "following" && "solid"
                      } `}
                  >
                    <label className="text-nowrap">Following</label>
                  </div>
                </div>
              </Col>
            </Row>

            {
              (state?.detail1?.length === 0 || state?.detail2?.data?.length === 0 || state?.detail3?.data?.length === 0 || state?.detail3?.data?.length === 0) && (
                <div className="container d-flex justify-content-center align-items-center text-white border border-secondary rounded" style={{ height: "50vh" }}>
                  No Request
                </div>
              )
            }

            {
              state?.loader && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                  <Loader show={true}
                    spinnerSize="50px"
                    radius="10"
                    color="red"

                  />
                </div>
              )
            }

            {
              state?.selected === "parent_request" && (
                <Row className="my-4">
                  {state?.detail1?.map((item) => {
                    return (
                      <>
                        <Col xl={3} lg={4} md={6} sm={6} className="mt-4">
                          <>
                            <div
                              className={`${""} glass-card  home_profile_card_min p-2 gray  d-flex align-items-center  `}
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              <img
                                className="me-3"
                                style={{
                                  borderRadius: "50%",
                                  height: "70px",
                                  width: "70px",
                                  objectFit: "cover",
                                }}
                                src={
                                  item?.parent?.picture ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.parent?.picture
                                    }` :
                                    profile
                                }
                              />
                              <div>

                                <h3 className="py-1" style={{ fontSize: "16px" }}>
                                  {`Name : ${item?.parent?.full_name}`}
                                </h3>


                                <h4 className="my-1" style={{ fontSize: "12px" }}>
                                  {item?.parent?.title}
                                </h4>
                                <>
                                  {item?.status == "Approved" ? (
                                    <>
                                      <div className=" d-flex justify-content-center">
                                        <div
                                          onClick={() =>
                                            handleAcceptOrReject("Rejected", item?.id)
                                          }

                                          className="d-flex align-items-center justify-content-center primary-btn"
                                        >
                                          <h5
                                            className="py-1 px-3 m-0 "
                                            style={{ fontSize: "12px" }}
                                          >
                                            Remove
                                          </h5>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ps-2 d-flex">
                                      <div
                                        onClick={() =>
                                          handleAcceptOrReject("Approved", item?.id)
                                        }

                                        className="d-flex align-items-center justify-content-center me-2 primary-btn"
                                      >
                                        <h5
                                          className="py-1 px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Accept
                                        </h5>
                                      </div>
                                      <div

                                        onClick={() =>
                                          handleAcceptOrReject("Rejected", item?.id)
                                        }
                                        className="py-1 px-2 d-flex justify-content-center align-items-center edit-profile-btn"
                                      >
                                        <h5
                                          className="px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Reject
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                </>
                              </div>
                              {/* <h4
                                  className="d-flex justify-content-end"
                                  style={{ fontSize: "12px" }}
                                >
                                  14 mins
                                </h4> */}
                            </div>
                          </>
                        </Col>
                      </>
                    );
                  })}


                </Row>
              )
            }

            {
              state?.selected === "team_invite" && (
                <Row className="my-4">
                  {state?.detail1?.data?.map((item) => {
                    return (
                      <>
                        <Col xl={3} lg={4} md={6} sm={6} className="mt-4">
                          <>
                            <div
                              className={`${""} glass-card  home_profile_card_min p-2 gray  d-flex align-items-center  `}
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              <img
                                className="me-3 border rounded-circle"
                                style={{
                                  borderRadius: "50%",
                                  height: "70px",
                                  width: "70px",
                                  objectFit: "cover",
                                }}
                                src={
                                  item?.team?.logo ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.team?.logo
                                    }` :
                                    profile
                                }
                              />
                              <div>

                                <h3 className="py-1" style={{ fontSize: "16px" }}>
                                  {`Name : ${item?.team?.name}`}
                                </h3>


                                {/* <h4 className="my-1" style={{ fontSize: "12px" }}>
                                  {item?.parent?.title}
                                </h4> */}
                                <>
                                  {item?.status == "Approved" ? (
                                    <>
                                      <div className=" d-flex justify-content-center">
                                        <div
                                          onClick={() =>
                                            handleAcceptOrReject3("Rejected", item?.id)
                                          }

                                          className="d-flex align-items-center justify-content-center primary-btn"
                                        >
                                          <h5
                                            className="py-1 px-3 m-0 "
                                            style={{ fontSize: "12px" }}
                                          >
                                            Remove
                                          </h5>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ps-2 d-flex">
                                      <div
                                        onClick={() =>
                                          handleAcceptOrReject3("Approved", item?.id)
                                        }

                                        className="d-flex align-items-center justify-content-center me-2 primary-btn"
                                      >
                                        <h5
                                          className="py-1 px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Accept
                                        </h5>
                                      </div>
                                      <div

                                        onClick={() =>
                                          handleAcceptOrReject3("Rejected", item?.id)
                                        }
                                        className="py-1 px-2 d-flex justify-content-center align-items-center edit-profile-btn"
                                      >
                                        <h5
                                          className="px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Reject
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                </>
                              </div>
                              {/* <h4
                                  className="d-flex justify-content-end"
                                  style={{ fontSize: "12px" }}
                                >
                                  14 mins
                                </h4> */}
                            </div>
                          </>
                        </Col>
                      </>
                    );
                  })}


                </Row>
              )
            }

            {
              state?.selected === "follower" && (
                <Row className="my-4">
                  {state?.detail2?.data?.map((item) => {
                    return (
                      <>
                        <Col xl={3} lg={4} md={6} sm={6} className="mt-4">
                          <>
                            <div
                              className={`${""} glass-card  home_profile_card_min p-2 gray  d-flex align-items-center  `}
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              <img
                                className="me-3"
                                style={{
                                  borderRadius: "50%",
                                  height: "70px",
                                  width: "70px",
                                  objectFit: "cover",
                                }}
                                src={
                                  item?.user?.picture ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture
                                    }` :
                                    profile
                                }
                              />
                              <div>

                                <h3 className="py-1" style={{ fontSize: "16px" }}>
                                  {`Name : ${item?.user?.full_name}`}
                                </h3>


                                <h4 className="my-1" style={{ fontSize: "12px" }}>
                                  {item?.parent?.title}
                                </h4>
                                <>
                                  {item?.status == "Approved" ? (
                                    <>
                                      <div className=" d-flex justify-content-center">
                                        <div
                                          onClick={() =>
                                            handleAcceptOrReject1("Rejected", item?.id)
                                          }

                                          className="d-flex align-items-center justify-content-center primary-btn"
                                        >
                                          <h5
                                            className="py-1 px-3 m-0 "
                                            style={{ fontSize: "12px" }}
                                          >
                                            Remove
                                          </h5>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ps-2 d-flex">
                                      <div
                                        onClick={() =>
                                          handleAcceptOrReject1("Approved", item?.id)
                                        }

                                        className="d-flex align-items-center justify-content-center me-2 primary-btn"
                                      >
                                        <h5
                                          className="py-1 px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Accept
                                        </h5>
                                      </div>
                                      <div

                                        onClick={() =>
                                          handleAcceptOrReject("Rejected", item?.id)
                                        }
                                        className="py-1 px-2 d-flex justify-content-center align-items-center edit-profile-btn"
                                      >
                                        <h5
                                          className="px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Reject
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                </>
                              </div>
                              {/* <h4
                                  className="d-flex justify-content-end"
                                  style={{ fontSize: "12px" }}
                                >
                                  14 mins
                                </h4> */}
                            </div>
                          </>
                        </Col>
                      </>
                    );
                  })}


                </Row>
              )
            }

            {
              state?.selected === "following" && (
                <Row className="my-4">
                  {state?.detail3?.data?.map((item) => {
                    return (
                      <>
                        <Col xl={3} lg={4} md={6} sm={6} className="mt-4">
                          <>
                            <div
                              className={`${""} glass-card  home_profile_card_min p-2 gray  d-flex align-items-center  `}
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              <img
                                className="me-3"
                                style={{
                                  borderRadius: "50%",
                                  height: "70px",
                                  width: "70px",
                                  objectFit: "cover",
                                }}
                                src={
                                  item?.players_profile?.user?.picture ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.players_profile?.user?.picture
                                    }` :
                                    profile
                                }
                              />
                              <div>

                                <h3 className="py-1" style={{ fontSize: "16px" }}>
                                  {`Name : ${item?.players_profile?.user?.full_name}`}
                                </h3>


                                <h4 className="my-1" style={{ fontSize: "12px" }}>
                                  {item?.parent?.title}
                                </h4>
                                <>
                                  {item?.status == "Pending" ? (
                                    <>
                                      <div className=" d-flex justify-content-center">
                                        <div
                                          onClick={() =>
                                            handleAcceptOrReject2("Rejected", item?.id)
                                          }

                                          className="d-flex align-items-center justify-content-center edit-profile-btn "
                                        >
                                          <h5
                                            className="py-1 px-3 m-0 "
                                            style={{ fontSize: "12px" }}
                                          >
                                            Pending
                                          </h5>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ps-2 d-flex justify-content-end">
                                      <div
                                        onClick={() =>
                                          handleAcceptOrReject2("Rejected", item?.id)
                                        }

                                        className="d-flex align-items-center justify-content-center me-2 primary-btn"
                                      >
                                        <h5
                                          className="py-1 px-3 m-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          Unfollow
                                        </h5>
                                      </div>

                                    </div>
                                  )}
                                </>
                              </div>
                              {/* <h4
                                  className="d-flex justify-content-end"
                                  style={{ fontSize: "12px" }}
                                >
                                  14 mins
                                </h4> */}
                            </div>
                          </>
                        </Col>
                      </>
                    );
                  })}


                </Row>
              )
            }
            <div className="d-flex justify-content-center">
              {["Parent", "Athlete"].includes(userRole) && (
                <>
                  {
                    state?.cursor != null && (
                      <button className="primary-btn px-4 mt-3 py-3 d-flex align-items-center gap-3 justify-content-center" onClick={showMoreParentRequest}>
                        Show More
                        {
                          state?.loading &&
                          (<Loader show={true}
                            spinnerSize="16px"
                            radius="10"

                            color="red"
                          />)
                        }
                      </button>
                    )
                  }
                </>
              )}
            </div>
            {/* <Row>
              <Col md={4} />

              <Col md={4}>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span
                    style={{ color: "#fff", fontSize: "14px" }}
                    className="mx-3 d-flex align"
                  >
                    Page {!data1?.length ? "0" : page} of {totalPages}
                  </span>
                  <Button
                    disabled={page === totalPages || !data1?.length}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </Col>
              <Col md={4} />
            </Row> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentRequests;
