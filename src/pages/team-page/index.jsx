import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'reactstrap'; // Import Modal
import { useNavigate } from 'react-router-dom'; // Assuming routing
// Import any data fetching hooks or logic here if needed
// import { useQuery } from '@apollo/client'; // Example

import './index.css'; // Import the CSS file
import RIPL from "../../assets/RIPL.png"
import profile from "../../assets/dummyprofile.png"

// Define a simple placeholder Player Card component for now
// You might want to move this to a separate file later (e.g., src/components/modules/PlayerCard)
const PlayerCard = ({ player, onCardClick }) => {
    // Handler for clicking the card or arrow
    const handleCardClick = () => {
        console.log('Profile card clicked:', player.name);
        if (onCardClick) {
             onCardClick(player); // Call the passed handler with player/coach data
        }
        // Implement navigation or show player details
        // navigate(`/player-details/${player.id}`); // Example navigation - moved to parent if using modal
    };

    return (
        <div className="player-card" onClick={handleCardClick}>
            <div className="player-image">
                <img src={player.imageUrl} alt={player.name} />
            </div>
            <div className="player-info">
                <div className="player-name">{player.name}</div>
                <div className="player-position">{player.position || player.role}</div>
                {player.jerseyNumber !== undefined && player.jerseyNumber !== null && (
                    <div className="player-jersey">Jersey Number: {player.jerseyNumber}</div>
                )}
            </div>
            <div className="player-arrow">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                   <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                 </svg>
            </div>
        </div>
    );
};


