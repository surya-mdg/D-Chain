import React from 'react'
import NavbarBootstrap from '../components/NavbarBootstrap'
import Video from '../components/Video'
import Footer from '../components/Footer'

const Home = ({connect}) => {
  return (
    <div>
        <NavbarBootstrap connect={connect}/>
        <Video  connect={connect}/>
        <Footer />
    </div>
  )
}

export default Home;