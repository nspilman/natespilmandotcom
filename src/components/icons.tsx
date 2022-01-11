import { Link } from "gatsby"
import React from "react"
import linkedInImg from "../assets/img/linkedin@2x.png"
import twitterImg from "../assets/img/twitter@2x.png"
import githubImg from "../assets/img/github@2x.png"
import instagramImg from "../assets/img/instagram@2x.png"
import * as styles from "./icons.css"

const Icons = () => (
  <div className={styles.iconContainer}>
    <div>
      <Link to="https://www.linkedin.com/in/natespilman/">
        <img className={styles.icon} src={linkedInImg} alt="linkedIn" />
      </Link>
    </div>
    <div>
      <Link to="https://github.com/nspilman">
        <img className={styles.icon} src={githubImg} alt="GitHub" />
      </Link>
    </div>
    <div>
      <Link to="https://twitter.com/Natetheperson">
        <img className={styles.icon} src={twitterImg} alt="Twitter" />
      </Link>
    </div>
    <div>
      <Link to="https://www.instagram.com/natespilman/">
        <img className={styles.icon} src={instagramImg} alt="Instagram" />
      </Link>
    </div>
  </div>
)

export default Icons
