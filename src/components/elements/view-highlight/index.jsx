import { Modal, ModalBody } from 'reactstrap'


const ViewHighlightModal = ({ isOpen, toggle, image, type }) => {
    console.log(image)

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered className="basic-profile-modal">
            <ModalBody className="modal-body-content d-flex justify-content-center align-items-center" style={{ backgroundColor: '#5353538f' }}>
                {/* Close Button */}
                <button className="close-button d-flex justify-content-center align-items-center" onClick={toggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
                {
                    type === "image" && (
                        <img src={image} className='d-flex justify-content-center align-items-center' alt='highlight-image' style={{ width: "100%", objectFit: "contain" }} />
                    )
                }
                {
                    type === "video" && (
                        (
                        <video src={image} controls className='d-flex justify-content-center align-items-center' alt='highlight-image' style={{ width: "100%", objectFit: "contain" }} />
                    )
                    )
                }

            </ModalBody>
        </Modal>
    )
}

export default ViewHighlightModal
