import { useState,useEffect } from 'react';
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [favorites, setFavorites] = useState([]); // Stores the list of favorite movies
  const [currentMovie, setCurrentMovie] = useState(null); // Stores the currently displayed movie
  const [banList, setBanList] = useState([]); // Stores the list of banned movie IDs
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomMovie = async () => {
    setIsLoading(true);
    try {
      const page = Math.floor(Math.random() * 500) + 1;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_KEY}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      const newMovie = data.results[Math.floor(Math.random() * data.results.length)];
      
      // Set the new movie if it's not already in the favorites or banned
      if (!favorites.some(fav => fav.id === newMovie.id) && !banList.includes(newMovie.id)) {
        setFavorites([...favorites, newMovie]);
        setCurrentMovie(newMovie);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
    setIsLoading(false);
  };

  const banMovie = () => {
    if (currentMovie) {
      setBanList(oldBanList => [...oldBanList, currentMovie]); // Store the entire movie object
      setFavorites(oldFavorites => oldFavorites.filter(movie => movie.id !== currentMovie.id));
      setCurrentMovie(null); // Optionally fetch a new movie here if desired
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []); // Fetch a random movie on mount

  return (
    <div className="app-container">
      <div className="favourite-container">
        <h2>My Movie List:</h2>
        {favorites.map(movie => (
          <div key={movie.id} className="favorite-movie">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div>{movie.title}</div>
          </div>
        ))}
      </div>
      <div className="main-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : currentMovie ? (
          <div>
            <h1>Movie Time!</h1>
            <img src={`https://image.tmdb.org/t/p/w200${currentMovie.poster_path}`} alt={currentMovie.title} />
            <h2>{currentMovie.title}</h2>
            <button>Title: {currentMovie.title}</button>
          <button>Vote Average: {currentMovie.vote_average}</button>
          <button>Release Date: {currentMovie.release_date}</button>
            <button onClick={banMovie}>Ban This Movie</button>
          </div>
        ) : (
          <p>No movie to display</p>
        )}
        <button onClick={fetchRandomMovie} disabled={isLoading}>Discover New Movie</button>
      </div>
      <div className="banlist-container">
  <h2>Ban List</h2>
  {banList.map((bannedMovie) => (
    <div key={bannedMovie.id} className="banned-movie">
      <span>Banned Movie: {bannedMovie.title}</span>
      <img src={`https://image.tmdb.org/t/p/w200${bannedMovie.poster_path}`} alt={`Banned: ${bannedMovie.title}`} />
    </div>
  ))}
</div>
    </div>
  );
}


export default App
