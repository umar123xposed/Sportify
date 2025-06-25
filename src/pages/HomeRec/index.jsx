import React, { useState } from "react";
 import "./index.css";
import { Col, Row, Modal, Button } from "reactstrap";
import slider1 from "./../../assets/slider1.png";
import slider2 from "./../../assets/slider2.png";
import slider3 from "./../../assets/slider3.png";
import forword from "./../../assets/forword.png";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import * as yup from "yup";
import PlayerCard from "../../components/elements/playerCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMutation, useQuery } from "@apollo/client";
import { Get_ALL_FOLDERS, ListPlayer } from "../../graphql/query/query";
import { useNavigate } from "react-router-dom";
import PlayerCard1 from "../../components/elements/playerCard1";
import { useSelector } from "react-redux";
import {
  COMPELETE_PROFILE,
  CREATE_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER,
} from "../../graphql/mutation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast"; // For error toasts

import { FaEllipsisVertical } from "react-icons/fa6";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  cssEase: "linear",
  slidesToScroll: 1,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: "120px",
  initialSlide: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        centerPadding: "10px",
        slidesToShow: 1,
      },
    },
  ],
};

var settings2 = {
  dots: false,
  autoplay: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 6,
  slidesToShow: 2,

  // variableWidth: true
};

