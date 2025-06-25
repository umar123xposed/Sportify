
import "./index.css";
import { Col, Container, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleAtheleteInfo } from "../../redux/profileSlice";

export default function AdvancePerformance() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { state } = useLocation()
  const profile = useSelector(
    (state) => state.profileSlice.profile.basicProfile
  );

  console.log(state,'what is state')

  const schema = yup.object().shape({
    workout_traning: yup.object().shape({
      strength: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
      recovery_speed: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
      edurance: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
    }),
  });


  console.log(profile, "zzzzzz");
  const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      workout_traning: {
        strength: "",
        recovery_speed: "",
        edurance:"",
      },
    },
  })

 const submit = (data) => {
   console.log(data,'what oyeee')

   dispatch(handleAtheleteInfo(data))
   if(state){
   navigate("/advance/academic-information", { state:true })

   }else{
     navigate("/advance/academic-information");

   }

  }

  return (
    <div className="who-we-are-bg py-4 pb-4">
      <form onSubmit={handleSubmit(submit)}>
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
            <Col md={12}></Col>
          </Row>
          <div className=" mx-5 ps-2 pb-3">
            <h3 style={{ color: "#fff" }}>Performance Metrics</h3>
          </div>

          <Row className="mt-4  grad-border p-5 mx-5">
            <div className="d-flex pb-3 justify-content-center">
              Workout and Training Logs
            </div>
            <Col md={6}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Strength</label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="workout_traning.strength"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur "
                            type="text"
                            placeholder="Strength"
                          />
                        </div>
                      )}
                    />
                    {errors?.workout_traning?.strength && (
                      <p className="validation-text">
                        {errors?.workout_traning?.strength.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Recovery Speed </label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="workout_traning.recovery_speed"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur "
                            type="text"
                            placeholder="Recovery Speed"
                          />
                        </div>
                      )}
                    />
                    {errors?.workout_traning?.recovery_speed && (
                      <p className="validation-text">
                        {errors?.workout_traning?.recovery_speed?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Endurance</label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="workout_traning.edurance"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur "
                            type="text"
                            placeholder="Recovery Speed"
                          />
                        </div>
                      )}
                    />
                    {errors?.workout_traning?.edurance && (
                      <p className="validation-text">
                        {errors?.workout_traning?.edurance?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="my-3 d-flex justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="279"
              height="24"
              viewBox="0 0 279 24"
              fill="none"
            >
              <line
                x1="21"
                y1="13.5"
                x2="65"
                y2="13.5"
                stroke="url(#paint0_linear_3365_12714)"
                stroke-width="3"
              />
              <line
                x1="83"
                y1="13.5"
                x2="127"
                y2="13.5"
                stroke="url(#paint1_linear_3365_12714)"
                stroke-width="3"
              />
              <line
                x1="147"
                y1="13.5"
                x2="191"
                y2="13.5"
                stroke="white"
                stroke-width="3"
              />
              <line
                x1="215"
                y1="13.5"
                x2="259"
                y2="13.5"
                stroke="white"
                stroke-width="3"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="url(#paint2_linear_3365_12714)"
                stroke-width="4"
              />
              <circle
                cx="75"
                cy="12"
                r="10"
                stroke="url(#paint3_linear_3365_12714)"
                stroke-width="4"
              />
              <circle
                cx="139"
                cy="12"
                r="10"
                stroke="url(#paint4_linear_3365_12714)"
                stroke-width="4"
              />
              <circle cx="203" cy="12" r="10" stroke="white" stroke-width="4" />
              <circle cx="267" cy="12" r="10" stroke="white" stroke-width="4" />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="url(#paint5_linear_3365_12714)"
              />
              <circle
                cx="75"
                cy="12"
                r="3"
                fill="url(#paint6_linear_3365_12714)"
              />
              <circle
                cx="139"
                cy="12"
                r="3"
                fill="url(#paint7_linear_3365_12714)"
              />
              <circle cx="203" cy="12" r="3" fill="white" />
              <circle cx="267" cy="12" r="3" fill="white" />
              <defs>
                <linearGradient
                  id="paint0_linear_3365_12714"
                  x1="21.0025"
                  y1="15.5"
                  x2="65.001"
                  y2="15.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_3365_12714"
                  x1="83.0025"
                  y1="15.5"
                  x2="127.001"
                  y2="15.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_3365_12714"
                  x1="0.0013628"
                  y1="12.0009"
                  x2="24.0005"
                  y2="12.0009"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_3365_12714"
                  x1="63.0014"
                  y1="12.0009"
                  x2="87.0005"
                  y2="12.0009"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_3365_12714"
                  x1="127.001"
                  y1="12.0009"
                  x2="151.001"
                  y2="12.0009"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_3365_12714"
                  x1="9.00034"
                  y1="12.0002"
                  x2="15.0001"
                  y2="12.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_3365_12714"
                  x1="72.0003"
                  y1="12.0002"
                  x2="78.0001"
                  y2="12.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_3365_12714"
                  x1="136"
                  y1="12.0002"
                  x2="142"
                  y2="12.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DDA027" />
                  <stop offset="0.3198" stop-color="#CE9B2B" />
                  <stop offset="0.6802" stop-color="#FEF48E" />
                  <stop offset="1" stop-color="#FFD046" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <Row>
            <Col md={4} />

            <Col md={4}>
              <button
                type="submit"
                className="w-100 primary-btn px-2 py-3 my-3"
              >
                <h3> Next </h3>
              </button>
            </Col>

            <Col md={4} />
          </Row>
        </Container>
      </form>
    </div>
  );
}
