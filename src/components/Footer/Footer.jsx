import React from "react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <p>
        Copyright &copy; {currentYear} NSCoen | Background by{" "}
        <a href="https://unsplash.com/@ninjason?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Jason Leung
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/confetti?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </div>
  );
};

export default Footer;
