import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "reactstrap";
import { setCoachAction, setCode } from "../../redux/profileSlice";

const JoinOrganization = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [codename, setCodename] = useState("")

    const handleCreateNew = () => {
            dispatch(setCoachAction("Create"));
            navigate("/coach/select-organization"); // Replace with actual path
        };
        const handleExisting = () => {
            dispatch(setCoachAction("Join"))
            dispatch(setCode(codename))
            navigate("/coach/create-coach-profile");
        }
    

    return ( 
        <Modal isOpen={true}  centered className="folder-modal">
                <div className="folder-modal-content">

                    <div className="folder-modal-label">Enter Club Code</div>
                    <input
                        className="folder-modal-input"
                        type="text"
                        value={codename}
                        onChange={e => setCodename(e.target.value)}
                        placeholder="Enter Code to Join Existing Organization"
                    />
                    <div className="folder-modal-actions">
                        <button className="folder-modal-cancel" onClick={handleCreateNew}>Create New</button>
                        <button className="folder-modal-create" disabled={!codename} onClick={handleExisting}>Join Existing</button>
                    </div>
                </div>
            </Modal>
     );
}
 
export default JoinOrganization;