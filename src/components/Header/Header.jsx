import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1600118726/Shoppies%20Assets/popcorn-cinema-clip-art_z1h8qu.png"
        alt="film-reel"
        width="200px"
      />
      <h1>
        {" "}
        <img
          className="trophy"
          src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1600118840/Shoppies%20Assets/trophy_azomkp.png"
          alt="trophy"
        />{" "}
        The Shoppies{" "}
        <img
          className="trophy"
          src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1600118840/Shoppies%20Assets/trophy_azomkp.png"
          alt="trophy"
        />
      </h1>
      <h4>Welcome to the Shoppies Awards!</h4>
    </div>
  );
};

export default Header;
