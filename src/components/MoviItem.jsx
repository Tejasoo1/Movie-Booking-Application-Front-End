/*
{
    "_id": "66b197a4f362360163dab5b3",
    "id": "1",
    "movie_name": "Dune2",
    "image_url": "https://4kwallpapers.com/images/wallpapers/dune-2-movie-poster-2732x2732-14717.jpg",
    "description": "In Dune, Paul Atreides joins forces with Chani and the Fremen to avenge his family's downfall. Faced with a pivotal decision, he balances love and duty to avert a catastrophic destiny.",
    "genre": "Action/Fantasy/Sci-Fi",
    "censor": "U/A",
    "director": "Denis Villeneuve",
    "cast": [
        "Timothée Chalamet",
        "Rebecca Ferguson",
        "Zendaya"
    ]
}
*/

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSelectedMovie } from './movieSlice';

function MoviItem({ movie, onSetMovie }) {
  console.log('MovieItem component');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleMovieDetails(movieObj) {
    // onSetMovie(movieObj);
    dispatch(updateSelectedMovie(movieObj));
    navigate('/moviedetails');
  }

  return (
    <div className="card" style={{ width: '20rem', height: '500px' }}>
      <img
        src={movie.image_url}
        className="card-img-top"
        style={{ height: '65%', cursor: 'pointer' }}
        alt={movie.movie_name}
        onClick={() => handleMovieDetails(movie)}
      />
      <div className="card-body">
        <h5 className="card-title text-xl font-bold">{movie.movie_name}</h5>
        <p className="card-text text-lg font-semibold text-gray-500">
          {movie.genre}
        </p>
      </div>
    </div>
  );
}

export default MoviItem;
