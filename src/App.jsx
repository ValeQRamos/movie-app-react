import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23442aca5a940bca4f679e9303e5a91e&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=23442aca5a940bca4f679e9303e5a91e&query="';

  const [movies, setMovies] = useState([]);
  const [moviesURL, setMoviesUrl] = useState(API_URL);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    const { data } = await axios(moviesURL);
    setMovies(data.results);
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(SEARCH_API + searchInput);
    setMoviesUrl(SEARCH_API + searchInput);
    setSearchInput("");
  };

  useEffect(() => {
    fetchData();
  }, [moviesURL]);

  return (
    <div>
      <header>
        <form id="form" type="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            id="search"
            className="search"
            placeholder="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </header>
      <main id="main">
        {movies.map((movie) => {
          const { title, vote_average, overview, poster_path, id } = movie;
          return (
            <div className="movie" key={id}>
              <img src={`${IMG_PATH}${poster_path}`} alt={title} />
              <div className="movie-info">
                <h3> {title} </h3>
                <span className={getClassByRate(vote_average)}>
                  {vote_average}
                </span>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                {overview}
              </div>
              `
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
