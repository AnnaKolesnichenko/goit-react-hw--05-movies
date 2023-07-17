import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeafaultPoster from '../../images/placeholder.jpg';

import style from './cast.module.css';


const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  console.log(location);

  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = '14b16a10583a3d9315723a356100e4ad';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}${movieId}/credits?api_key=${API_KEY}`)
      .then(res => {
        setCast(res.data.cast);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);
  console.log(movieId);

  return (

      <div className={style.cast}>
      {loading ? <p>Loading cast....</p> : (
        <ul className={style.actors}>
        {cast.map(actor => (
          <Link className={style.actor}  key={actor.cast_id}>
            <img className={style.image} src={actor.profile_path === null ? DeafaultPoster : `https://image.tmdb.org/t/p/w154/${actor.profile_path}` } alt={actor.name} />
            <div className={style.actor_descr}>
            <h2 className={style.name}>{actor.name}</h2>
            <h2 className={style.name}>Character: {actor.character}</h2>
            </div>
          </Link>
        ))}
      </ul>
      )}
      {error && <p>Error occurred while fetching reviews.</p>}
    </div>

  );
};

export default Cast;


