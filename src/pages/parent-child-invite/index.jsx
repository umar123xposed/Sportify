import React, { useEffect, useState } from "react";
import "./index.css"
import { Button, Col, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import InviteCard from "../../components/elements/InviteCard";
import { useNavigate } from "react-router-dom";
import { MY_INVITES } from "../../graphql/query/query";
import { useQuery } from "@apollo/client";




const ParentChildKeyInvite = () => {

  const navigate = useNavigate()
   const [page, setPage] = useState(1);
 const [data1, setData1] = useState(null);

  const [fullName, setFullName] = useState("");
const [totalPages, setTotalPages] = useState(0);

   const { loading, error, data, refetch } = useQuery(MY_INVITES, {
     variables: {
       input: {
         limit: 10,
         cursor: null,
         invite_type: "Both",
       },
     },
   });

useEffect(() => {

 if (data?.myInvites?.data) {
   console.log(data?.myInvites?.data, "HAMMAD");
   setData1(data?.myInvites?.data);
   setTotalPages(Math.ceil(data?.myInvites?.total / 12));
 }

}, [data ])

useEffect(()=>{

if (data?.myInvites?.data) {
  refetch({
    variables: {
      input: {
        limit: 10,
        page_start: page - 1,
        invite_type: "Both",
      },
    },
  });
  setTotalPages(Math.ceil(data?.myInvites?.total / 12));
}

},[page ])


  return (
    <>
      <div className="page-wrapper  pb-4">
        <div className="slider">
          <div className="CustomeConatiner">
            <Row className="mx-0">
              <Col md={12}>
                <div
                  onClick={() => navigate(-1)}
                  className="d-flex back-btn my-4"
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
              <h3 className="main-heading_key text-center">Your Invites</h3>
              <p className="main-heading_key_para text-center">
                Pick the role that best describes you to personalize your
                journey.
              </p>
            </Row>
            <Row className="mt-4 mx-0">
              {data1?.map((item) => {
                return (
                  <>
                    <Col md={3} className="mt-4">
                      <InviteCard
                        image={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                          item?.user?.picture
                        }`}
                        status={item?.status}
                        title={item?.user?.full_name}
                        id={item?.player_id}
                        id1={item?.user?.id}
                        data={item}
                      />
                    </Col>
                  </>
                );
              })}
            </Row>
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

export default ParentChildKeyInvite;

