import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, CardBody, CardTitle, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { FaRegCopy } from 'react-icons/fa';
import './index.css';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ORG_TEAMS, All_ORGANIZATIONS } from '../../graphql/query/query';
import PlayerCard1 from '../../components/elements/playerCard1';
import Loader from "react-spinner-loader"
import { useSelector } from 'react-redux';
import EditSportBasicModal from '../../components/modules/editSportBasicModal';
import AddNewTeam from '../../components/modules/add-new-team';

export default function MyOrganization() {


  const single = useSelector((state) => state.profileSlice?.PackageName)

  const [selectDetail, setSelectDetail] = useState(true);
  const [selectTeam, setSelectTeam] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [code, setCode] = useState()
  const [modal, setModal] = useState()
const [active, setActive] = useState()

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleCopyCode = () => {
    if (currentOrganization?.code) {
      navigator.clipboard.writeText(currentOrganization.code)
        .then(() => setCode("Club code copied to clipboard!"))
        .catch((err) => console.error("Failed to copy club code: ", err));

      setTimeout(() => {
        setCode()
      }, 4000)
    }
  };

  const { loading: organizationsLoading, error: organizationsError, data: organizationsData } = useQuery(All_ORGANIZATIONS);

  const [fetchTeams, { loading: teamsLoading, error: teamsError, data: teamsData }] = useLazyQuery(GET_ORG_TEAMS);

  useEffect(() => {
    if (organizationsData?.listOrganizations?.data?.length > 0) {
      const defaultOrg = organizationsData.listOrganizations.data[0];
      setCurrentOrganization(defaultOrg);
    }
  }, [organizationsData]);

  useEffect(() => {
    if (currentOrganization?.id) {
      fetchTeams({
        variables: {
          input: {
            limit: 12,
            cursor: null,
            organizationId: currentOrganization.id,
          },
        },
        fetchPolicy: "no-cache"
      });
    }
  }, [currentOrganization, active]);

  console.log(teamsData);


  const showDetail = () => {
    setSelectDetail(true);
    setSelectTeam(false);
  };

  const showTeam = () => {
    setSelectDetail(false);
    setSelectTeam(true);
  };

  const toggle = () => {
    setModal(!modal)
  }

  // if (organizationsLoading) return <Container className="my-organization-container"><div>Loading organization details...</div></Container>;
  // if (organizationsError) return <Container className="my-organization-container"><div>Error loading organization details: {organizationsError.message}</div></Container>;
  // if (!currentOrganization) return <Container className="my-organization-container"><div>No organization data available.</div></Container>;

  return (
    <>
      {
        organizationsLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"

              color="red"
            />
          </div>
        ) : (
          <>
            {
              currentOrganization && (
                <Container className="my-organization-container">
                  {/* <div className="club-tag">{currentOrganization.type}</div> */}
                  <h2 className="club-name-title">My Organization</h2>


                  <Col md={12}>
                    <div className="selecttag">
                      <div className={`tagss ${selectDetail ? 'active' : ''}`} onClick={showDetail}><span>Details</span></div>
                      <div className={`tagss ${selectTeam ? 'active' : ''}`} onClick={showTeam}><span>Teams</span></div>
                      <div className='ms-auto ' style={{ fontSize: "1rem" }}>Organization:</div>
                      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                        <DropdownToggle caret className="tagss" disabled>
                          {currentOrganization?.name}
                        </DropdownToggle>
                        <DropdownMenu dark>
                          {organizationsData?.listOrganizations?.data?.map((org) => (
                            <DropdownItem key={org.id} onClick={() => setCurrentOrganization(org)}>
                              {org.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </Col>

                  {selectDetail && (
                    <Row className="mt-4">
                      <Col md="8" className="mb-4">
                        <div className="detailed-info-card">
                          <CardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <CardTitle tag="h5" className="card-title-custom">Detailed Information</CardTitle>
                            </div>
                            <div style={{ backgroundColor: "#555", borderRadius: "10px", padding: "5px 10px" }}>
                              <Row className="info-item">
                                <Col xs="4" className="info-label">Organization Name</Col>
                                <Col xs="8" className="info-value">{currentOrganization?.name}</Col>
                              </Row>
                              <Row className="info-item">
                                <Col xs="4" className="info-label">Organization Type</Col>
                                <Col xs="8" className="info-value">{currentOrganization?.type}</Col>
                              </Row>
                              <Row className="info-item">
                                <Col xs="4" className="info-label">Phone Number</Col>
                                <Col xs="8" className="info-value">{currentOrganization?.phone || "-"}</Col>
                              </Row>
                              <Row className="info-item">
                                <Col xs="4" className="info-label">Country</Col>
                                <Col xs="8" className="info-value">{currentOrganization?.address?.country || "-"}</Col>
                              </Row>
                              <Row className="info-item">
                                <Col xs="4" className="info-label">City</Col>
                                <Col xs="8" className="info-value">{currentOrganization?.address?.city || "-"}</Col>
                              </Row>
                            </div>
                          </CardBody>
                        </div>
                      </Col>


                      <Col md="4">
                        <div className="club-code-card">
                          <CardBody>
                            <CardTitle tag="h5" className="card-title-custom">Your Club Code</CardTitle>

                            <div className="club-code-display">
                              <span className="club-code-text">{currentOrganization.code || "-"}</span>
                              {
                                currentOrganization.code && (
                                  <Button color="link" className="copy-button-custom" onClick={handleCopyCode}>
                                    <FaRegCopy />
                                  </Button>
                                )
                              }


                            </div>
                            {
                              code && <small style={{ fontSize: "14px" }}>{code}</small>
                            }
                          </CardBody>
                        </div>
                      </Col>
                    </Row>
                  )}

                  {selectTeam && (
                    <div className="custom-container">
                      {
                        (single !== "Single") && (
                          <div className='d-flex justify-content-between align-items-center gap-4 pt-5'>

                            <h3 className="slider_main-heading mt-0">All Teams </h3>
                            <button
                              className="primary-btn py-3 px-4" onClick={toggle}
                            >

                              Add Team
                            </button>
                          </div>
                        )
                      }

                      <Row className="mb-5 mx-0">

                        <Col>
                          <div className="mt-4 players-grid">
                            {teamsLoading ? (
                              <div>Loading teams...</div>
                            ) : teamsError ? (
                              <div>Error loading teams</div>
                            ) : (
                              teamsData?.getTeamsByOrganization?.data?.map((team) => (
                                <PlayerCard1
                                  // type={'coach'}
                                  key={team.id}
                                  title={team.name}
                                  picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${team.logo}`}
                                  data={team}
                                // onClick1={() => {}}
                                />
                              ))
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Container>
              )
            }
          </>

        )
      }
      <AddNewTeam
        show={modal}
        setShow={setModal}
        toggle={toggle}
        setActive={setActive}
        active={active}
      />
    </>
  );
}
