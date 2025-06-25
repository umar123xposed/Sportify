import React, { useState } from 'react';
import './index.css'; // We'll create this CSS file next
import ima from "../../../assets/white.png"

const PackageItem = ({
  item, // Object containing item details and variants
  index, // Index of the item in the list
  onItemSelected, // Callback when the main item checkbox is toggled
  onItemDelete, // Callback when the delete button is clicked
  onVariantSelected, // Callback when a color/size is selected for a variant
  isSelected, // Boolean from parent indicating if this item is selected
}) => {
  // State to control the dropdown (expanded/collapsed)
  const [isExpanded, setIsExpanded] = useState(false);

  // State to manage selected variant details for this item
  const [selectedVariantDetails, setSelectedVariantDetails] = useState({});

  // Toggle the dropdown state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle click on the main item checkbox
  const handleMainCheckboxChange = () => {
    if (onItemSelected) {
      onItemSelected(item.id, !isSelected); // Toggle selection state
    }
  };

  // Handle selecting a color for a specific variant
  const handleColorSelect = (variantId, color) => {
    setSelectedVariantDetails(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId],
        selectedColor: color,
        // Reset size when color changes if needed
        // selectedSize: null,
      },
    }));
    if (onVariantSelected) {
        onVariantSelected(item.id, variantId, { selectedColor: color, selectedSize: selectedVariantDetails[variantId]?.selectedSize });
    }
  };

  // Handle selecting a size for a specific variant
  const handleSizeSelect = (variantId, size) => {
     setSelectedVariantDetails(prev => ({
       ...prev,
       [variantId]: {
         ...prev[variantId],
         selectedSize: size,
       },
     }));
      if (onVariantSelected) {
        onVariantSelected(item.id, variantId, { selectedColor: selectedVariantDetails[variantId]?.selectedColor, selectedSize: size });
     }
  };

  // Handle delete button click
  const handleDeleteClick = () => {
      if (onItemDelete) {
          onItemDelete(item.id); // Pass item ID to parent for deletion
      }
  };


  // Placeholder SVGs (replace with your actual icon components or SVG code)
  const DeleteIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6.5 1a.5.5 0 0 0-.5.5v1A.5.5 0 0 0 6 3h4a.5.5 0 0 0 .5-.5v-1A.5.5 0 0 0 10 1H6.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.5a.5.5 0 0 0 0 1h.5V15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3h.5a.5.5 0 0 0 0-1H11ZM4.118 3 4 3.059V15h8V3.059L11.882 3H4.118ZM2.5 4h11V15.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V4Z"/>
     </svg>
  );

   const DropdownArrowIcon = ({ direction }) => (
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        className={`dropdown-arrow ${direction}`} // Use class for rotation
      >
       <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
     </svg>
   );


  return (
    <div className={`package-item-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Top section (always visible) */}
      <div className="item-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {/* Checkbox */}
          <input
            type="checkbox"
            className="item-checkbox"
            checked={isSelected}
            onChange={handleMainCheckboxChange}
          />
          {/* Item Title */}
          <span className="item-title ms-2">Jersey</span> {/* Use item name from data */}
        </div>

        <div className="d-flex align-items-center">
           {/* Delete Button (optional, based on design) */}
           {/* {item.canDelete && ( // Example condition if items can be deleted */}
              <button className="delete-item-button me-3" onClick={handleDeleteClick}>
                  <DeleteIcon />
                  Delete
              </button>
           {/* )} */}

          {/* Dropdown Arrow */}
          <div className="dropdown-arrow-container" onClick={toggleExpand}>
            <DropdownArrowIcon direction={isExpanded ? 'up' : 'down'} />
          </div>
        </div>
      </div>

      {/* Collapsible detailed content */}
      {isExpanded && (
        <div className="item-details-content mt-3">
          {/* Iterate over item variants */}
           {/* {item.variants && item.variants.length > 0 ? ( */}
              {/* item.variants.map(variant => ( */}
                 <div key="1" className="variant-details d-flex mb-4">
                     {/* Variant Image */}
                     <img
                         src={ima}
                         alt="item vairant image"
                         className="variant-image me-3"
                     />
                     {/* Variant Info and Options */}
                     <div className="variant-info flex-grow-1">
                         <div className="variant-description">description of an item</div> {/* Variant Description */}
                         {/* Color Options */}
                         {/* {variant.colors && variant.colors.length > 0 && ( */}
                             <div className="color-options d-flex align-items-center mt-2">
                                 <span className="option-label me-2">Color:</span>
                                  {/* {variant.colors.map(color => ( */}
                                      <div
                                          key="1"
                                        //   className={`color-circle me-2 ${selectedVariantDetails[variant?.id]?.selectedColor === color.value ? 'selected' : ''}`}
                                        //   style={{ backgroundColor: color.value }}
                                          onClick={() => handleColorSelect(variant.id, color.value)}
                                      ></div>
                                  {/* ))} */}
                             </div>
                         {/* )} */}
                          {/* Size Options */}
                         {/* {variant.sizes && variant.sizes.length > 0 && ( */}
                             <div className="size-options d-flex align-items-center mt-2">
                                 <span className="option-label me-2">Size:</span>
                                 {/* {variant.sizes.map(size => ( */}
                                     <div
                                         key="1"
                                        //  className={`size-box me-2 ${selectedVariantDetails[variant.id]?.selectedSize === size ? 'selected' : ''}`}
                                         onClick={() => handleSizeSelect(variant.id, size)}
                                     >
                                         24
                                     </div>
                                 {/* ))} */}
                             </div>
                         {/* )} */}
                     </div>
                 </div>
              {/* )) */}
           {/* ) : (
              <p style={{color: '#bbb', fontSize: '0.9rem'}}>No variants available for this item.</p> */}
           {/* )} */}
           {/* Horizontal line separator */}
            <hr className="item-separator" />
        </div>
      )}
    </div>
  );
};

export default PackageItem;
