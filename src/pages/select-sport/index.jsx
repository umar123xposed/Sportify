import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'; // Assuming you are using reactstrap based on previous files
import { Get_All_Sports } from '../../graphql/query/query';
// import './index.css'; // We'll create this CSS file next for specific styles
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { handleSportType } from '../../redux/profileSlice';

const SelectSport = () => {

  const role = useSelector((state) => state.authSlice.role);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [detail, setDetail] = useState()
  const [type, setType] = useState()
  const [error, setError] = useState()

  // const {
  //       loading,
  //       error,
  //       data: data1,
  //       refetch,
  //   } = useQuery(Get_All_Sports, {
  //       variables: { },
  //   });

  // console.log(data1)

  const [All_Sport] = useLazyQuery(Get_All_Sports)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await All_Sport({
          variables: {
            "input": {
              "profile_type": searchParams.get("id") ? (searchParams.get("type") == "basic" ? "Basic" : searchParams.get("type") == "advanced" ? "Advanced" : null) : null,
              "user_id": parseInt(searchParams.get("id"))
            }

          },
          fetchPolicy: "no-cache", // Ensure a fresh request every time
        });

        if (data) {
          const new_data = data?.listSport?.map((item) => ({
            label: item.name,
            value: item.id
          }));

          setDetail(new_data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  const [searchParams] = useSearchParams()

  const handleContinueClick = () => {
    if (!type) {
      setError("Please Select Type..!!")
      setTimeout(() => {
        setError()
      }, 5000)
      return
    }
    console.log(type.value, 'Continue button clicked');
    dispatch(handleSportType(type))
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");


    if (role == "Parent") {
      if (searchParams.get("type") === "basic") {
        navigate(`/parent/basic-profile?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      } else {
        navigate(`/parent/advanced-profile?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }
    if (role == "Athlete") {
      if (searchParams.get("type") === "basic") {
        navigate(`/athlete/basic-profile?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      } else {
        navigate(`/athlete/advanced-profile?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }

    // Add logic here for what happens when "Continue" is clicked
    // e.g., save selected sport, navigate to the next setup step
    // Example navigation: navigate('/next-setup-step');
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      borderRadius: "5px", // Rounded corners
      backdropFilter: "blur(20px)", // Glassmorphism blur effect
      WebkitBackdropFilter: "blur(20px)", // Safari compatibility
      padding: "4px 5px",
      border: "1px solid rgba(157, 157, 157, 0.3)", // Subtle border
      color: "var(--text-white)", // Text color (use a variable or set manually)
      fontSize: "14px",
      boxShadow: "none", // No extra shadow
      "&:hover": {
        border: "1px solid rgba(255, 255, 255, 0.5)", // Slight border change on hover
      },
      zIndex: 5,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 1 }),

    menu: (provided) => ({
      ...provided,

      background: "rgba(255, 255, 255, 0.2)", // Dropdown background
      borderRadius: "5px",
      position: "absolute",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(157, 157, 157, 0.3)",
      fontSize: "14px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.3)" // Highlighted option background
        : "transparent",
      color: "var(--text-white)", // Text color
      padding: 10,
      cursor: "pointer",
      zIndex: 1,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.7)", // Placeholder color
      fontStyle: "italic",
      zIndex: 1,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-white)",
      zIndex: 1,
      // Selected value color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--text-white)",
      zIndex: 1,
      // Dropdown arrow color
    }),
    indicatorSeparator: () => ({
      display: "none",
      zIndex: 1,
      // Remove the separator
    }),
  };

  const options = [
    { value: "Mother", label: "Mother" },
    { value: "Father", label: "Father" },
  ];

  return (
    <>
      {/* Assuming a similar background structure as your category page */}
      <div className="mt-5"> {/* Reuse background class if applicable, or create a new one */}
        <Container>
          <Row className="">
            <Col md={12}>
              {/* Back Button */}
              <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
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
                    d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                    fill="white"
                  />
                </svg>
                <h4>Back</h4>
              </div>
            </Col>
            <Col md={12} className="text-center">
              {/* Page Title */}
              <h2 className="who-we-are-heading">Athlete {searchParams.get("id") ? "Sport" : (searchParams.get("type") === "basic" ? "Basic" : "Advance")} Profile Setup</h2>
            </Col>
          </Row>

          {/* Main Content Area - Centered Box */}
          <Row className="justify-content-center mt-5">
            <Col md={6}>
              <div style={{
                backgroundColor: '#373737',
                borderRadius: '18px',
                padding: '30px',
                textAlign: 'left'
              }}>
                {/* Select Sport Section */}
                <label htmlFor="sportSelect" style={{ color: 'white', marginBottom: '10px', display: 'block' }}>Select Sport</label>
                <Select
                  // {...field} // Spread field props for React Hook Form integration
                  styles={customStyles}
                  menuPortalTarget={document.body}
                  options={detail && detail}
                  placeholder={"Select"}
                  onChange={(selectedOption) =>
                    setType(selectedOption)
                  } // Update form state
                />
                {error && <small className='text-danger' style={{ fontSize: "14px" }}>{error}</small>}
                {/* Continue Button */}
                <button
                  onClick={handleContinueClick}
                  className='primary-btn py-2 w-100 mt-4'
                >
                  Continue
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SelectSport;
