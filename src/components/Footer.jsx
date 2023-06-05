import React from 'react'
import './FooterStyles.css'    
import {FaFacebook,FaTwitter,FaPhone,FaMailBulk,FaSearchLocation,FaInstagram} from 'react-icons/fa'   

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
         <div className="left">
            <div className="location">
                  <FaSearchLocation size={20} style={{color:"#ffffff",marginRight:"2rem"}}/>
                  <div>
                    <p>NIE South Campus</p>
                    <h4>Mysuru 570008</h4>
                  </div>
            </div>
            <div classNmae="phone">
                 <h4><FaPhone size={20} style={{color:"#ffffff",marginRight:"2rem"}}/><p>+91 94836 49837</p></h4>
            </div>
            <div className="email">
                <h4><FaMailBulk size={20} style={{color:"#ffffff",marginRight:"2rem"}}/>Dchain04@gmail.com</h4>
            </div>
         </div>
         <div className="right">
             <h4>About the Project</h4>
             <p>A Decentralized food tracking application built by 
              <br></br><b>Surya M D Gowda</b>
              <br></br><b>Ankith B Shetty</b>
              <br></br><b>Chiranth Krishna K</b></p>
              {/* 
             <div className="social">
               <FaFacebook size={30} style={{color:"#ffffff",marginRight:"1rem"}}/>
               <FaTwitter size={30} style={{color:"#ffffff",marginRight:"1rem"}}/>
               <FaInstagram size={30} style={{color:"#ffffff",marginRight:"1rem"}}/>
             </div>
             */}

         </div>
      </div>
    </div>
  )
}

export default Footer



