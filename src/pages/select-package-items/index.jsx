import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import imga from "../../assets/white.png"
// Import hooks or context to get the selected package data
// import { useSelector } from 'react-redux';

import PackageItem from '../../components/modules/PackageItems/index'; // Import the item component

import './index.css'; // We'll create this CSS file next

const SelectPackageItems = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation(); // Get state passed via navigate
  // Assuming package data is passed via navigation state
  const selectedPackage = locationState?.selectedPackage;

  // State to manage the list of items in this package
  // Initialize with items from the selectedPackage
  const [packageItems, setPackageItems] = useState(selectedPackage?.items || []);

  // State to track selected items by their ID
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // State to track selected variant details for each selected item
  // Structure: { itemId: { variantId: { selectedColor: '...', selectedSize: '...' } } }
  const [selectedVariantDetails, setSelectedVariantDetails] = useState({});


  // Effect to initialize selected items and variant details when packageItems changes
  useEffect(() => {
      const initialSelected = packageItems.map(item => item.id); // Select all items by default
      setSelectedItemIds(initialSelected);

       const initialVariantDetails = {};
       packageItems.forEach(item => {
           initialVariantDetails[item.id] = {}; // Initialize empty object for each item
           item.variants?.forEach(variant => {
               initialVariantDetails[item.id][variant.id] = { selectedColor: null, selectedSize: null }; // Initialize color/size
           });
       });
       setSelectedVariantDetails(initialVariantDetails);

  }, [packageItems]);


  // Calculate order summary (placeholder logic)
  const calculateOrderSummary = () => {
      let subtotal = 0;
      const numSelectedItems = selectedItemIds.length; // Count of selected main items
      const itemPrice = selectedPackage?.price || 0; // Assuming package price is per item or base price

      // Basic calculation: Subtotal = Number of selected items * (Package Price / Total items in package)
      // This is a simplified assumption; your actual pricing logic might be different
      const pricePerItemInPackage = packageItems.length > 0 ? (selectedPackage?.price || 0) / packageItems.length : 0;
      subtotal = numSelectedItems * pricePerItemInPackage;


      // Add logic here to adjust price based on selected variants if applicable
      // E.g., some variants might have different costs

      const shippingFee = 6.00; // Example fixed shipping fee
      const total = subtotal + shippingFee;

      return {
          subtotal: subtotal,
          shippingFee: shippingFee,
          total: total,
          numItems: numSelectedItems, // Number of items contributing to subtotal
      };
  };

  const orderSummary = calculateOrderSummary();


  // Handler for selecting/deselecting a main item
  const handleItemSelection = (itemId, isSelected) => {
      setSelectedItemIds(prevSelected =>
          isSelected ? [...prevSelected, itemId] : prevSelected.filter(id => id !== itemId)
      );
       // When an item is deselected, clear its variant selections if needed
       if (!isSelected) {
            setSelectedVariantDetails(prev => {
                const newState = { ...prev };
                 delete newState[itemId]; // Or clear variant details for the item
                 return newState;
            });
       } else {
           // When an item is selected, initialize variant selections
           const item = packageItems.find(item => item.id === itemId);
            if (item) {
                 setSelectedVariantDetails(prev => {
                     const newState = { ...prev, [itemId]: {} };
                     item.variants?.forEach(variant => {
                          newState[itemId][variant.id] = { selectedColor: null, selectedSize: null };
                      });
                     return newState;
                 });
            }
       }
  };

   // Handler for updating selected variant details from the PackageItem component
   const handleVariantSelection = (itemId, variantId, details) => {
       console.log(`Variant selected for Item ${itemId}, Variant ${variantId}:`, details);
       setSelectedVariantDetails(prev => ({
           ...prev,
           [itemId]: {
               ...prev[itemId],
                [variantId]: details,
           },
       }));
       // You might need to recalculate subtotal here if variant selection affects price
   };


  // Handler for deleting a package item
  const handleDeleteItem = (itemId) => {
      setPackageItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setSelectedItemIds(prevSelected => prevSelected.filter(id => id !== itemId)); // Also remove from selected
       setSelectedVariantDetails(prev => { // Remove variant details for the deleted item
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
       });
  };

   // Handler for the master "Select Items" checkbox
   const handleMasterSelectItems = (event) => {
       const isChecked = event.target.checked;
       if (isChecked) {
           const allItemIds = packageItems.map(item => item.id);
           setSelectedItemIds(allItemIds);
            // Also initialize all variant details
            const allVariantDetails = {};
             packageItems.forEach(item => {
                 allVariantDetails[item.id] = {};
                 item.variants?.forEach(variant => {
                      allVariantDetails[item.id][variant.id] = { selectedColor: null, selectedSize: null };
                  });
             });
            setSelectedVariantDetails(allVariantDetails);

       } else {
           setSelectedItemIds([]);
            setSelectedVariantDetails({}); // Clear all variant details
       }
   };

  // Handler for the master "Delete" button
  const handleMasterDeleteItems = () => {
      // Delete all selected items
      setPackageItems(prevItems => prevItems.filter(item => !selectedItemIds.includes(item.id)));
      setSelectedItemIds([]); // Clear selected items
      setSelectedVariantDetails({}); // Clear all variant details
  };

  // Handler for the "Purchase" button
  const handlePurchase = () => {
    console.log('Purchase button clicked!');
    console.log('Selected Items:', selectedItemIds);
    console.log('Selected Variant Details:', selectedVariantDetails);
    console.log('Order Summary:', orderSummary);
    // Implement your purchase logic here (e.g., send data to backend)
  };


  // Placeholder SVGs (replace with your actual icon components or SVG code)
   const DeleteIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6.5 1a.5.5 0 0 0-.5.5v1A.5.5 0 0 0 6 3h4a.5.5 0 0 0 .5-.5v-1A.5.5 0 0 0 10 1H6.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.5a.5.5 0 0 0 0 1h.5V15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3h.5a.5.5 0 0 0 0-1H11ZM4.118 3 4 3.059V15h8V3.059L11.882 3H4.118ZM2.5 4h11V15.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V4Z"/>
     </svg>
   );


  // Basic check if package data is available
