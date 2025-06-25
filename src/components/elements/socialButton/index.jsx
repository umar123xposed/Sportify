import React from 'react';


const SocialButton = (  props) => {

    const { backgroundColor , padding , width , height , icon , margin , onClick} = props

    return (
        <div
        onClick={onClick ? onClick : () => { }}
      //  className={`m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} `}
        style={{
            backgroundColor: backgroundColor ? backgroundColor : 'black',
            height: height ? height : '50px',
            borderRadius: 100,
            width: width ? width : '50px',
            padding:padding ? padding : '10px',
            margin:margin ? margin : '0',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
             
        }}>
        {
          icon
        }
       </div>
    );
}

export default SocialButton;