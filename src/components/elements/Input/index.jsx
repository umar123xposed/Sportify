import React from 'react';
import { AiFillEye } from 'react-icons/ai';


const Input = (props) => {

    const {  type, field  ,id , placeholder , textColor, fontSize , fontWeight , padding , fontFamily, margin} = props

    return (
        
        <div className='d-flex justify-content-between' style={{backgroundColor: '#EDF5F3', borderRadius:'30px', padding: padding && padding , margin:margin && margin  }}>
          
          <input 
          {...field}
          placeholder={placeholder} 
          type={type} 
         // {...feild} 
          id={id} 
          //  className={`m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} `}
        style={{
            width:'100%',
            color: textColor ? textColor : 'black',
            fontWeight: fontWeight ? fontWeight : 'normal',
            fontSize:fontSize ? fontSize : 40,
            border:'none',
            backgroundColor:'transparent',
            lineHeight:'20px',
            fontFamily:fontFamily ? fontFamily : 'sans-serif'
        }} 
        />
        {type == 'Password' && <AiFillEye size={20} color={textColor} /> } 

          

        </div>
        
          
    );
}

export default Input;