//   if (!selectedPackage) {
//       return <div style={{color: 'white', padding: '20px'}}>No package selected. Please go back to the merchandise page.</div>;
//   }

  return (
    <div className="select-package-items-container"> {/* Main container */}
      {/* Header Section with Gradient */}
      <div className="profile-header-bg d-flex align-items-end">
          <div className='px-5'>
            <Row className="align-items-center">
              <Col xs="auto">
                <div onClick={() => navigate(-1)} className="d-flex align-items-center back-btn1">
                   <svg
                      className="me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="14"
                      viewBox="0 0 10 18"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                        fill="white"
                      />
                    </svg>
                  <h4>Back</h4>
                </div>
              </Col>
              <Col>
                <h2 className="profile-title text-white mb-0">Select Package Item</h2>
              </Col>
            </Row>
          </div>
        </div>

      {/* Main Content Area */}
      <Container className="mt-4">
         <Row>
            {/* Left Column: Item Selection */}
            <Col md={8} className="item-selection-col">
                <div className="item-selection-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                         {/* Master Checkbox */}
                         <input
                            type="checkbox"
                            className="master-checkbox"
                            checked={selectedItemIds.length === packageItems.length && packageItems.length > 0}
                            onChange={handleMasterSelectItems}
                         />
                        <span className="ms-2 select-items-text">Select Items</span>
                    </div>
                     {/* Master Delete Button */}
                    <button className="master-delete-button" onClick={handleMasterDeleteItems} disabled={selectedItemIds.length === 0}>
                        <DeleteIcon />
                         Delete
                    </button>
                </div>

                {/* List of Package Items */}
                <div className="package-items-list mt-3">
                <PackageItem
                                key="1"
                                item="1"
                                index="0"
                                isSelected="true"
                                onItemSelected="1"
                                
                                onVariantSelected={handleVariantSelection}
                            />
                    {packageItems.length > 0 ? (
                        packageItems.map((item, index) => (
                            <PackageItem
                                key={item.id}
                                item={item}
                                index={index}
                                isSelected={selectedItemIds.includes(item.id)}
                                onItemSelected={handleItemSelection}
                                onItemDelete={handleDeleteItem}
                                onVariantSelected={handleVariantSelection}
                            />
                        ))
                    ) : (
                       <p style={{color: '#bbb'}}>No items in this package.</p>
                    )}
                </div>
            </Col>

            {/* Right Column: Order Summary */}
            <Col md={4} className="order-summary-col">
                <div className="order-summary-card">
                    {/* Package Info in Summary */}
                    <div className="package-summary d-flex align-items-center mb-3">
                        {/* Package Image (placeholder) */}
                         <img src={imga} alt="name" className="package-summary-image me-3" /> {/* Replace imageUrl */}
                        <div className="flex-grow-1">
                            <div className="package-summary-title">Jersey</div> {/* Package Name */}
                            <div className="package-summary-qty-price">
                                {/* Display original quantity and price from package data */}
                                Qty: 1 | Price: $200
                                {/* Or maybe reflect the total quantity of selected items? */}
                                {/* Qty: {orderSummary.numItems} */}
                             </div>
                        </div>
                    </div>
                     {/* Separator line */}
                     <hr className="summary-separator" />

                    {/* Order Summary Details */}
                    <div className="order-summary-details">
                        <h1>Order Summary</h1>
                        <div className="summary-line d-flex justify-content-between">
                            <span>Subtotal (2 items)</span> {/* Display number of selected items */}
                            <span>$210</span>
                        </div>
                        <div className="summary-line d-flex justify-content-between">
                            <span>Shipping Fee</span>
                            <span>$25</span>
                        </div>
                        {/* Separator line */}
                         
                        <div className="summary-line total-line d-flex justify-content-between">
                            <span>Total</span>
                            <span>$235</span>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <button className="purchase-button mt-4" onClick={handlePurchase}>
                         Purchase
                    </button>
                </div>
            </Col>
         </Row>
      </Container>
    </div>
  );
};

export default SelectPackageItems;
