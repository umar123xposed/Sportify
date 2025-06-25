import Lottie from "lottie-react";
// import Loader from "react-spinner-loader"
import LoaderNew from "./Compact-Green.json"

const WebLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-black"
      style={{
        position: "fixed",
        height: "100vh",
        width: "100%",
        zIndex: 999999,
      }}
    >
      {/* <Loader show={true}
                spinnerSize="160px"
                radius="10"

            /> */}
      <Lottie
        className="load position-absolute"
        //ref={animationRef}
        animationData={LoaderNew}
        loop={true}
        //speed={0.95}

        autoplay={true}
      />
    </div>
  );
};

export default WebLoader;
