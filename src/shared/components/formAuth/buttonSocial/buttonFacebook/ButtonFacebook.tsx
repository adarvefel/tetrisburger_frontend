// src/shared/ButtonFacebook.tsx
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import "./buttonFacebook.css";

export default function ButtonFacebook() {
  return (
    <FacebookLogin
      appId="2732021103669904" // id de feisbu 
      onSuccess={(response) => {
        console.log("Access Token de Facebook:", response.accessToken);
        console.log("Datos del usuario:", response);
      }}
      onFail={(error) => {
        console.error("Error login Facebook:", error);
      }}
      render={({ onClick }) => (
        <button className="buttonFacebook__button" onClick={onClick}>
          <FaFacebook size={22} />
        </button>
      )}
    />
  );
}




/*import React from 'react'
import { FaFacebook } from "react-icons/fa";
import "./buttonFacebook.css"

export default function ButtonFacebook() {
    return (
        <button className='buttonFacebook__button'> 
            <FaFacebook size={22}/>
        </button>
  )
}*/
