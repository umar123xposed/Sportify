import React from "react";
import "./index.css"
import { Col, Container, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import TeamCard from "../../components/elements/teamCard";
//import jr from "./../../assets/jr.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// const StyledTabIndicator = styled.div`
//   position: absolute;
//   width: ${(props) => 100 / props.tabCount}%;
//   top: 100%;
//   left: 0;
//   transition: transform ${(props) => props.duration}ms;
//   transform: translate(${(props) => props.offset}, -100%);

//   &::after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 4px; /* Border thickness */
//     bottom: 0;
//     left: 0;
//     background: linear-gradient(
//       90deg,
//       #dda027 0.01%,
//       #ce9b2b 31.98%,
//       #fef48e 68.02%,
//       #ffd046 100%
//     ); /* Adjust colors as needed */
//   }
// `;

// const StyledTab = styled.li`
//   flex: 1;
//   button {
//     cursor: pointer;
//     transition: color 0.3s;
//     color: ${(props) => (props.isFocused ? "#fff" : "#919191")};
//     border: none;
//     width: 100%;
//     font-size:16px;
//     padding:20px auto;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0);
//   }
// `;

// const StyledTabs = styled.div`
//   position: relative;
//   list-style: none;
//   height: 70px;
//   display: flex;
//   align-items: center;
// `;

// const Tabs = ({ value, onChange, duration = 300, tabs }) => {
//   return (
//     <>
//       <StyledTabs>
//         {tabs.map((tab) => (
//           <StyledTab
//             key={tab.id}
//             isFocused={value === tab.id}
//             onClick={() => onChange(tab.id)}
//           >
//             <button>{tab.label}</button>
//           </StyledTab>
//         ))}
//         <StyledTabIndicator
//           duration={duration}
//           tabCount={tabs.length}
//           offset={`${100 * value}%`}
//         />
//       </StyledTabs>

//       <div className="tab-content">
//         {tabs.map((tab, index) =>
//           value === index ? <div key={tab.id}>{tab.content}</div> : null
//         )}
//       </div>
//     </>mmmmm
//   );
// };


const PlayerDetailsCoach = () => {
 const navigate = useNavigate()
//   const [focusedIdx, setFocusedIdx] = React.useState(0);
//  const tabs = [
//    {
//      id: 0,
//      label: "Profile",
//      content: (
//        <div>
//          <p>Tab 1</p>
//        </div>
//      ),
//    },
//    {
//      id: 1,
//      label: "Achievement",
//      content: (
//        <div>
//          <p>Tab 2</p>
//        </div>
//      ),
//    },
//  ];

return (
    <>
      <div className="page-wrapper pb-4">
        <div className="slider">
          <Container>
            <Row className="pt-5">
              <Col md={12}>
                <div
                  onClick={() => navigate(-1)}
                  className="d-flex back-btn mb-4"
                >
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
                      d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                      fill="white"
                    />
                  </svg>
                  <h4>Back</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="mt-3 profile-details text-center">
                <h3>jr rolnaldo </h3>

                {/* <img src={jr} alt="jr" />
         */}
              </div>
            </Row>

          </Container>
        </div>
      </div>
    </>
  );
};

export default PlayerDetailsCoach;

