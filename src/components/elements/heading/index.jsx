import React from 'react';


const Heading = (props) => {

    const { title, textColor, fontSize , fontWeight , padding , fontFamily} = props

    return (
        <h1
        
      //  className={`m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} `}
        style={{
            color: textColor ? textColor : 'black',
            fontWeight: fontWeight ? fontWeight : 'normal',
            fontSize:fontSize ? fontSize : 40,
            lineHeight:'20px',
            padding:padding ? padding : '0',
            fontFamily:fontFamily ? fontFamily : 'sans-serif'
        }}>
        {
          title
        }
    </h1>
    );
}

export default Heading;