import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"

function App() {
  const [movies, setMovies] = useState([
    {
      title: "",
      genre: "",
      year: "",
    },
  ]);

  useEffect(() => {
    fetch("/movies")
      .then((res) => {
        if (res.ok) {
          return res.json();
          //console.log("movies:",res.json() )
        }
      })
      .then((jsonRes) => setMovies(jsonRes));
    //console.log("movies:", )
  });

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    year: "",
  });
  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setMovie((prevInput) => {
    //   return {
    //     ..prevInput,
    //     [name]:value
    //   };
    // });
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const addMovie = (e) => {
    e.preventDefault();
    const newMovie={
      title:movie.title,
      genre:movie.genre,
      year:movie.year
    }
    axios.post('/newmovie', newMovie)
  };

  const deleteMovie = (id) => {
    axios.delete('/deletemovie/'+ id)
  };

  return (
    <div className="App">
      <h1>Add Movie</h1>
      <form>
        <input
          onChange={handleChange}
          id="title"
          name="title"
          value={movie.title}
        ></input>
        <input
          onChange={handleChange}
          id="genre"
          name="genre"
          value={movie.genre}
        ></input>
        <input onChange={handleChange} id="year" name="year" value={movie.year}></input>
        <button onClick={addMovie}>Add movie</button>
      </form>

      <h1>Movies List</h1>
      {movies.map((movie) => {
        return (
          <div key={movie._id}>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <button onClick={()=>deleteMovie(movie._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
