import React, { useEffect, useState } from "react";
import "./index.css"
import { Button, Col, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import InviteCard from "../../components/elements/InviteCard";
import { useNavigate } from "react-router-dom";
import { ListPlayer } from "../../graphql/query/query";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_INVITE } from "../../graphql/mutation";
import { SendinviteOnSubmit } from "../../graphql/api-callings";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import PlayerCard1 from "../../components/elements/playerCard1";



const Players = () => {
 const navigate = useNavigate()

   const [page, setPage] = useState(1);
 const [data1, setData1] = useState(null);
  const [fullName, setFullName] = useState("");
const [totalPages, setTotalPages] = useState(0);

  const [debouncedFullName, setDebouncedFullName] = useState("");
   const { loading, error, data, refetch } = useQuery(ListPlayer, {
     variables: {
       input: {
         limit: 12,
         page_start: page - 1,
         full_name: debouncedFullName || null,
       },
     },
   });

   const [sendInvite, { loading: loading2, error: error2, data: data2 }] =
     useMutation(SEND_INVITE);

 useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedFullName(fullName);
     setPage(1); // Reset to first page on search
   }, 500);

   return () => clearTimeout(handler);
 }, [fullName]);


useEffect(() => {

 if (data?.listPlayer?.data) {
   console.log(data?.listPlayer?.data, "HAMMAD");
   setData1(data?.listPlayer?.data);
   setTotalPages(Math.ceil(data?.listPlayer?.total / 12))
  }

}, [data ])

useEffect(()=>{

if(data?.listPlayer?.data){
  refetch({
    variables: {
      input: {
        limit: 10,
        page_start: page - 1,
        full_name: debouncedFullName || null,
      },
    },
  });
   setTotalPages(Math.ceil(data?.listPlayer?.total / 12));

}

},[page , debouncedFullName])

const handleSendInvite = (id)=>{
   console.log(id,"im hit")
  SendinviteOnSubmit( id , sendInvite , refetch )
}

 return (
   <>
     <div className="page-wrapper  pb-4">
       <div className="slider">
         <div className="CustomeConatiner">
           <Row>
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
             </Row>
                       <Row>
                         <h3 className="slider_main-heading">Find Best Players  </h3>
                       </Row>
           <div className="glass-card mt-4">
             <Row>
               <Col md={12}>
                 <div className="Search">
                   <h4>Search Player Name </h4>
                   <input
                     style={{ color: "#fff" }}
                     value={fullName}
                     onChange={(e) => {
                       setFullName(e.target.value);
                       setPage(1); // Reset to first page on search
                     }}
                     type="text"
                     placeholder="Search by Name "
                   />
                 </div>
               </Col>

             </Row>
           </div>
           <Row className="mt-5">
             <Col md={12}>
               <div className="key-list d-flex align-items-center justify-content-between">
                 <h3>All Players</h3>


               </div>
             </Col>
           </Row>
           <Row className="mt-4 players-grid">
             {data1?.map((item) => {
               return (
                 <>
                       <PlayerCard1
                         title={item?.nick_name}
                         id={item?.player_id}
                         user_id={item?.user?.id}
                         picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                           item?.user?.picture
                         }`}
                         data={item}
                       />
                      
                 </>
               );
             })}

             {!data1?.length && (
               <h3 className="text-center my-5" style={{ color: "#fff" }}>
                 No Record Found
               </h3>
             )}
             {/* Pagination Controls */}
             <div className="d-flex justify-content-center align-items-center mt-3">
               <Button disabled={page === 1} onClick={() => setPage(page - 1)} style={{width: "fit-content", height: "auto"}}>
                 Previous
               </Button>
               <span
                 style={{ color: "#fff", fontSize: "14px" }}
                 className="mx-3 d-flex align"
               >
                 Page {!data1?.length? "0" : page} of {totalPages}
               </span>
               <Button
                 disabled={page === totalPages || !data1?.length}
                 onClick={() => setPage(page + 1)}
                 style={{width: "fit-content", height: "auto"}}
               >
                 Next
               </Button>
             </div>
           </Row>
         </div>
       </div>
     </div>
   </>
 );
};

export default Players;

