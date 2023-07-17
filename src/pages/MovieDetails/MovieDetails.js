import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultPOster from '../../images/placeholder.jpg';

import style from './movieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  console.log(location.state);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = '14b16a10583a3d9315723a356100e4ad';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}${movieId}?api_key=${API_KEY}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div style={{ marginLeft: 10 }}>
      <Link to={location.state ? location.state.from : '/'}>
        <button type="button" className={style.back_btn}>Go back</button>
      </Link>

      {loading ? (
        <p>Loading reviews.....</p>
      ) : (
        <div className={style.movie}>
          <img
            className={style.image}
            src={movie.poster_path === null ? DefaultPOster : `https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={150}
          />
          <div style={{ marginLeft: 20 }}>
            <h2 className={style.movie_title}>
              {movie.title}{' '}
              {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
            </h2>
            <h3 className={style.details}>User score: {movie.vote_average}</h3>
            <h2 className={style.title}>Overview </h2>
            <h3 className={style.details}>{movie.overview}</h3>
            <h2 className={style.title}>Genres </h2>
            <h3 className={style.details}>
              {Array.isArray(movie.genres)
                ? movie.genres.map(genre => genre.name).join(', ')
                : null}
            </h3>
          </div>
        </div>
      )}
      {error && <p>Error occurred while fetching reviews.</p>}

      <h2 className={style.additional_title}>
        Additional information
      </h2>
      <ul className={style.link_list}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
