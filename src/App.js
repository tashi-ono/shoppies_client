import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Results from "./components/Results/Results";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [response, setResponse] = useState("");

  const myAPIKey = process.env.REACT_APP_API_KEY;

  const getMovies = async (searchParam) => {
    try {
      let res = await axios.get(
        `http://www.omdbapi.com/?apikey=${myAPIKey}&s=${searchParam}&type=movie`
      );
      setMovies(res.data.Search);
      setResponse(res.data.Response);
    } catch (err) {
      console.error("Could not fetch movies: ", err);
    }
  };
  console.log("got movies", movies);

  const setUserInput = (input) => {
    // console.log("userInput", input);
    getMovies(input);
    setSearchParam(input);
  };

  return (
    <div className="App">
      <h1>Shoppies</h1>
      <h4>Welcome to the Shoppies Awards!</h4>
      <p>
        Nominate <b>5</b> of your favorite movies.
      </p>
      <SearchBar setUserInput={setUserInput} />
      <p> {response === "True" ? `Results for "${searchParam}"` : null}</p>
      <Results movies={movies} />
    </div>
  );
}

export default App;
