import React from 'react';
import './index.css'

const Button = (props) => {

    const { nopadding, padding,  title,  backgroundColor, textColor, width, borderColor,  onClick , fontWeight } = props

    return (
        <button
        onClick={onClick ? onClick : () => { }}
       className='button-33'
       // className={`m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} `}
        style={{
            
            backgroundColor: backgroundColor ? backgroundColor : 'white',
            color: textColor ? textColor : 'black',
            //height: 52,
            padding:padding ? padding : 'auto',
            width: width ? width : 'auto',
            borderRadius: 100,
            border: borderColor ? '2px solid' : 'none',
            fontWeight: fontWeight ? fontWeight : 'normal',
            borderColor: borderColor,
           // boxShadow: '5px 5px 40px grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            whiteSpace: "nowrap",
            fontSize:'14px',
            lineHeight:'20px',
        }}>
        {
          title
        }
    </button>
    );
}


export default Button;