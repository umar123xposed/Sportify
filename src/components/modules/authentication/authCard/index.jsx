import React from "react";
import { Container, Col, Row } from "reactstrap";
import Button from "../../../elements/button";
import bgImg from "../../../../assets/authbg.png";
import bgmain from "../../../../assets/bg.png";
import Heading from "../../../elements/heading";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import SocialButton from "../../../elements/socialButton";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../elements/Input";
import "./index.css";
import { yupResolver } from "@hookform/resolvers/yup";

const AuthCard = (props) => {
  const {
    handle,
    LeftprimaryHeading,
    LeftSecondaryHeading,
    socialIcons,
    feildsData,
    leftBtn,
    RightprimaryHeading,
    RightSecondaryHeading,
    rightBtn,
    schema
  } = props;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver( schema )

  })
  return (
    <>
      <div
        className="mainwrapper"
        style={{
          backgroundImage: `url(${bgmain})`,
          backgroundSize: "cover",
        }}
      >
     <form onSubmit={handleSubmit(handle)}>
        <Row
          className="align-items-center text-center "
          style={{
            backgroundColor: "white",
            height: "80vh",
            width: 1000,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "25px",
          }}
        >
          <Col md={8}>
            <Heading
              title={LeftprimaryHeading}
              textColor="#2FB397"
              fontSize="40px"
              fontWeight="bolder"
              padding="10px 0"
            />

            <Heading
              title={LeftSecondaryHeading}
              textColor="#5E6160"
              fontSize="17px"
              fontWeight="normal"
              padding="10px 0"
              fontFamily="cursive"
            />

            <div className="d-flex justify-content-center mb-3">
              {socialIcons.map((item) => (
                <SocialButton
                  id={item?.id}
                  backgroundColor={item?.backgroundColor}
                  icon={item?.icon}
                  margin={item?.margin}
                />
              ))}
            </div>
            <Row>
              <Col md={12} className="sperate" style={{ padding: "0 20%" }}>
                <h2>
                  <span> OR </span>
                </h2>
              </Col>
            </Row>

              <Row>
              <Col md={2} />
              <Col md={8}>
                {feildsData?.map((item) => (
                  <Controller
                    key={item.id} // Add a unique key for each mapped item
                    name={item.id}
                    control={control}
                    render={({ field }) => (
                      <Input
                        field ={field}
                          id={item?.id}
                        type={item?.type}
                        placeholder={item?.placeholder}
                        textColor="#878888"
                        fontSize={14}
                        fontWeight={600}
                        padding="10px 20px"
                        margin={item?.margin}
                      />
                    )}
                  />
                ))}
              </Col>
              <Col md={2} />
            </Row>

           <Row>
              <Col md={2} />

              <Col className="d-flex justify-content-center" md={8}>
                <Button
                  onClick={props.handleLogin}
                  fontWeight="bold"
                  padding="8px 40px"
                  backgroundColor="#2FB397"
                  textColor="white"
                  borderColor="#2FB397"
                  title={leftBtn}
                />
              </Col>

              <Col md={2} />
            </Row>
          </Col>
          <Col
            className="p-0"
            md={4}
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              height: "100%",
              borderRadius: "0 25px 25px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#2FB397",
                height: "100%",
                opacity: "35%",
                borderRadius: "0 25px 25px 0",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                marginLeft: "2%",
                bottom: "40%",
                width: 270,
              }}
            >
              <Heading
                title={RightprimaryHeading}
                textColor="white"
                fontSize="40px"
                fontWeight="bold"
              />

              <Heading
                title={RightSecondaryHeading}
                textColor="white"
                fontSize="15px"
                fontWeight="normal"
                padding="10px 0"
                fontFamily="cursive"
              />
              <div className="d-flex justify-content-center">
                <Button
                  onClick={()=>na}
                  fontWeight="bold"
                  padding="8px 40px"
                  nopadding
                  backgroundColor="white"
                  textColor="#2FB397"
                  borderColor="white"
                  title={rightBtn.title}
                />
              </div>
            </div>
          </Col>

        </Row>
        </form>
      </div>
    </>
  );
};

export default AuthCard;
