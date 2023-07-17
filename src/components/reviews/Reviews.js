import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import style from './reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = '14b16a10583a3d9315723a356100e4ad';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}${movieId}/reviews?api_key=${API_KEY}`)

      .then(res => {
        setReviews(res.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div className={style.reviews}>
      {loading ? (
        <p>Loading reviews.....</p>
      ) : (
        <ul className={style.items}>
          {reviews &&
            reviews.map(review => (
              <li key={review.id} className={style.item}>
                <h2 className={style.author}>Author: {review.author}</h2>
                <p className={style.details}>{review.content}</p>
              </li>
            ))}
        </ul>
      )}
      {error && <p>There are no reviews to this movie.</p>}
    </div>
  );
};

export default Reviews;

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}${movieId}/credits?api_key=${API_KEY}`)
//       .then(res => setCast(res.data.cast))
//       .catch(error => setError(true));
//   }, [movieId]);
//   console.log(movieId);

//   return (
//     <div className={style.cast}>
//       <ul className={style.actors}>
//         {cast.map(actor => (
//           <li className={style.actor}  key={actor.cast_id}>
//             <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w154/${actor.profile_path}` : './error.png'} alt={actor.name} />
//             <h2 className={style.name}>{actor.name}</h2>
//             <h2 className={style.name}>Character: {actor.character}</h2>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
