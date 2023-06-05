import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
//import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';
import './VideoStyles.css'
import Tracker from '../assets/Tracker.jpg'
import spaceVideo from '../assets/space.mp4'
const Video = ({connect}) => {
  return (
    <div className="hero">
      <div>
        <video autoPlay loop muted id='video'>
            <source src={spaceVideo} type='video/mp4'/>
        </video>
      </div>
      <div className="banner" id="home">
      <Container >
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>D-Chain<br></br></h1>
                <h2>a <span>product</span> tracker</h2>
                  <p>Help you to locate the product at any time, including information on when and where and by whom the goods or product parts were obtained, manufactured, processed, stored, transported, used or disposed.</p>
                  <Button className="button" onClick={() => connect()}>Lets Connect</Button>{' '} {/*Metamask Connection*/}
              </div>}
            </TrackVisibility>
          </Col>
          {/* 
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={Tracker} alt="Tracker"/>
                </div>}
            </TrackVisibility>
          </Col>
          */}
        </Row>
      </Container>
      </div>
   </div>

  ) 
}

export default Video