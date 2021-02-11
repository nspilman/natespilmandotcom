import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import linkedInImg from "../assets/img/linkedin@2x.png"
import twitterImg from "../assets/img/twitter@2x.png"
import githubImg from "../assets/img/github@2x.png"
import instagramImg from "../assets/img/instagram@2x.png"

const Icons = () => (
  <div className="icon-container">
  <div>
    <Link to="https://www.linkedin.com/in/natespilman/">
        <img className="icon" src={linkedInImg} alt="linkedIn"/>
    </Link>
  </div>
  <div>
      <Link to= "https://github.com/nspilman">
    <img className="icon" src={githubImg} alt="GitHub"/>
      </Link>
  </div>
  <div>
      <Link to= "https://twitter.com/Natetheperson">
    <img className="icon" src={twitterImg} alt="Twitter"/>
      </Link>
  </div>
  <div>
      <Link to= "https://www.instagram.com/natespilman/">
        <img className="icon" src={instagramImg} alt="Instagram"/>
      </Link>
  </div>
</div>
)

export default Icons
