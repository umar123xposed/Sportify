import { Modal, ModalBody } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Create_Highlight } from '../../../graphql/mutation'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression'
import Loader from "react-spinner-loader"

const AddHighlightModal = ({ isOpen, toggle, id }) => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [mediaType, setMediaType] = useState(null)
    const [loader, setLoader] = useState(false)

    const validationSchema = Yup.object().shape({
        highlightName: Yup.string().required('Highlight Name is required'),
        media: Yup.mixed().required('Media file is required'),
    })

    const [Highlight_Create] = useMutation(Create_Highlight)

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            highlightName: '',
            media: null,
        }
    })

    const handleMediaUpload = async (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        const isImage = selectedFile.type.startsWith('image/')
        const isVideo = selectedFile.type.startsWith('video/')

        try {
            if (isImage) {
                const compressedFile = await imageCompression(selectedFile, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true
                })
                setFile(compressedFile)
                setValue('media', compressedFile)
                setMediaType('image')

                const reader = new FileReader()
                reader.onloadend = () => setPreview(reader.result)
                reader.readAsDataURL(compressedFile)
            } else if (isVideo) {
                const videoUrl = URL.createObjectURL(selectedFile)
                const videoElement = document.createElement('video')
                videoElement.src = videoUrl

                videoElement.onloadedmetadata = () => {
                    const duration = videoElement.duration
                    if (duration > 30) {
                        toast.error('Video must be 30 seconds or less.')
                        return
                    }
                    setFile(selectedFile)
                    setValue('media', selectedFile)
                    setMediaType('video')
                    setPreview(videoUrl)
                }
            } else {
                toast.error('Only image or video files are allowed.')
            }
        } catch (err) {
            console.error('Media handling error:', err)
        }
    }

    const clearMedia = () => {
        setFile(null)
        setPreview(null)
        setMediaType(null)
        setValue('media', null)
    }

    const onSubmit = async (data) => {
        // console.log(file, mediaType)
        setLoader(true)
        try {
            const { data: res } = await Highlight_Create({
                variables: {
                    input: {
                        user_id: id,
                        title: data.highlightName,
                        media: {
                            media: file,
                            type: mediaType
                        }
                    }
                },
                fetchPolicy: 'no-cache'
            })

            if (res) {
                setLoader(false)
                toast.success("Created successfully")
                toggle()
                reset()
                clearMedia()
                
            }
        } catch (e) {
            console.error(e)
            setLoader(false)
            // toast.error("Error creating highlight")
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered className="basic-profile-modal">
            <ModalBody className="modal-body-content" style={{ backgroundColor: '#5353538f' }}>
                <button className="close-button d-flex justify-content-center align-items-center" onClick={toggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>

                <h5 className="modal-title mb-3">Add Highlight</h5>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="upload-area d-flex flex-column align-items-center mb-3 text-center" style={{
                        border: '2px dashed #999',
                        borderRadius: '10px',
                        padding: '30px',
                        cursor: 'pointer',
                        position: 'relative',
                    }}>
                        <input
                            id="media-upload"
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="d-none"
                        />
                        <label htmlFor="media-upload" style={{ cursor: 'pointer' }}>
                            {!file ? <div>📷 Upload image or video</div> : <div className="text-success"></div>}
                        </label>

                        {preview && mediaType === 'image' && (
                            <img src={preview} alt="Preview" className="mt-2" style={{ maxWidth: '100%', borderRadius: '10px' }} />
                        )}

                        {preview && mediaType === 'video' && (
                            <video src={preview} controls className="mt-2" style={{ maxWidth: '100%', borderRadius: '10px' }} />
                        )}

                        {file && (
                            <button type="button" onClick={clearMedia} className="btn btn-sm btn-danger mt-2 pt-0" style={{ width: "auto" }}>
                                Remove
                            </button>
                        )}

                        {errors.media && (
                            <small className="text-danger mt-2" style={{ fontSize: "14px" }}>
                                {errors.media.message}
                            </small>
                        )}
                    </div>

                    <div className="basic-inputs input-card mb-3">
                        <div className="input-transparent-blur-fields">
                            <label>Highlight Name</label>
                            <div className="w-100">
                                <Controller
                                    name="highlightName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            className="w-100 input-transparent-blur2"
                                            type="text"
                                            placeholder="Enter highlight name"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.highlightName && (
                                    <p className="validation-text">{errors.highlightName.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="primary-btn px-4 py-2 d-flex gap-3" disabled={loader} style={{opacity: loader && "0.6"}}>
                            Upload
                            {
                                loader &&
                                (<Loader show={true}
                                spinnerSize="16px"
                                radius="10"

                                color="red"
                            />)
                            }
                        </button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default AddHighlightModal
