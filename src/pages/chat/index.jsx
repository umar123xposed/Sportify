import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import { FaArrowLeft, FaCamera, FaPaperclip, FaTimesCircle } from 'react-icons/fa'; // Assuming these icons are available or can be added
import { useNavigate } from 'react-router-dom';
import dummy from "../../assets/dummyprofile.png"

import './index.css';

// Dummy data for message list and chat messages
const messageList = [
  { id: 1, name: 'Ethan Lopez', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 2, name: 'Maya Chen', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 3, name: 'Ava Patel', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 4, name: 'Leo Fernandez', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 5, name: 'Ava Patel', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 1, name: 'Ethan Lopez', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 2, name: 'Maya Chen', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 3, name: 'Ava Patel', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 4, name: 'Leo Fernandez', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },
  { id: 5, name: 'Ava Patel', lastMessage: 'Hey! I was just thinking about.....', avatar: dummy },

];

const chatMessages = [
  { id: 1, type: 'sent', text: 'That\'s Good price! Can I pick it up today?', time: '6:00 PM' },
  { id: 2, type: 'received', text: 'Yes! Absolutely, let me arrange a meeting spot for us.', time: '6:01 PM', avatar: dummy },
  { id: 3, type: 'sent', text: 'That\'s Good price! Can I pick it up today?', time: '6:00 PM' },
  { id: 4, type: 'received', text: 'Yes! Absolutely, let me arrange a meeting spot for us.', time: '6:01 PM', avatar: dummy },
  { id: 1, type: 'sent', text: 'That\'s Good price! Can I pick it up today?', time: '6:00 PM' },
  { id: 2, type: 'received', text: 'Yes! Absolutely, let me arrange a meeting spot for us.', time: '6:01 PM', avatar: dummy },
  { id: 3, type: 'sent', text: 'That\'s Good price! Can I pick it up today?', time: '6:00 PM' },
  { id: 4, type: 'received', text: 'Yes! Absolutely, let me arrange a meeting spot for us.', time: '6:01 PM', avatar: dummy },
  
];

export default function FanclubMessages() {
  useEffect(() => {
    // Disable scroll when component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for the hidden file input
  const [activeChat, setActiveChat] = useState(messageList[0]); // Default to first chat
  const [showChatArea, setShowChatArea] = useState(false); // State to control chat area visibility on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to track mobile screen size
  const [imagePreview, setImagePreview] = useState([]); 
  const [inputValue, setInputValue] = useState(''); // New state for input field value

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatClick = (msg) => {
    setActiveChat(msg);
    if (isMobile) {
      setShowChatArea(true);
    }
  };

  const handleBackToMessages = () => {
    if (isMobile) {
      setShowChatArea(false);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden file input
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files; // Get all selected files
    if (selectedFiles) {
      const newImages = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file.type.startsWith('image/')) {
          if (imagePreview.length + newImages.length < 5) { // Check limit before adding
            newImages.push(URL.createObjectURL(file));
          } else {
            alert("You can only upload a maximum of 5 images.");
            break; 
          }
        } else {
          alert("Please select only image files.");
          break; 
        }
      }
      setImagePreview([...imagePreview, ...newImages]); // Add new images to existing ones
    }
    event.target.value = null; // Clear the input so same file can be selected again
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagePreview(imagePreview.filter((_, index) => index !== indexToRemove));
  };

  const handleSendMessage = () => {
    if (inputValue.trim() || imagePreview.length > 0) {
      console.log("Sending message:", inputValue);
      console.log("Sending images:", imagePreview);
      // Implement actual send logic here
      setInputValue(''); // Clear input after sending
      setImagePreview([]); // Clear image preview array after sending
    } else {
      alert("Please type a message or select at least one image to send.");
    }
  };

  return (
    <div className="messages-page-wrapper">
      <div className="back-button-gradient">
        <Button className="back-button-custom" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back
        </Button>
      </div>
      <Container fluid className="messages-container">
        <Row className={isMobile && showChatArea ? 'chat-active' : ''}> {/* Add class for mobile chat view */}
          {/* Left Sidebar - Message List */}
          <Col md="4" className="messages-sidebar">
            <h2 className="sidebar-title ms-4">Messages</h2>
            <div className="search-bar-container">
              <div className="search-icon"><svg width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6126 17.3536L20.6926 20.4336M19.7196 11.9336C19.7196 13.9227 18.9294 15.8304 17.5229 17.2369C16.1164 18.6434 14.2087 19.4336 12.2196 19.4336C10.2305 19.4336 8.32283 18.6434 6.9163 17.2369C5.50978 15.8304 4.7196 13.9227 4.7196 11.9336C4.7196 9.94447 5.50978 8.03682 6.9163 6.63029C8.32283 5.22377 10.2305 4.43359 12.2196 4.43359C14.2087 4.43359 16.1164 5.22377 17.5229 6.63029C18.9294 8.03682 19.7196 9.94447 19.7196 11.9336Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </div>
              <Input type="text" placeholder="Search" className="search-input" />
            </div>
            <div className="message-list">
              {messageList.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-list-item ${activeChat.id === msg.id ? 'active' : ''}`}
                  onClick={() => handleChatClick(msg)}
                >
                  <img src={msg.avatar} alt={msg.name} className="message-avatar" />
                  <div className="message-info">
                    <p className="message-name">{msg.name}</p>
                    <p className="message-last-text">{msg.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Right Section - Chat Area */}
          <Col md="8" className="chat-area px-0">
            {activeChat && (
              <>
                <div className="chat-header">
                  {isMobile && showChatArea && ( // Conditional Back button for mobile
                    <Button className="back-to-messages-btn" onClick={handleBackToMessages}>
                      <FaArrowLeft />
                    </Button>
                  )}
                  <img src={dummy} alt={activeChat.name} className="chat-header-avatar " />
                  <div className="chat-header-info">
                    <p className="chat-header-name">{activeChat.name}</p>
                    <p className="chat-header-status">Typing....</p>
                  </div>
                </div>

                <div className="chat-messages-display">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`message-bubble-wrapper ${msg.type}`}>
                      {msg.type === 'received' && (
                        <img src={msg.avatar} alt="Avatar" className="message-avatar" />
                      )}
                      <div className="message-content">
                        <span className="message-time">{msg.time}</span>
                        <div className="message-text-bubble">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-input-area">
                  <img src={dummy} alt="Your Avatar" className="message-avatar" />
                  <div className="message-input-wrapper">
                    {imagePreview.length > 0 && ( 
                      <div className="attached-images-display">
                        {imagePreview.map((imageSrc, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={imageSrc} alt={`Selected Preview ${index}`} className="input-image-preview" />
                            <FaTimesCircle className="remove-input-image-icon" onClick={() => handleRemoveImage(index)} />
                          </div>
                        ))}
                      </div>
                    )}
                    <Input // Always render the input field
                      type="text"
                      placeholder={imagePreview.length > 0 ? "Add a caption..." : "write something here..."} // Change placeholder if image present
                      className="message-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      style={{color:"white"}}
                    />
                    <div className="input-icons">
                      
                      <FaPaperclip className="input-icon" onClick={handleAttachmentClick} />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple // Allow multiple file selection
                    />
                  </div>
                  <Button className="send-button" onClick={handleSendMessage}>Send</Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}