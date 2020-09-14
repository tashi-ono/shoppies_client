import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import "./App.scss";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [response, setResponse] = useState("");

  const getMovies = async (searchInput) => {
    const myAPIKey = process.env.REACT_APP_API_KEY;
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
      <Header />
      <p className="app-paragraph">
        Nominate <span id="nominated-num">5</span> of your favorite movies.
      </p>
      <SearchBar setUserInput={setUserInput} />
      <MovieList
        movies={movies}
        response={response}
        searchParam={searchParam}
      />
      <Footer />
    </div>
  );
}

export default App;
