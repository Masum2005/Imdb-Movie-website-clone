import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css'
import {Link} from "react-router-dom"
import MovieList from './MovieList';

function Home(){

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
       .then(response => response.json())
       .then(data => {
        console.log(data.results)
        setPopularMovies(data.results)             
       } )
    }, [])

    return(
        <>
            <div className="poster">
                <Carousel 
                   showThumbs={false}
                   autoPlay={true}
                   interval={3000} //to go to new slide
                   transitionTime={1000} //to show animation
                   infiniteLoop={true}
                   showStatus={false}
                   key={popularMovies.length}
                >
                  {
                    popularMovies.map(movie => (
                        <Link style={{textDecoration:"none", color: "white"}} to={`/movie/${movie.id}`}>
                        <div className="posterImage">
                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>
                        </div>
                        <div className="posterImage_overlay">
                            <div className="posterImage_title">{movie ? movie.original_title : "N/A"}</div>
                            <div className="posterImage_runtime">
                                {movie ? movie.release_date : "N/A"}
                                <span className="posterImage_rating">
                                    {movie ? movie.vote_average : "N/A"}
                                    <i className="fas fa-star" /> {" "}
                                </span>
                            </div>
                            <div className="posterImage_description">
                                {movie ? movie.overview : "N/A"}
                            </div>
                        </div>
                        </Link>
                    ) )
                  }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}
export default Home