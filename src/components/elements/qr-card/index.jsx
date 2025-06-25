import React, { useState } from 'react'
import "./index.css"
import qr from "./../../../assets/qr-black.png"
import blr from "./../../../assets/blrQr.png"
import dummyprofile from "./../../../assets/dummyprofile.png";
import { useNavigate } from 'react-router-dom';
import { handleAddQR } from '../../../redux/profileSlice';
import { useDispatch } from 'react-redux';
import { saveAs } from "file-saver";
import Swal from 'sweetalert2';



export default function QrCode(props) {

  const [copyText, setCopyText] = useState()
  const dispatch = useDispatch()
  console.log(props?.heading, 'props')

  const handleCopy = async (qrCode) => {
    setCopyText("QR code copied!")
    try {
      await navigator.clipboard.writeText(qrCode);

    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    setTimeout(() => {
      setCopyText()
    }, 5000)
  };

  const handleShareClick = async (image) => {
    try {
      await navigator.share({
        title: "Spot Me Id",
        text: "Qr Code",
        //selectedMessage && modal.activeTab === "images" && selectedMessage.content,
        url: image,
      });
      // console.log("Shared successfully");
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  const downloadBase64Image1 = (
    base64String,
    fileName = "image.png",
    mimeType = "image/png"
  ) => {
    console.log(base64String)
    // Check if base64String already contains a data URL prefix.
    const dataUrl = base64String.startsWith("data:")
      ? base64String
      : `data:${mimeType};base64,${base64String}`;

    // Create an anchor element
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;

    // Append the link to the document, trigger click, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadBase64Image = async (imageUrl, fileName = "qr-code.png") => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_IMAGE}${imageUrl}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };



  const navigate = useNavigate()
  console.log(props?.qr, "what is heading");
  return (
    <div className="glass-card p-0 ">


      <div className="qr-body  w-100">

        {!props?.qr ? (
          <div className="d-flex justify-content-center">
            <img
              style={{ height: "230px", width: "230px" }}
              src={blr}
              alt={"Blr"}
            />
          </div>
        ) : (
          <>
            {
              console.log(props)
            }

            <div className="py-3 bar-bg mt-5 ">
              <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${props?.qr?.qr_code}`} alt="bar-bg" />

            </div>
            <div className='text-center mt-3 fw-bold text-white'>{props?.user?.full_name} - {props?.qr?.sport?.name}</div>
          </>
        )}
      </div>

      <div className="qr-social my-5 px-3 d-flex flex-sm-nowrap flex-wrap justify-content-evenly">
        {
          // here
        }
        <div onClick={() => handleShareClick(`${import.meta.env.VITE_BASE_URL_IMAGE}${props?.qr?.qr_code
          }`)
        } className="text-center qr-actions mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="18"
            viewBox="0 0 23 24"
            fill="none"
          >
            <path
              d="M6.83333 0.625C3.12842 0.625 0.125 3.62842 0.125 7.33333V8.5C0.125 8.98325 0.516751 9.375 1 9.375C1.48325 9.375 1.875 8.98325 1.875 8.5V7.33333C1.875 4.59492 4.09492 2.375 6.83333 2.375H8C8.48325 2.375 8.875 1.98325 8.875 1.5C8.875 1.01675 8.48325 0.625 8 0.625H6.83333Z"
              fill="#FAFAFA"
            />
            <path
              d="M15 0.625C14.5168 0.625 14.125 1.01675 14.125 1.5C14.125 1.98325 14.5168 2.375 15 2.375H16.1667C18.9051 2.375 21.125 4.59492 21.125 7.33333V8.5C21.125 8.98325 21.5168 9.375 22 9.375C22.4832 9.375 22.875 8.98325 22.875 8.5V7.33333C22.875 3.62842 19.8716 0.625 16.1667 0.625H15Z"
              fill="#FAFAFA"
            />
            <path
              d="M4.5 11.125C4.01675 11.125 3.625 11.5168 3.625 12C3.625 12.4832 4.01675 12.875 4.5 12.875H18.5C18.9832 12.875 19.375 12.4832 19.375 12C19.375 11.5168 18.9832 11.125 18.5 11.125H4.5Z"
              fill="#FAFAFA"
            />
            <path
              d="M1.875 15.5C1.875 15.0168 1.48325 14.625 1 14.625C0.516751 14.625 0.125 15.0168 0.125 15.5V16.6667C0.125 20.3716 3.12842 23.375 6.83333 23.375H8C8.48325 23.375 8.875 22.9832 8.875 22.5C8.875 22.0168 8.48325 21.625 8 21.625H6.83333C4.09492 21.625 1.875 19.4051 1.875 16.6667V15.5Z"
              fill="#FAFAFA"
            />
            <path
              d="M22.875 15.5C22.875 15.0168 22.4832 14.625 22 14.625C21.5168 14.625 21.125 15.0168 21.125 15.5V16.6667C21.125 19.4051 18.9051 21.625 16.1667 21.625H15C14.5168 21.625 14.125 22.0168 14.125 22.5C14.125 22.9832 14.5168 23.375 15 23.375H16.1667C19.8716 23.375 22.875 20.3716 22.875 16.6667V15.5Z"
              fill="#FAFAFA"
            />
          </svg>
          <p>Share</p>
        </div>

        <div onClick={() =>
          handleCopy(
            `${import.meta.env.VITE_BASE_URL_IMAGE}${props?.qr?.qr_code}`
          )}

          className="text-center qr-actions mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="18"
            viewBox="0 0 21 27"
            fill="none"
          >
            <path
              d="M11.9731 15.9429L13.1198 11.8108C13.7531 9.5288 12.3504 7.18313 9.98689 6.57166C7.62334 5.96019 5.19391 7.31446 4.5606 9.59651L1.69382 19.9265C1.0605 22.2086 2.46314 24.5543 4.82669 25.1657C5.91204 25.4465 7.01129 25.3128 7.94413 24.8651C8.5166 24.5903 9.02641 24.1973 9.43186 23.7092M8.84018 10.7037L7.69347 14.8357C7.06016 17.1177 8.4628 19.4634 10.8263 20.0749C13.1899 20.6864 15.6193 19.3321 16.2526 17.05L19.1194 6.71999C19.7527 4.43794 18.3501 2.09228 15.9866 1.48081C14.9012 1.20002 13.802 1.33374 12.8691 1.78147C12.2966 2.05623 11.7868 2.44926 11.3814 2.93732"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <p>Copy</p>
        </div>

        <div
          onClick={() => {
            downloadBase64Image(props?.qr?.qr_code);

          }}
          className="text-center qr-actions mb-2"
        >
          <svg
            style={{
              transform: props?.title == "Download" && "rotate(180deg)",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="18"
            viewBox="0 0 23 24"
            fill="none"
          >
            <path
              d="M5.9208 22.4282L5.80347 23.1689H5.80347L5.9208 22.4282ZM1.07182 17.5792L1.81258 17.4619L1.07182 17.5792ZM21.9282 17.5792L22.6689 17.6965H22.6689L21.9282 17.5792ZM17.0792 22.4282L17.1965 23.1689L17.0792 22.4282ZM21.4334 10.3829C21.1847 10.0517 20.7145 9.98489 20.3833 10.2337C20.0521 10.4824 19.9853 10.9526 20.2341 11.2838L21.4334 10.3829ZM2.76591 11.2838C3.01468 10.9526 2.94786 10.4824 2.61667 10.2337C2.28548 9.98489 1.81533 10.0517 1.56656 10.3829L2.76591 11.2838ZM10.75 17.8333C10.75 18.2475 11.0858 18.5833 11.5 18.5833C11.9142 18.5833 12.25 18.2475 12.25 17.8333H10.75ZM6.24565 5.7007C5.9883 6.02526 6.0428 6.497 6.36736 6.75435C6.69193 7.0117 7.16367 6.95721 7.42102 6.63264L6.24565 5.7007ZM8.46416 4.10987L7.87647 3.6439L8.46416 4.10987ZM14.5358 4.10987L15.1235 3.6439L14.5358 4.10987ZM15.579 6.63264C15.8363 6.95721 16.3081 7.0117 16.6326 6.75435C16.9572 6.497 17.0117 6.02527 16.7544 5.7007L15.579 6.63264ZM11.2076 1.5232L11.0896 0.782546L11.0896 0.782547L11.2076 1.5232ZM11.7924 1.5232L11.9105 0.782547L11.9105 0.782546L11.7924 1.5232ZM21.25 14.3333V15.5H22.75V14.3333H21.25ZM15 21.75H8V23.25H15V21.75ZM1.75 15.5V14.3333H0.25V15.5H1.75ZM8 21.75C6.8875 21.75 6.41857 21.7477 6.03812 21.6874L5.80347 23.1689C6.32991 23.2523 6.94482 23.25 8 23.25V21.75ZM0.25 15.5C0.25 16.5552 0.247672 17.1701 0.331052 17.6965L1.81258 17.4619C1.75233 17.0814 1.75 16.6125 1.75 15.5H0.25ZM6.03812 21.6874C3.863 21.3429 2.15709 19.637 1.81258 17.4619L0.331052 17.6965C0.777214 20.5135 2.98651 22.7228 5.80347 23.1689L6.03812 21.6874ZM21.25 15.5C21.25 16.6125 21.2477 17.0814 21.1874 17.4619L22.6689 17.6965C22.7523 17.1701 22.75 16.5552 22.75 15.5H21.25ZM15 23.25C16.0552 23.25 16.6701 23.2523 17.1965 23.1689L16.9619 21.6874C16.5814 21.7477 16.1125 21.75 15 21.75V23.25ZM21.1874 17.4619C20.8429 19.637 19.137 21.3429 16.9619 21.6874L17.1965 23.1689C20.0135 22.7228 22.2228 20.5135 22.6689 17.6965L21.1874 17.4619ZM22.75 14.3333C22.75 12.8521 22.2599 11.4833 21.4334 10.3829L20.2341 11.2838C20.8722 12.1333 21.25 13.1881 21.25 14.3333H22.75ZM1.75 14.3333C1.75 13.1881 2.12782 12.1333 2.76591 11.2838L1.56656 10.3829C0.740055 11.4833 0.25 12.8521 0.25 14.3333H1.75ZM12.25 17.8333V2.66667H10.75V17.8333H12.25ZM7.42102 6.63264L9.05184 4.57584L7.87647 3.6439L6.24565 5.7007L7.42102 6.63264ZM13.9482 4.57584L15.579 6.63264L16.7544 5.7007L15.1235 3.6439L13.9482 4.57584ZM9.05184 4.57584C9.7135 3.74135 10.1706 3.16665 10.5577 2.7781C10.9414 2.39291 11.1628 2.2898 11.3256 2.26386L11.0896 0.782547C10.4598 0.882888 9.95971 1.25298 9.49499 1.71949C9.03362 2.18264 8.51536 2.83813 7.87647 3.6439L9.05184 4.57584ZM15.1235 3.6439C14.4846 2.83813 13.9664 2.18264 13.505 1.71949C13.0403 1.25298 12.5402 0.882888 11.9105 0.782547L11.6744 2.26386C11.8372 2.2898 12.0586 2.39291 12.4423 2.7781C12.8294 3.16665 13.2865 3.74136 13.9482 4.57584L15.1235 3.6439ZM11.3256 2.26386C11.3838 2.25459 11.442 2.25 11.5 2.25V0.75C11.3627 0.75 11.2255 0.760881 11.0896 0.782546L11.3256 2.26386ZM11.5 2.25C11.558 2.25 11.6162 2.25459 11.6744 2.26386L11.9105 0.782546C11.7745 0.760881 11.6373 0.75 11.5 0.75V2.25ZM12.25 2.66667V1.5H10.75V2.66667H12.25Z"
              fill="white"
            />
          </svg>
          <p>Download</p>
        </div>

        <div
          onClick={() => {
            Swal.fire({
              title: '🚀 Coming Soon!',
              text: 'We are working hard to launch something amazing. Stay tuned!',
              icon: 'info',
              confirmButtonText: 'Got it!',
              background: '#1e1e2f',
              color: '#fff',
              confirmButtonColor: '#4f46e5',
              backdrop: `
                rgba(20, 20, 20, 0.78)
                url("https://media.tenor.com/Jg1b9ALpxH0AAAAi/loading-bar-loader.gif")
                left top
                no-repeat
              `,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });
            // if (!props?.qr) {

            // } else {
            //   console.log("im herer");

            //   dispatch(handleAddQR(props?.qr));

            //   navigate("/parent/merchandise", {
            //     state: {
            //       qr: props?.qr || null,
            //     },
            //   });
            //   //      props?.state(false);
            // }
          }}
          className="text-center qr-actions mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 28 21"
            fill="none"
          >
            <path
              d="M13.9824 20.4788C11.7677 20.4769 9.56011 20.2277 7.40068 19.7359C7.03612 19.6552 6.71038 19.4516 6.47811 19.1593C6.24583 18.867 6.12113 18.5036 6.12493 18.1303V11.328C1.99931 10.8153 0.88106 6.70189 0.804935 5.05252C0.788857 4.71497 0.861113 4.37908 1.01457 4.078C1.16802 3.77693 1.39736 3.52109 1.67993 3.33577C3.09391 2.39603 4.55662 1.53178 6.06193 0.746642C6.7569 0.455152 7.49689 0.285548 8.24944 0.245267C8.37456 0.238913 8.49958 0.259502 8.61606 0.305642L8.89343 0.415891C12.2499 1.40015 15.8222 1.37154 19.1624 0.333642C19.2736 0.288142 19.3926 0.263641 19.5124 0.262766H19.5334C20.3193 0.281552 21.0967 0.429355 21.8347 0.700266C21.8722 0.713797 21.9087 0.729876 21.9441 0.748392C23.4275 1.53764 24.8654 2.40214 26.2578 3.34189C26.5385 3.52811 26.766 3.78412 26.9178 4.08479C27.0697 4.38546 27.1408 4.72046 27.1241 5.05689C27.0086 7.10002 25.7503 10.8319 21.8828 11.3236V18.132C21.8838 18.5042 21.7574 18.8655 21.5247 19.156C21.292 19.4465 20.967 19.6486 20.6036 19.7289C18.4318 20.2259 16.2111 20.477 13.9833 20.4788M7.87493 18.048C11.9103 18.9568 16.0976 18.9544 20.1319 18.041V10.4994C20.1319 10.2673 20.2241 10.0448 20.3882 9.88067C20.5523 9.71658 20.7749 9.62439 21.0069 9.62439C25.0652 9.62439 25.3644 5.15052 25.3767 4.95977C25.3767 4.92754 25.3686 4.89584 25.3531 4.86756C25.3377 4.83927 25.3154 4.81532 25.2883 4.79789C23.9611 3.90203 22.5885 3.07551 21.1758 2.32164C20.8651 2.21006 20.5446 2.12803 20.2186 2.07664C20.1836 2.13206 20.1451 2.18572 20.1031 2.23764L15.3606 8.10014C15.2017 8.29651 15.0022 8.45616 14.7758 8.56813C14.5494 8.6801 14.3015 8.74173 14.049 8.7488C13.7965 8.75587 13.5455 8.70819 13.3132 8.60906C13.0809 8.50993 12.8728 8.36169 12.7032 8.17452L7.38318 2.30327C7.34358 2.25968 7.3062 2.21412 7.27118 2.16677C7.10831 2.21229 6.9482 2.26721 6.79169 2.33127C5.36888 3.08246 3.98464 3.90454 2.64418 4.79439C2.61448 4.81253 2.59025 4.83838 2.57407 4.8692C2.55789 4.90002 2.55037 4.93464 2.55231 4.96939C2.55231 5.01839 2.87869 9.62964 6.99731 9.62964C7.22937 9.62964 7.45193 9.72183 7.61603 9.88592C7.78012 10.05 7.87231 10.2726 7.87231 10.5046L7.87493 18.048ZM8.35793 2.07577L13.3516 7.58652C13.4363 7.68005 13.5403 7.75414 13.6564 7.8037C13.7725 7.85326 13.898 7.87711 14.0241 7.87362C14.1503 7.87013 14.2743 7.83937 14.3874 7.78347C14.5006 7.72757 14.6003 7.64785 14.6798 7.54977L19.0067 2.20177C18.5482 2.32602 18.0865 2.43306 17.6216 2.52289L13.9991 6.99939L9.88918 2.46252C9.37369 2.3546 8.86285 2.22558 8.35793 2.07577Z"
              fill="white"
            />
          </svg>
          <p> Wares </p>
        </div>
      </div>
      {
        copyText &&
        <div className='d-flex justify-content-center pb-4'>
          <small className='text-center text-white ' style={{ fontSize: "14px" }}>{copyText}</small>
        </div>
      }
    </div>
  );
}
