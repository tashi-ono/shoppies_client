import React, { useState } from "react";
import axios from "axios";
import Nominations from "../Nominations/Nominations";

const Results = ({ response, movies }) => {
  const [nominated, setNominated] = useState([]);
  // const [disableButton, setDisableButton] = useState(false);

  const getNominatedList = async () => {
    try {
      let res = await axios.get(`http://localhost:3000/movies`);
      setNominated(res.data);
    } catch (err) {
      console.error("Couldn't get nominated list", err);
    }
  };
  // console.log("movies", movies);

  const addToNominated = async (nominatedMovie) => {
    // setNominated([...nominated, addMovie]);
    try {
      await axios.post(`http://localhost:3000/movies`, {
        ...nominatedMovie,
        isNominated: true,
      });
      getNominatedList();
    } catch (err) {
      console.error("Unable to add nominated movie", err);
    }
  };
  console.log("nominated movies", nominated);

  let displayResults;
  if (response === "True" && movies[0]) {
    displayResults = movies.map((movie, index) => {
      return (
        <li className="movie" key={index}>
          <span>{movie.Title}</span>
          {/* <img className="imgPoster" src={movie.Poster} alt="movie.Title" /> */}
          <span>({movie.Year})</span>
          <button
            disabled={nominated.length > 4}
            onClick={() => addToNominated(movie)}
          >
            Nominate
          </button>
        </li>
      );
    });
  } else if (movies === undefined) {
    displayResults = <p>No results found</p>;
  }

  return (
    <div>
      <ul>{displayResults}</ul>
      {nominated.length === 5 ? (
        <p>You've reached your max nominations!</p>
      ) : null}
      <Nominations nominated={nominated} getNominatedList={getNominatedList} />
    </div>
  );
};

export default Results;
