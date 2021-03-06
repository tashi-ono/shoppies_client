import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import apiUrl from "../../apiConfig";
import axios from "axios";
import Nominations from "../Nominations/Nominations";
import "./MovieList.scss";

const MovieList = ({ movies, response, searchParam }) => {
  const [nominated, setNominated] = useState([]);

  const getNominatedList = async () => {
    try {
      let res = await axios.get(`${apiUrl}/movies`);
      setNominated(res.data);
    } catch (err) {
      console.error("Couldn't get nominated list", err);
    }
  };
  // console.log("movies", movies);

  const addToNominated = async (nominatedMovie) => {
    try {
      await axios.post(`${apiUrl}/movies`, {
        ...nominatedMovie,
        isNominated: true,
      });
      getNominatedList();
    } catch (err) {
      console.error("Unable to add nominated movie", err);
    }
  };
  // console.log("nominated movies", nominated);

  let displayResults = null;

  let nominatedTitles = nominated.map((item) => item.Title);
  // console.log("nominatedTitles", nominatedTitles);

  if (movies === undefined) {
    displayResults = <p>No results found</p>;
  } else {
    if (movies[0]) {
      displayResults = movies.map((movie, index) => {
        return (
          <li className="movie" key={index}>
            <span>{movie.Title}</span>
            {/* <img className="imgPoster" src={movie.Poster} alt="movie.Title" /> */}
            <span>({movie.Year})</span>
            <button
              className="nominate-button"
              disabled={
                nominated.length > 4 || nominatedTitles.includes(movie.Title)
              }
              onClick={() => addToNominated(movie)}
            >
              Nominate
            </button>
          </li>
        );
      });
    }
  }
  return (
    <div className="all-movies-container">
      {nominated.length === 5 ? (
        <Alert className="alert" variant="success">
          You've reached your max nominations!
        </Alert>
      ) : null}
      <Nominations nominated={nominated} getNominatedList={getNominatedList} />
      <div className="results-container">
        <p className="results-paragraph">
          {response === "True"
            ? `Results for "${searchParam}"`
            : `Search Results`}
        </p>
        <ul>{displayResults}</ul>
        {/* {displayResults ? (
          <span>
            <button>Back</button>
            <button>Next</button>
          </span>
        ) : null} */}
      </div>
    </div>
  );
};

export default MovieList;
