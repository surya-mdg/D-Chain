import React, { useState } from 'react';
import { menu, dashboard, logout, payment, profile, withdraw, industry, donate } from '../assets';
import {TocRounded,AccountCircle,Logout} from  "@mui/icons-material";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { Link } from 'react-router-dom';


import { NavLink } from 'react-router-dom';
import  '../components/Sidebar.css'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick}) => {
    const [hover, setHover] = useState(false);
    const onHover = () => {
      {hover ? name : ""}
      setHover(true);
    };
  
    const onLeave = () => {
      setHover(false);
    };
  
    return (
      <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
          <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        ) : (
          <Tooltip title={name} placement='right-end' arrow>
            <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} onMouseEnter={onHover} onMouseLeave={onLeave}/>        
          </Tooltip>
          
        )}
      </div>
    )
  }

const Sidebar = ({children, account}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            imageUrl: dashboard
        },
        {
            path:"/details",
            name:"Details",
            imageUrl: industry
        },
        
        {
            path:"/profile",
            name:"Profile",
            imageUrl: profile
        },
        {
            path:"/",
            name:"Logout",
            imageUrl: logout
        }
      
    ]
    return (
        <div className="Sidebar">
          <div className="sidebarcontainer">
            <div style={{width: isOpen ? "200px" : "75px"}} className="sidebar">
                <div style={isOpen? {alignSelf: "flex-end"}:{alignSelf: "flex-center"} } className="menu_icons">
                        <TocRounded sx={{ fontSize: "35px", marginLeft: "5px" }} onClick={toggle}/>                        
                 </div>
                {
                    menuItem.map((item, index)=>(
                      <NavLink to={item.path} key={index} className="link" activeclassname="active">
                          <div className="items">
                          <Icon styles="w-[45px] h-[45px] bg-[#2c2f32]" imgUrl={item.imageUrl}/>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text"><h6 style={{marginBottom: "0"}}>{item.name}</h6></div>
                          </div>    
                        </NavLink>
                        )
                    )
                }
                <div style={{display: isOpen ? "block" : "none"}} className="addr">
                     <p>{account ? "Connected!" : ""}</p>  
                </div>
            </div>
          </div>
             <main className="body">{children}</main>
        </div>
    );
};

export default Sidebar;
