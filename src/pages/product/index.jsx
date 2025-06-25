import React from 'react'
import "./index.css"
import prev from "./../../assets/forword.png";
import next from "./../../assets/forword.png";
import { Col, Container, Row } from 'reactstrap';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useNavigate } from 'react-router-dom';

export default function Product() {

  const navigate = useNavigate()


   const CustomLeftNav = (onClick, disabled) => {
     return (
       <img style={{ height:"30px" }} className="next_control" src={next} onClick={onClick} alt="image" />
     );
   };

   const CustomRightNav = (onClick, disabled) => {
     return (
       <img
         style={{ transform: "scaleY(-1)" , height:"30px" }}
         className="prev_control"
         src={prev}
         onClick={onClick}
         alt="image"
       />
     );
   }



   const images = [
     {
       original: "https://picsum.photos/id/1018/1000/600/",
       thumbnail: "https://picsum.photos/id/1018/250/150/",
     },
     {
       original: "https://picsum.photos/id/1015/1000/600/",
       thumbnail: "https://picsum.photos/id/1015/250/150/",
     },
     {
       original: "https://picsum.photos/id/1019/1000/600/",
       thumbnail: "https://picsum.photos/id/1019/250/150/",
     },
     {
       original: "https://picsum.photos/id/1018/1000/600/",
       thumbnail: "https://picsum.photos/id/1018/250/150/",
     },
     {
       original: "https://picsum.photos/id/1015/1000/600/",
       thumbnail: "https://picsum.photos/id/1015/250/150/",
     },
     {
       original: "https://picsum.photos/id/1019/1000/600/",
       thumbnail: "https://picsum.photos/id/1019/250/150/",
     },
   ];


  return (
    <>
      <div className="page-wrapper pb-4">
        <Container>
          <div className="containerPadding">
            <Row>
              <Col lg={7} md={8} sm={8} className="mt-5">
                <ImageGallery
                  className="image-gallery"
                  showBullets={false}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  thumbnailPosition="left"
                  lazyLoad={true}
                  items={images}
                  renderLeftNav={CustomRightNav}
                  renderRightNav={CustomLeftNav}
                />
              </Col>
              <Col lg={5} md={8} sm={8} className="mt-5">
                <div className="details">
                  <h3 className="product-title">
                    Bold, vibrant 100% cotton beach towels—perfect for any
                    setting!
                  </h3>
                  <h2 className="product-price">$40.00</h2>

                  <h4 className="product-color">color: White </h4>
                  <div className="d-flex align-items-center">
                    <div className="selected-color me-2">
                      <div
                        style={{ backgroundColor: "red" }}
                        className="color-selection"
                      ></div>
                    </div>
                    <div className="me-2">
                      <div
                        style={{ backgroundColor: "blue" }}
                        className="color-selection"
                      ></div>
                    </div>{" "}
                    <div className="me-2">
                      <div
                        style={{ backgroundColor: "white" }}
                        className="color-selection"
                      ></div>
                    </div>{" "}
                    <div className="me-2">
                      <div
                        style={{ backgroundColor: "black" }}
                        className="color-selection"
                      ></div>
                    </div>{" "}
                  </div>
                  <h4 className="product-color">size : Small</h4>
                  <div className="grid-container categories ">
                    <div className="single-category selected-cat ">S</div>
                    <div className="single-category ">M</div>

                    <div className="single-category ">L</div>

                    <div className="single-category ">XL</div>

                    <div className="single-category ">XXL</div>
                  </div>
                  <div
                    onClick={() => navigate("/purchase")}
                    className="primary-btn px-2 py-3 my-3  w-80"
                  >
                    <h3> Purchase </h3>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='my-4'>
              <Col md={12}>
                <h3 className="details-title">Product Details</h3>
                <h6 className="para-content pb-4">
                  <strong style={{ color: "#fff" }}> Overview: </strong> The
                  Black and Charcoal Zipper Style Jacket for Men is a versatile
                  and stylish outerwear option <t></t>hat blends contemporary
                  design with practical functionality. Perfect for casual
                  outings or semi-formal occasions, this jacket is a must-have
                  in any modern wardrobe.
                </h6>

                <h6 className="para-content pb-4">
                  <strong style={{ color: "#fff" }}>
                    Material and Fabric:
                  </strong>{" "}
                  rafted from a high-quality blend of materials, the jacket
                  ensures durability and comfort. The outer shell is typically
                  made from a mix of polyester and cotton, providing resistance
                  to wear and tear while maintaining breathability. The inner
                  lining is soft, offering warmth during cooler days.
                </h6>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
