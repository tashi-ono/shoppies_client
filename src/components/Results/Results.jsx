import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
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
      // setDisableButton(!disableButton);
    } catch (err) {
      console.error("Unable to add nominated movie", err);
    }
  };
  console.log("nominated movies", nominated);

  let displayResults = null;

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
              // className={`nominateButton ${disableButton ? "disabled" : null}`}
              disabled={nominated.length > 4}
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
    <div>
      <ul>{displayResults}</ul>
      {nominated.length === 5 ? (
        <Alert variant="success">You've reached your max nominations!</Alert>
      ) : null}
      <Nominations nominated={nominated} getNominatedList={getNominatedList} />
    </div>
  );
};

export default Results;
