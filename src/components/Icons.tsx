import React from "react";
import Link from "next/link";

export const Icons = () => (
  <div className="icon-container">
    <div>
      <Link href="https://www.linkedin.com/in/natespilman/" target="_blank" rel="noopener noreferrer">
        <img className="icon" src={"/img/linkedin@2x.png"} alt="linkedIn" />
      </Link>
    </div>
    <div>
      <Link href="https://github.com/nspilman" target="_blank" rel="noopener noreferrer">
        <img className="icon" src={"/img/github@2x.png"} alt="GitHub" />
      </Link>
    </div>
    <div>
      <Link href="https://www.instagram.com/natespilman/" target="_blank" rel="noopener noreferrer">
        <img className="icon" src={"/img/instagram@2x.png"} alt="Instagram" />
      </Link>
    </div>
    <div>
      <Link href="https://bsky.app/profile/natespilman.com" target="_blank" rel="noopener noreferrer">
        <img className="icon" src={"/img/bluesky@2x.png"} alt="Bluesky" />
      </Link>
    </div>
  </div>
);
