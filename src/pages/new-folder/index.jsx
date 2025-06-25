import React from 'react'
import { useState } from 'react';
import { Col, Modal, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Get_ALL_FOLDERS } from '../../graphql/query/query';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


import { CREATE_FOLDER, DELETE_FOLDER, UPDATE_FOLDER } from '../../graphql/mutation';
import * as yup from "yup";
import toast from "react-hot-toast"; // For error toasts
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const NewFolder = () => {

 const [showFolderModal, setShowFolderModal] = useState(false);
 const [folderName, setFolderName] = useState("");
 const [page, setPage] = useState(1);
 const [currentId, setCurrentId] = useState(null);

 const [createFolder, { loading:loading5, errore , data: data5 }] =
   useMutation(CREATE_FOLDER);

const [deleteFolder, { loading: loading2, error: error2, data: data2 }] =
  useMutation( DELETE_FOLDER );

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
        limit: 50,
        search: "",
      },
    },
    fetchPolicy: "no-cache", // Ensure a fresh request every time
  });

    const  handleDelete = async ( deleteId ) => {

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

    }

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
     console.log(name,'wwarwa')
     setValue("folderName", name);
   };

  const onSubmit = async (data) => {
    console.log("Submitted data:", data);

    if (currentId){
      await updateFolder({
        variables: {
          input: {
            name: data?.folderName,
            id:currentId
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
    }else{

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

  const navigate= useNavigate()
  return (
    <>
      <div className="CustomeConatiner">
        <h3 className="slider_main-heading mt-5">My Folder</h3>
        <div className="d-flex justify-content-end align-items-center mb-3">
          <button
            disabled={loading5}
            style={{
              width: "auto !important",
              height: "auto !important",
              opacity: loading5 ? "0.6" : "1",
            }}
            className="create-folder-btn"
            onClick={() => setShowFolderModal(true)}
          >
            + Create New Folder
          </button>
          {/* <button
            className="view-all-btn"
            onClick={() => navigate("/recruiter/new-folder")}
          >
            View All &gt;
          </button> */}
        </div>

        <Row className="">
          {AllFolders?.getAllFolders?.data?.map((folder) => {
            console.log(folder,'what sasa')

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
                    onClick={() =>
                      navigate(`/recruiter/folder-items/${folder?.id}`)
                    }
                    style={{ cursor: "pointer" }}
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
                      <div className="folder-date">Created on: 02/10/2024</div>
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
              onClick={() => {
                setShowFolderModal(false);
                reset({ folderName: "" });
                setCurrentId(null);
              }}
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
                {currentId ? "Update Folder Name" : "Create new folder"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
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
}

export default NewFolder