const HomeRec = () => {
  const [selectiontags, setselectiontags] = useState({
    all: true,
    players: false,
    coaches: false,
    teams: false,
  });
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(ListPlayer, {
    variables: {
      input: {
        limit: 12,
        page_start: 0,
        full_name: null,
        type: "All",
      },
    },
  });

  const {
    loading: loading1,
    error: error1,
    data: data1,
    refetch: refetch1,
  } = useQuery(ListPlayer, {
    variables: {
      input: {
        limit: 12,
        page_start: 0,
        full_name: null,
        type: "New",
      },
    },
  });

  const selectAll = () => {
    setselectiontags({
      all: true,
      players: false,
      coaches: false,
      teams: false,
    });
  };

  const selectPlayers = () => {
    setselectiontags({
      all: false,
      players: true,
      coaches: false,
      teams: false,
    });
  };

  const selectCoaches = () => {
    setselectiontags({
      all: false,
      players: false,

      coaches: true,
      teams: false,
    });
  };

  const selectTeams = () => {
    setselectiontags({
      all: false,
      players: false,
      coaches: false,
      teams: true,
    });
  };

  const userRole = useSelector((state) => state.authSlice?.role);
  const pageName = useSelector((state) => state.profileSlice?.PackageName);

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [currentId, setCurrentId] = useState(null);

  const [createFolder, { loading: loading5, errore, data: data5 }] =
    useMutation(CREATE_FOLDER);

  const [deleteFolder, { loading: loading2, error: error2, data: data2 }] =
    useMutation(DELETE_FOLDER);

  const [updateFolder, { loading: loading4, error: error4, data: data4 }] =
    useMutation(UPDATE_FOLDER);

  const {
    loading: loading3,
    error: error3,
    data: AllFolders,
    refetch: refetchFolders,
  } = useQuery(Get_ALL_FOLDERS, {
    variables: {
      input: {
        cursor: null,
        excludeId: null,
        limit: 8,
        search: "",
      },
    },
    fetchPolicy: "no-cache", // Ensure a fresh request every time
  });


  const handleDelete = async (deleteId) => {
    await deleteFolder({
      variables: {
        input: {
          id: deleteId,
        },
      },
    })
      .then((response) => {
        if (response?.data?.deleteFolder?.statusCode == 200)
          toast.success(response?.data?.deleteFolder?.message);

        refetchFolders();
      })
      .catch((error) => {
        console.error("Purchase failed:", error);
      });
  };

  const schema = yup.object().shape({
    folderName: yup.string().required("Folder name is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = async (id, name) => {
    setCurrentId(id);
    setShowFolderModal(true);
    console.log(name, "wwarwa");
    setValue("folderName", name);
  };

  const onSubmit = async (data) => {
    console.log("Submitted data:", currentId);

    if (currentId) {
      await updateFolder({
        variables: {
          input: {
            name: data?.folderName,
            id: currentId,
          },
        },
      })
        .then((response) => {
          if (response?.data?.updateFolder?.statusCode == 200)
            toast.success(response?.data?.updateFolder?.message);
          setShowFolderModal(false);
          reset({ folderName: "" });
          refetchFolders();
        })
        .catch((error) => {
          console.error("Purchase failed:", error);
        });
    } else {
      await createFolder({
        variables: {
          input: {
            name: data?.folderName,
          },
        },
      })
        .then((response) => {
          if (response?.data?.createFolder?.statusCode == 201)
            toast.success(response?.data?.createFolder?.message);
          setShowFolderModal(false);
          reset({ folderName: "" });
          refetchFolders();
        })
        .catch((error) => {
          console.error("Purchase failed:", error);
        });
    }
  };

  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <div className="CustomeConatiner">
          <Row>
            <h3 className="slider_main-heading">Find Best Players</h3>
          </Row>
        </div>
        <Row className="mx-0">
          <Col md={12}>
            <div className="player-slider">
              <Slider {...settings}>
                {Array(3)
                  .fill("_")
                  .map((item, index) => (
                    <div className="mx-2">
                      <div
                        style={{
                          background:
                            (index == 0 &&
                              "var(--primary-grad-slider-color1)") ||
                            (index == 1 && "var(--slider-grad2)") ||
                            (index == 2 && "#F5BA06"),
                        }}
                        className="slider-card relative d-flex flex-sm-row flex-column justify-content-between"
                      >
                        <div className="card-left">
                          <h3>Find the best players with expert insights!</h3>
                          <p>
                            Discover top players across all sports with expert
                            insights and up-to-date rankings!
                          </p>
                          <button
                            onClick={() => navigate("/recruiter/players")}
                            className="white-btn mb-5"
                          >
                            <h4
                              style={{ fontSize: "15px", fontWeight: "500" }}
                              className="grdiant-text2"
                            >
                              Find Players
                            </h4>
                          </button>
                        </div>
                        <div className="card-right d-flex align-items-end">
                          <img
                            src={
                              (index == 0 && slider1) ||
                              (index == 1 && slider2) ||
                              (index == 2 && slider3)
                            }
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
          {/* tags selection */}
        </Row>
        {/* New Folder Section */}
        {/* New Folder Section */}

        {
          console.log(pageName , "pageNamepageName")
        }

        {userRole === "Recruiter" && pageName == "Elite" && (
          <div className="CustomeConatiner">
            <h3 className="slider_main-heading mt-5">My Folder</h3>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <Button
                disabled={loading5}
                style={{
                  width: "auto !important",
                  height: "auto !important",
                  opacity: loading5 ? "0.6" : "1",
                }}
                className="create-folder-btn"
                onClick={() => {
                  setCurrentId(null);
                  reset({ folderName: "" });
                  setShowFolderModal(true);
                }}
              >
                + Create New Folder
              </Button>

              <Button
                className="view-all-btn"
                onClick={() => navigate("/recruiter/new-folder")}
              >
                View All &gt;
              </Button>
            </div>
            <div className="folder-grid">
              {/* Example folders, replace with dynamic data as needed */}

              <Row className="">
                {AllFolders?.getAllFolders?.data?.map((folder) => {
                  return (
                    <>
                      <Col
                        md={4}
                        lg={4}
                        sm={6}
                        xs={12}
                        xl={3}
                        xxl={3}
                        style={{
                          backgroundColor: "",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="folder-card my-2"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/recruiter/folder-items/${folder?.id}`)
                          }
                        >
                          <span
                            className="folder-icon"
                            role="img"
                            aria-label="folder"
                          >
                            📁
                          </span>
                          <div>
                            <div className="folder-title">{folder?.name}</div>
                            <div className="folder-date">
                              Created on: 02/10/2024
                            </div>
                          </div>

                          <div>
                            <Row>
                              <Col
                                lg={3}
                                className="custom-col-margin"
                                style={{ backgroundColor: "" }}
                              >
                                <UncontrolledDropdown direction="start">
                                  <DropdownToggle
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation(); // Prevent click bubbling to parent
                                    }}
                                    tag="span"
                                    data-toggle="dropdown"
                                    aria-expanded={false}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FaEllipsisVertical
                                      onMouseDown={(e) => e.stopPropagation()} // Optional extra safety
                                      size={20}
                                      color="white"
                                    />
                                  </DropdownToggle>

                                  <DropdownMenu className="dropdown-menu-small">
                                    <DropdownItem
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(folder?.id);
                                      }}
                                    >
                                      <Row>
                                        <Col lg={8}>Delete</Col>
                                        <Col lg={4}>
                                          <MdDelete size={20} color="black" />
                                        </Col>
                                      </Row>
                                    </DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEdit(folder?.id, folder?.name);
                                      }}
                                    >
                                      <Row>
                                        <Col lg={8}>Edit</Col>
                                        <Col lg={4}>
                                          <FaEdit size={20} color="black" />
                                        </Col>
                                      </Row>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </div>
        )}
        {(selectiontags.all || selectiontags.players) && (
          <div className="CustomeConatiner">
            <Row className="my-5 mx-0">
              <h3 className="slider_main-heading">All Players</h3>
              <Col>
                <div className="mt-4 players-grid">
                  {data?.listPlayer?.data?.map((item) => {
                    console.log(item, "what is this");
                    return (
                      <>
                        <PlayerCard1
                          // id={item?.player_id}
                          title={item?.nick_name}
                          picture={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                            item?.user?.picture
                          }`}
                          data={item}
                        />
                      </>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>

      {/* Folder Create Modal */}
      <Modal
        isOpen={showFolderModal}
        toggle={() => setShowFolderModal(false)}
        centered
        className="folder-modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="folder-modal-content">
            <button
              className="folder-modal-close"
              onClick={() => setShowFolderModal(false)}
            >
              &times;
            </button>
            <div className="folder-modal-label">Folder Name</div>
            <Controller
              name="folderName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="w-100">
                  <input
                    className="folder-modal-input w-100"
                    type="text"
                    {...field}
                    placeholder="Enter folder name"
                  />
                  {errors.folderName && (
                    <p className="validation-text mt-0 pt-0">
                      {errors.folderName.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="folder-modal-actions">
              <button
                className="folder-modal-cancel"
                onClick={() => setShowFolderModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={loading4 || loading5}
                style={{
                  width: "auto !important",
                  height: "auto !important",
                  opacity: loading5 || loading4 ? "0.6" : "1",
                }}
                type="submit"
                className="folder-modal-create"
              >
                {currentId ? "Update new folder" : "Create new folder"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Internal CSS for dropdown menu */}
      <style>
        {`
        .dropdown-menu-small {
          min-width: 110px !important;
          width: 110px !important;
          font-size: 13px;
        }
        .custom-col-margin {
          margin-left: 0px ;
       }
        @media (min-width: 992px) {
        .custom-col-margin {
         margin-left: 30px;
       }
       }
      `}
      </style>
    </>
  );
};

export default HomeRec;
