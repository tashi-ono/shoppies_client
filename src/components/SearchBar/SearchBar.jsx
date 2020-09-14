import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar = ({ setUserInput }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    // console.log("handle change", event.target.value);
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserInput(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-bar">Movie title</label>
      <i className="fas fa-search"></i>
      <input
        onChange={handleChange}
        type="search"
        placeholder="Search"
        aria-label="searchBar"
        value={input}
      />
    </form>
  );
};

export default SearchBar;
