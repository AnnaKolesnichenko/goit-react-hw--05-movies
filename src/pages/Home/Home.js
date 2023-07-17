import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DefaultPoster from '../../images/default_poster.jpg';

import style from './home.module.css';

const Home = () => {
  //   const [trended, setTrended] = useState([]);
  const BASE_URL = 'https://api.themoviedb.org/3/trending/all/';
  const API_KEY = '14b16a10583a3d9315723a356100e4ad';
  const [trenderMovies, setTrendedMovies] = useState([]);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/week?api_key=${API_KEY}`)
      .then(({ data }) => setTrendedMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 className={style.title}>Trending today</h1>
      <ul className={style.trending_list}>
        {trenderMovies.map(movie =>
  
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={style.trending_item}
            >
              <img
                src={movie.poster_path === null ? DefaultPoster :`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3 className={style.movie_title}>{movie.title ? movie.title : <p>Be added soon...</p>}</h3>
            </Link>

        )}
      </ul>
    </div>
  );
};

export default Home;