const TeamPage = () => {
    const navigate = useNavigate(); // Initialize navigate

    // Placeholder data for team information
    const teamData = {
        name: "RIPL LACROSSE",
        playersCount: 21,
        coachesCount: 2,
        wins: 12,
        losses: 6,
        tie: 2,
        logoUrl: 'path/to/your/team-logo.png', // Replace with actual logo path
        coaches: ["Chris Robbins", "Colin Winkler"], // Example coaches
    };

    // Placeholder data for players (replace with actual data fetched from API)
    const [players, setPlayers] = useState([
        
            { id: 1, name: "Brandt", lastName: "Kaltsas", position: "Attack", jerseyNumber: "44", imageUrl: RIPL },
            { id: 2, name: "Brigg", lastName: "LaBarbera", position: "Defense", jerseyNumber: "42", imageUrl: RIPL },
            { id: 3, name: "Brodie", lastName: "Semira", position: "Attack / Midfield", jerseyNumber: "11", imageUrl: RIPL },
            { id: 4, name: "Caden", lastName: "Thorpe", position: "Defense / LSM", jerseyNumber: "17", imageUrl: RIPL },
            { id: 5, name: "Colin", lastName: "Ostendorf", position: "Midfield", jerseyNumber: "10", imageUrl: RIPL },
            { id: 6, name: "Garrett", lastName: "Alstrin", position: "Midfield", jerseyNumber: "9", imageUrl: RIPL },
            { id: 7, name: "Henry", lastName: "Kurtzman", position: "Attack / Midfield", jerseyNumber: "5", imageUrl: RIPL },
            { id: 8, name: "Hudson", lastName: "Benoit", position: "LSM / Defense", jerseyNumber: "7", imageUrl: RIPL },
            { id: 9, name: "Jack", lastName: "Vincent", position: "SSDM", jerseyNumber: "24", imageUrl: RIPL },
            { id: 10, name: "Jack", lastName: "Schanaman", position: "Goalie", jerseyNumber: "21", imageUrl: RIPL },
            { id: 11, name: "Jack", lastName: "Adams", position: "LSM / SSDM / Defense", jerseyNumber: "6", imageUrl: RIPL },
            { id: 12, name: "Jordan", lastName: "Allen", position: "Midfield / Attack", jerseyNumber: "15", imageUrl: RIPL },
            { id: 13, name: "Lucas", lastName: "Gerten", position: "Midfield", jerseyNumber: "22", imageUrl: RIPL },
            { id: 14, name: "Nick", lastName: "Nugent", position: "Defense / LSM / SSDM", jerseyNumber: "8", imageUrl: RIPL },
            { id: 15, name: "Nick", lastName: "Colistra", position: "Attack", jerseyNumber: "51", imageUrl: RIPL },
            { id: 16, name: "Peter", lastName: "Wimberger", position: "Defense / LSM", jerseyNumber: "19", imageUrl: RIPL },
            { id: 17, name: "Philip", lastName: "Winkler", position: "Midfield / Attack", jerseyNumber: "3", imageUrl: RIPL },
            { id: 18, name: "Soren", lastName: "Reyes", position: "Midfield", jerseyNumber: "23", imageUrl: RIPL },
            { id: 19, name: "Tommy", lastName: "Winkler", position: "Attack", jerseyNumber: "2", imageUrl: RIPL },
            { id: 20, name: "Tommy", lastName: "Sander", position: "Midfield / FO", jerseyNumber: "4", imageUrl: RIPL },
            { id: 21, name: "Wesley", lastName: "Robbins", position: "Attack / Midfield", jerseyNumber: "25", imageUrl: RIPL },
        

          
          ,
        // Add more player data...
    ]);

     // Placeholder data for coaches (replace with actual data)
     const [coaches, setCoaches] = useState([
         { id: 1, name: "Chris", lastName: "Robbins", role: "Head Coach", imageUrl: RIPL },
         { id: 2, name: "Colin", lastName: "Winkler", role: "Assistant Coach", imageUrl: RIPL },
         // Add more coach data...
     ]);


    const [activeTab, setActiveTab] = useState('players'); // 'players' or 'coaches'

    // State for the player/coach profile modal
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null); // Holds data for the profile to display

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Implement logic to fetch/display players or coaches based on the tab
    };

    // Function to open the modal with selected profile data
    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
        setIsProfileModalOpen(true);
    };

    // Function to close the modal
    const toggleProfileModal = () => {
        setIsProfileModalOpen(!isProfileModalOpen);
        // Optional: Clear selectedProfile when closing the modal
        if (isProfileModalOpen) {
            setSelectedProfile(null);
        }
    };

    // Use useEffect to fetch real data when the component mounts or when tab changes
    // useEffect(() => {
    //    if (activeTab === 'players') {
    //      // Fetch players data
    //    } else {
    //      // Fetch coaches data
    //    }
    // }, [activeTab]); // Dependency array


    return (
        <div className="team-page-container">
            <Container>
                {/* Team Header Section */}
                <div className="team-header">
                    <Row className="align-items-center">
                        <Col md={7} xl={7} lg={7}>
                            <div className="team-logo-section">
                                <img src={RIPL} alt={teamData.name} className="team-logo" style={{borderRadius:"8px"}}/>
                                <div className="team-info">
                                    <h2 className="team-name">{teamData.name}</h2>
                                    <p className="team-counts">Players: <span className='coach-name-tag'>{teamData.playersCount}</span></p>
                                    <p className="team-counts">Coaches: <span className="coach-names">
                                         {teamData.coaches.map((coach, index) => (
                                             <span key={index} className="coach-name-tag">{coach}</span>
                                         ))}
                                     </span></p>
                                    {/* Display coach names or link to coaches list */}
                                     
                                </div>
                            </div>
                        </Col>
                        <Col md={5} xl={5} lg={5}>
                            <Row className="team-stats-row">
                                <Col>
                                    <div className="team-stats wins-box d-flex justify-content-center align-items-center flex-column">
                                        <div className="stat-label">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2m2.707 3.707a1 1 0 0 0-1.414-1.414L7 6.586 5.707 5.293a1 1 0 0 0-1.414 1.414L7 9.414l3.707-3.707Z"/>
                                             </svg>
                                             Wins
                                        </div>
                                        <div className="stat-value wins">{teamData.wins}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="team-stats losses-box d-flex justify-content-center align-items-center flex-column">
                                         <div className="stat-label">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m4.646-2.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                             </svg>
                                             Losses
                                        </div>
                                        <div className="stat-value losses">{teamData.losses}</div>
                                    </div>
                                </Col>
                                <Col>
    <div className="team-stats losses-box d-flex justify-content-center align-items-center flex-column">
        <div className="stat-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14.778 3.278a.5.5 0 0 1 0 .707l-4.5 4.5a.5.5 0 0 1-.707 0L7 5.914l-2.571 2.57a.5.5 0 0 1-.707-.707l3-3a.5.5 0 0 1 .707 0l2.571 2.57 4.147-4.146a.5.5 0 0 1 .707 0z"/>
                <path d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 1.5 1z"/>
            </svg>
            Tie
        </div>
        <div className="stat-value tie">{teamData.tie}</div>
    </div>
</Col>

                                
                            </Row>
                        </Col>
                    </Row>
                </div>

                {/* Tabs Section */}
                <div className="team-tabs mt-4">
                    <button
                        className={`tab-button ${activeTab === 'players' ? 'active' : ''}`}
                        onClick={() => handleTabChange('players')}
                    >
                        All Players ({teamData.playersCount})
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'coaches' ? 'active' : ''}`}
                        onClick={() => handleTabChange('coaches')}
                    >
                        All Coaches ({teamData.coachesCount})
                    </button>
                </div>

                {/* Content Area (Player Grid or Coach List) */}
                <div className="container tab-content mt-4">
                    {activeTab === 'players' && (
                        <div className="player-grid">
                            {players.map(player => (
                                <PlayerCard key={player.id} player={player} onCardClick={handleProfileClick} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'coaches' && (
                        <div className="coach-list">
                            {coaches.map(coach => (
                                <PlayerCard key={coach.id} player={{
                                    id: coach.id,
                                    name: coach.name,
                                    lastName: coach.lastName,
                                    position: coach.role,
                                    imageUrl: coach.imageUrl
                                }} onCardClick={handleProfileClick} />
                            ))}
                        </div>
                    )}
                </div>

            </Container>

            {/* Player/Coach Profile Modal */}
            <Modal isOpen={isProfileModalOpen} toggle={toggleProfileModal} centered size="md">
                <div className="profile-modal-content">
                     <button type="button" className="close-button-modal" onClick={toggleProfileModal}>
                       &times;
                   </button>
                    <div className="profile-modal-body">
                        {selectedProfile && (
                            <>
                                <h2 className="profile-modal-title">Player Profile</h2>
                                <div className="profile-modal-image-container">
                                    <img src={selectedProfile.imageUrl} alt={selectedProfile.name} className="profile-modal-image" />
                                </div>
                                <div className="profile-modal-details">
                                    <div className="detail-line">
                                        <span>Full Name:</span>
                                        <span>{selectedProfile.name || 'N/A'}</span>
                                    </div>
                                     <hr className="detail-separator" />
                                    <div className="detail-line">
                                        <span>Last Name:</span>
                                        <span>{selectedProfile.lastName || 'N/A'}</span>
                                    </div>
                                     <hr className="detail-separator" />
                                    <div className="detail-line">
                                        <span>Position:</span>
                                        <span>{selectedProfile.position || selectedProfile.role || 'N/A'}</span>
                                    </div>
                                     <hr className="detail-separator" />
                                    {selectedProfile.jerseyNumber !== undefined && selectedProfile.jerseyNumber !== null && (
                                        <div className="detail-line">
                                            <span>Jersey Number:</span>
                                            <span>{selectedProfile.jerseyNumber || 'N/A'}</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default TeamPage;
