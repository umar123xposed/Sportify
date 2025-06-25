import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PLAYERPROFILE_BY_ID, GET_TEAM_DETAILS, Sport_List } from '../../graphql/query/query';
import { UPDATE_TEAM } from '../../graphql/mutation';
import { UpdateTeamOnSubmit } from '../../graphql/api-callings';
import { FaUsers, FaUpload, FaTimesCircle, FaRegUserCircle } from 'react-icons/fa';
import SearchPlayerModal from '../../components/modules/searchPlayer';
import SearchCoachModal from '../../components/modules/searchCoach';

const schema = yup.object().shape({
  win: yup.number().typeError("Number Required").min(0, "Invalid format").integer("Invalid format").required("Required"),
  loss: yup.number().typeError("Number Required").min(0, "Invalid format").integer("Invalid format").required("Required"),
  tie: yup.number().typeError("Number Required").min(0, "Invalid format").integer("Invalid format").required("Required"),
  name: yup.string().required("Team name is required"),
  image: yup.mixed(),
});

const EditTeam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const { loading, error, data } = useQuery(GET_TEAM_DETAILS, {
    variables: { getTeamDetailId: parseInt(id, 10) },
    skip: !id,
  });

  const [updateTeam, { loading: mutationLoading }] = useMutation(UPDATE_TEAM);
  const [tags, setTags] = useState([]); // players
  const [coach, setCoach] = useState([]); // coaches
  //new code
  const [open, setOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [sportsData, setSportData] = useState(null);
  const [currendPlayer, setCurrentPLayer] = useState(null);
  const [profileType, setProfileType] = useState("Basic");
  const [profileData, setProfileData] = useState(null); // new state for
    const [showModel, setShowModel] = useState(false);

  //new code end

  const [addModal, setAddModal] = useState(false);
  const [coachModal, setCoachModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorTag, setErrorTag] = useState(null);
  const [errorCoach, setErrorCoach] = useState(null);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (data && data.getTeamDetail) {
      const team = data.getTeamDetail;
      setValue("name", team.name || "");
      setValue("win", team.win || 0);
      setValue("loss", team.loss || 0);
      setValue("tie", team.tie || 0);
      setValue("team_level", team.team_level || "");
      setTags(
        team.players
          ? team.players.map((p) => ({
              id: p.id,
              nick_name: p.players_profile?.nick_name || "",
              picture: p.players_profile?.user?.picture || "",
            }))
          : []
      );
      setCoach(
        team.coaches
          ? team.coaches.map((c) => ({
              id: c.id,
              nick_name: c.user?.full_name || "",
              picture: c.user?.picture || "",
            }))
          : []
      );
      if (team.logo)
        setPreview(`${import.meta.env.VITE_BASE_URL_IMAGE}${team.logo}`);
    }
  }, [data, setValue]);

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  const handleRemoveCoach = (index) => {
    setCoach((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  const handleOnClick = (event, player) => {
    event.preventDefault?.();
    if (!player?.id) return;
    setTags((prevTags) => {
      if (!prevTags.some((tag) => tag?.id === player.id)) {
        return [...prevTags, player];
      }
      return prevTags;
    });
    setErrorTag(null);
    setAddModal(false);
  };
  const handleCoachOnClick = (event, player) => {
    event.preventDefault?.();
    if (!player?.id) return;
    setCoach((prevTags) => {
      if (!prevTags.some((tag) => tag?.id === player.id)) {
        return [...prevTags, player];
      }
      return prevTags;
    });
    setCoachModal(false);
    setErrorCoach(null);
  };

  const onSubmit = async (formData) => {
    // if (tags.length === 0) {
    //   setErrorTag("Please add at least one player.");
    //   return;
    // }
    // if (coach.length === 0) {
    //   setErrorCoach("Please add at least one coach.");
    //   return;
    // }
    const playerIds = tags.map((player) => player.id);
    const coachIds = coach.map((c) => c.id);
    const payload = {
      id: parseInt(id, 10),
      players: playerIds,
      name: formData.name,
      coaches: coachIds,
      win: formData.win,
      team_level: formData.team_level,
      loss: formData.loss,
      tie: formData.tie,
    };
    try {
      const response = await updateTeam({
        variables: {
          input: payload,
        },
      });
      console.log("Team updated:", response);
      console.log(response.data?.updateTeam?.data?.id);
      navigate(`/coach/team-details?id=${response.data?.updateTeam?.data?.id}`);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

//new code start

const {
    data: dataProfileData,
    loading: loadingProfile,
    refetch: PlayerProfileRefetch,
  } = useQuery(GET_PLAYERPROFILE_BY_ID, {
    variables: {
      input: {
        user_id: currendPlayer?.user_id,
      },
    },
    fetchPolicy: "no-cache",
    skip: true,
  });

console.log(tags,'what is tag');

const {
    data: allSportData,
    loading: loadingSports,
    refetch: allSportsRefetch,
  } = useQuery(Sport_List, {
    variables: {
      input: {
        limit: 10,
        profile_type: profileType,
        user_id: currendPlayer?.user_id,
        cursor: null,
      },
    },
    fetchPolicy: "no-cache",
    skip: true,
  });

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (currendPlayer?.user_id) {
        const { data: sportsData } = await allSportsRefetch({
          input: {
            limit: 10,
            profile_type: profileType,
            user_id: currendPlayer?.user_id,
            cursor: null,
          },
        });

        setSportData(sportsData);
        // You can use `sportsData` here if needed
        console.log(sportsData);
      }
    };

    fetchData(); // call the async function
  }, [profileType, currendPlayer?.user_id]);

  const handleAddPlayer = async (e, player) => {
    console.log(player, "what asfsaf");
    setShowModel(true);
    setCurrentPLayer(player); // ✅ Set this first

    try {
      // ✅ Use player.user_id directly to avoid stale currendPlayer
      const { data } = await PlayerProfileRefetch({
        input: {
          user_id: player?.user_id,
        },
      });

      const { data: sportsData } = await allSportsRefetch({
        input: {
          limit: 10,
          profile_type: profileType,
          user_id: player?.user_id,
          cursor: null,
        },
      });

      setSportData(sportsData);
      setProfileData(data);

      console.log(sportsData?.playerSportsProfile?.data, "refetch result");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }

    // Optional: move this up if you rely on it right away
    // setCurrentPLayer(player);
  };

  const handleProfileSelection = (e, profileId) => {
    e.stopPropagation();
    setSelectedProfileId(profileId);
  };


  useEffect(() => {
    if (
      sportsData?.playerSportsProfile?.data?.length > 0 &&
      selectedProfileId === null
    ) {
      setSelectedProfileId(sportsData.playerSportsProfile.data[0].id);
    }
  }, [sportsData, selectedProfileId]);

  const handleSelectProfile = () => {
    if (!selectedProfileId) {
      console.log("No profile selected");
      return;
    }

    const selectedProfile = sportsData?.playerSportsProfile?.data?.find(
      (profile) => profile.id === selectedProfileId
    );

    if (selectedProfile) {
      console.log("Selected Profile Data:", selectedProfile);
      // Here you can pass the data to your parent component, API, or state management
     console.log(selectedProfile, "selectedProfile");

     setTags(( prevTags ) => {
      if (!prevTags.some(( tag ) => tag?.id === selectedProfile?.id)) {
        return [ ...prevTags, selectedProfile];
      }
      return prevTags;
    });

    setAddModal(false)
    setShowModel(false)

    setErrorTag(null);

    } else {
      console.log("Profile not found");
    }
  };
//new code end

  return (
    <Container>
      <div className="backbutton" onClick={() => navigate(-1)}>
        Back
      </div>
      <div className="coach-team-creation-container">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <h2 className="text-center coach-team-creation-title">
                Edit Team
              </h2>
              <div className="progress-indicator mb-4">
                <div className="step active"></div>
                <div className="step active"></div>
                <div className="step active"></div>
              </div>
              <div className="coach-team-creation-card">
                <div className="team-image-upload mb-4 text-center">
                  <div className="team-placeholder">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Team"
                        className="uploaded-team-img"
                      />
                    ) : (
                      <FaUsers className="placeholder-icon" />
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("openfile").click();
                    }}
                    className="uploadbutton"
                  >
                    Upload Images
                    <FaUpload className="upload-icon" />
                  </button>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          id={"openfile"}
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.preventDefault();
                            const file = e.target.files[0];
                            field.onChange(file);
                            if (file) {
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <div className="d-flex justify-content-center">
                          {errors.image && (
                            <p className="validation-text pt-1">
                              {errors.image.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label for="teamName" className="form-label">
                      Team Name
                    </Label>
                    <Controller
                      id="name"
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="forminput"
                          type="text"
                          placeholder=""
                          {...field}
                        />
                      )}
                    />
                    {errors?.name && (
                      <p className="validation-text">{errors?.name?.message}</p>
                    )}
                  </FormGroup>
                  <FormGroup className="d-flex justify-content-around gap-2">
                    <div>
                      <Label className="form-label">Wins</Label>
                      <Controller
                        name="win"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="forminput"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                      {errors?.win && (
                        <p className="validation-text">
                          {errors?.win?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="form-label">Losses</Label>
                      <Controller
                        name="loss"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="forminput"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                      {errors?.loss && (
                        <p className="validation-text">
                          {errors?.loss?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="form-label">Tie</Label>
                      <Controller
                        name="tie"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="forminput"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                      {errors?.tie && (
                        <p className="validation-text">
                          {errors?.tie?.message}
                        </p>
                      )}
                    </div>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label className="form-label">Team Level</Label>
                    <Controller
                      name="team_level"
                      control={control}
                      render={({ field }) => (
                        <Input className="forminput" type="text" {...field} />
                      )}
                    />
                    {errors?.team_level && <p className="validation-text">{errors?.team_level?.message}</p>}
                  </FormGroup> */}
                  <div className="add-section mb-3">
                    <div className="section-header">
                      <Label className="form-label">Add Player</Label>
                      <span className="total-count">
                        Total Players: {tags.length}
                      </span>
                    </div>
                    <div className="input-with-icon">
                      <Input
                        type="text"
                        className="forminput"
                        placeholder="Add more player"
                        onClick={(e) => setAddModal(true)}
                        readOnly
                      />
                      <div
                        className="plus-icon"
                        onClick={(e) => setAddModal(true)}
                      >
                        +
                      </div>
                    </div>
                    {errorTag && <p className="validation-text">{errorTag}</p>}
                    <div className="added-members-list mt-3">
                      {tags.map((player, index) => (
                        <div key={index} className="added-member-item">
                          <div className="member-info">
                            {player?.picture ? (
                              <img
                                src={player.picture}
                                alt={player?.nick_name || "Player"}
                                className="member-image"
                              />
                            ) : (
                              <FaRegUserCircle className="member-placeholder-icon" />
                            )}
                            <span>{player?.nick_name}</span>
                          </div>
                          <FaTimesCircle
                            className="remove-icon"
                            onClick={() => handleRemoveTag(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="add-section mb-3">
                    <div className="section-header">
                      <Label className="form-label">Add Coaches </Label>
                      <span className="total-count">
                        Total Coaches: {coach.length}
                      </span>
                    </div>
                    <div className="input-with-icon">
                      <Input
                        type="text"
                        className="forminput"
                        placeholder="Add more Coaches"
                        onClick={(e) => setCoachModal(true)}
                        readOnly
                      />
                      <div
                        className="plus-icon"
                        onClick={(e) => setCoachModal(true)}
                      >
                        +
                      </div>
                    </div>
                    {errorCoach && (
                      <p className="validation-text">{errorCoach}</p>
                    )}
                    <div className="added-members-list mt-3">
                      {coach.map((coach, index) => (
                        <div key={index} className="added-member-item">
                          <div className="member-info">
                            {coach?.picture ? (
                              <img
                                src={coach.picture}
                                alt={coach?.nick_name || "Coach"}
                                className="member-image"
                              />
                            ) : (
                              <FaRegUserCircle className="member-placeholder-icon" />
                            )}
                            <span>{coach?.nick_name}</span>
                          </div>
                          <FaTimesCircle
                            className="remove-icon"
                            onClick={() => handleRemoveCoach(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="containerbutton">
                    <Button
                      type="submit"
                      className="next-button mt-4"
                      disabled={mutationLoading}
                    >
                      {mutationLoading ? "Updating Team..." : "Update Team"}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <SearchPlayerModal
          setShow={setAddModal}
          show={addModal}
          handleOnclick={handleOnClick}
          tags={tags}
        />
        <SearchCoachModal
          setShow={setCoachModal}
          handleCoachOnClick={handleCoachOnClick}
          show={coachModal}
          coaches={coach}
        />
      </div>
    </Container>
  );
};

export default EditTeam;