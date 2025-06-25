import React from "react";
import "./index.css"
import { Col, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";




const Search = () => {


  return (
    <>
      <div className="page-wrapper  pb-4">
        <div className="slider">
          <div className="CustomeConatiner">
            <Row>
              <h3 className="slider_main-heading">Find Best Players</h3>
            </Row>
            <div className="glass-card mt-4">
              <Row>
                <Col md={10}>
                  <div className="Search">
                    <h4>Search Player Name & ID</h4>
                    <input type="text" placeholder="Search" />
                  </div>
                </Col>
                <Col md={2} className="h-100  ">
                  <div
                    onClick={() => navigate("/auth/sign-up")}
                    className="mt-5 primary-btn px-2 py-3 my-3"
                  >
                    <h3> Seach </h3>
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <h3 className="slider_main-heading">All Players</h3>
              <Col md={12}>
                <div className="mt-4 players-grid ">
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                  <PlayerCard />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
