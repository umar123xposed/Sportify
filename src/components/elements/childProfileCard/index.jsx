import React from 'react';
import dummyprofile from '../../../assets/dummyprofile.png'; // Assuming dummy profile image path
import './index.css'; // We'll create this CSS file next

const ChildProfileCard = ({
  name,
  id,
  image,
  isSelected,
  isAddCard,
  onClick
}) => {
  if (isAddCard) {
    return (
      <div
        className="child-profile-card add-child-card mx-2 d-flex justify-content-between align-items-center"
        onClick={onClick}
      >
        <div className="add-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </div>
        <div className="add-text text-white">Add more child</div>
      </div>
    );
  }

  // Existing child profile card
  return (
    <div
      className={`child-profile-card mx-2 d-flex align-items-center ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <img
        className="profile-image me-3"
        src={image || dummyprofile} // Use provided image or dummy
        alt={`${name}'s profile`}
      />
      <div className="profile-info">
        <div className="profile-name">{name}</div>
        <div className="profile-id">ID: {id}</div>
      </div>
    </div>
  );
};

export default ChildProfileCard;
