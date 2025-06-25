import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Get_All_Following } from "../../graphql/query/query";
import UserImg from "../../assets/coach.webp"
import { Accept_Reject_Follow } from "../../graphql/mutation";
import Loader from "react-spinner-loader"
import { useSelector } from "react-redux";


const FollowRequests = () => {

    const userRole = useSelector(state => state?.authSlice?.role)

    console.log(userRole)

    const [selected, setSelected] = useState("follower");
    const [followData, setFollowData] = useState()
    const [active, setActive] = useState(false)
    const [loader, setLoader] = useState(true)

    const [Get_Follower] = useLazyQuery(Get_All_Following)
    const [Accept_Follow] = useMutation(Accept_Reject_Follow)

    useEffect(() => {

        const fetchData = async () => {

            try {
                const { data } = await Get_Follower({
                    variables: {
                        "input": {
                            "cursor": null,
                            "limit": 10,
                            "status": "Both",
                            "type": "follower",
                            "user_id": null
                        }
                    },
                    fetchPolicy: "no-cache",
                });

    if (data) {

        setFollowData(data?.getAllFollowing)
        setLoader(false)
    }
} catch (e) {
    console.log(e)
    setLoader(false)

}
        }


fetchData()



    }, [selected, active]);

const handleAcceptOrReject = async (type, id) => {

    try {

        const { data } = await Accept_Follow({
            variables: {
                "input": {
                    "id": parseInt(id),
                    "status": type
                }
            }
        })

        if (data) {
            setActive(!active)
            toast.success(data?.acceptRejectFollow?.message)

        }

    } catch (e) {
        console.log(e)
    }
}

return (
    <Container>
        <Row className="my-md-5 my-3">
            <Col md={12}>
                <h3 className="about-heading">Interactions</h3>
            </Col>
            <Col xs={12}>
                <div className="d-flex gap-2 mb-3 pb-3" style={{ overflow: "auto" }}>
                    {
                        userRole !== "Parent" && (
                            <div
                                onClick={() => {
                                    selected != "follower" && setFollowData()
                                    selected != "follower" && setSelected("follower");

                                }}
                                className={`role-button glass ${selected == "follower" && "solid"
                                    } `}
                            >
                                <label className="text-nowrap">Followers</label>
                            </div>
                        )
                    }


                    <div
                        onClick={() => {
                            selected != "following" && setFollowData()
                            selected != "following" && setSelected("following");

                        }}
                        className={`role-button glass ${selected == "following" && "solid"
                            } `}
                    >
                        <label className="text-nowrap">Following</label>
                    </div>
                    <div
                        onClick={() => {
                            selected != "request_send" && setFollowData()
                            selected != "request_send" && setSelected("request_send");

                        }}
                        className={`role-button glass ${selected == "request_send" && "solid"
                            } `}
                    >
                        <label className="text-nowrap">Follow Requests Sent</label>
                    </div>

                    {
                        userRole !== "Parent" && (
                            <div
                                onClick={() => {
                                    selected != "request_get" && setFollowData()
                                    selected != "request_get" && setSelected("request_get");

                                }}
                                className={`role-button glass ${selected == "request_get" && "solid"
                                    } `}
                            >
                                <label className="text-nowrap">Follow Requests Received</label>
                            </div>
                        )}

                </div>
            </Col>
            <Col xs={12}>
                {
                    followData?.data?.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center text-white border rounded" style={{ height: "50vh" }}>
                            No Request
                        </div>
                    ) : (
                        <>
                            {
                                loader ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                                        <Loader show={true}
                                            spinnerSize="40px"
                                            radius="10"

                                            color="red"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            followData?.data?.map((item) => (
                                                <div
                                                    onClick={() => { }}
                                                    className="payCard border rounded border-secondary my-3 py-3 px-md-5 px-3 d-flex align-items-center justify-content-between"
                                                >
                                                    <div className="d-flex gap-4 align-items-center justify-content-between">
                                                        <img
                                                            style={{
                                                                objectFit: "cover",
                                                                height: "60px",
                                                                width: "60px",
                                                                borderRadius: "50%",
                                                            }}
                                                            src={item?.user?.picture != null ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture}` : UserImg}
                                                            alt=""
                                                            className="me-2 rounded-circle border"
                                                        />

                                                        <div>
                                                            <p style={{ fontSize: "16px" }} className="fw-bold mb-0">
                                                                {item?.user?.full_name}
                                                            </p>
                                                            <p style={{ fontSize: "14px" }}>
                                                                ID : {item?.players_profile?.player_id}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {
                                                        selected === "request_get" ? (
                                                            <div className="ps-2 d-flex">
                                                                <div
                                                                    onClick={() =>
                                                                        handleAcceptOrReject("Approved", item?.id)
                                                                    }
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        backgroundColor: "#1C8C00",
                                                                        borderRadius: "15px",
                                                                        color: "white",
                                                                    }}
                                                                    className="d-flex align-items-center justify-content-center me-2"
                                                                >
                                                                    <h5
                                                                        className="py-1 px-3 m-0"
                                                                        style={{ fontSize: "12px" }}
                                                                    >
                                                                        Accept
                                                                    </h5>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        backgroundColor: "#EF3E3E",
                                                                        borderRadius: "15px",
                                                                        color: "white",
                                                                    }}
                                                                    onClick={() =>
                                                                        handleAcceptOrReject("Rejected", item?.id)
                                                                    }
                                                                    className="py-1 px-2 d-flex justify-content-center align-items-center"
                                                                >
                                                                    <h5
                                                                        className="px-3 m-0"
                                                                        style={{ fontSize: "12px" }}
                                                                    >
                                                                        Reject
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="edit-profile-btn py-1 px-4" onClick={() => handleFollow()}>

                                                                {item?.status}
                                                            </div>
                                                        )
                                                    }


                                                </div>
                                            ))
                                        }
                                    </>
                                )
                            }

                        </>
                    )
                }
            </Col>
        </Row>
    </Container>
);
}

export default FollowRequests;