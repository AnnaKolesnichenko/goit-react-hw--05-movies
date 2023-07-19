import { Route, Routes } from 'react-router-dom';
import NonExisting from 'pages/NotExisting/NonExisting';
import Home from 'pages/Home/Home';
import Movies from 'pages/Movies/Movies';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Reviews from './Reviews/Reviews';
import Cast from './Сast/Cast';
import SharedLayout from 'components/SharedLayout/SharedLayout';

import './app.css';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}/>
          <Route path="movies" element={<Movies />}/>
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />}/>
            <Route path="reviews" element={<Reviews />}/>
          </Route>
          <Route path="*" element={<NonExisting />}/>
        </Route>
      </Routes>
    </div>
  );
};
