import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import logo from './logo.png'

const Logo = () => {
	return(
        <div className='ma4 mt0'>
          <Tilt className='Tilt br2 shadow-2 '>
            <img  alt='logo' src={logo}/>
         </Tilt>

        </div>
	);
}

export default Logo;