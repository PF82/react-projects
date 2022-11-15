import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  // set up two users; one for the container and another one for the links
  const linksContainerRef = useRef(null); // for the div
  const linksRef = useRef(null); // for the ul

  // everytime the showLinks changes, run the useEffect
  useEffect(() => {
    // callback funtion to check the height for the links and to use it to
    // adjust the height of the linksContainer
    const linksHeight = linksRef.current.getBoundingClientRect().height;
   
    // console.log(linksHeight);
    // console.log(linksContainerRef.current.getBoundingClientRect());
    // console.log(linksRef.current.getBoundingClientRect());
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = `0px`
    }
  }, [showLinks])

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt="logo" />
          <button className='nav-toggle'>
            {/* ! it checks if the value is true or false */}
            <FaBars onClick={() => setShowLinks(!showLinks)} />
          </button>
        </div>

        <div
          // className={`${showLinks ? 'links-container show-container' 
          // : 'links-container'}`}
          className='links-container' ref={linksContainerRef}
        >
          <ul className='links' ref={linksRef}>
            {/* 
            <li>
              <a href="#">home</a>
            </li>
            <li>
              <a href="#">about</a>
            </li>
            <li>
              <a href="#">projects</a>
            </li>
            <li>
              <a href="#">products</a>
            </li> 
            */}

            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {/* 
          <li>
            <a href="https://www.twitter.com">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com">
              <FaTwitter />
            </a>
          </li> 
          */}

          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
