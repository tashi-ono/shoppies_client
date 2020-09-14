import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import axios from "axios";
import "./App.scss";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [response, setResponse] = useState("");

  const myAPIKey = process.env.REACT_APP_API_KEY;

  const getMovies = async (searchInput) => {
    try {
      let res = await axios.get(
        `http://www.omdbapi.com/?apikey=${myAPIKey}&s=${searchInput}&type=movie`
      );
      setMovies(res.data.Search);
      setResponse(res.data.Response);
    } catch (err) {
      console.error("Could not fetch movies: ", err);
    }
  };
  // console.log("got movies", movies);

  const setUserInput = (input) => {
    // console.log("userInput", input);
    getMovies(input);
    setSearchParam(input);
  };

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <h4>Welcome to the Shoppies Awards!</h4>
      <p className="app-paragraph">
        Nominate <b>5</b> of your favorite movies.
      </p>
      <SearchBar setUserInput={setUserInput} />

      <MovieList
        movies={movies}
        response={response}
        searchParam={searchParam}
      />
    </div>
  );
}

export default App;
