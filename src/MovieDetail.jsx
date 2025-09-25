import React, {useState, useEffect} from 'react'
import "./MovieDetail.css"
// import Home from './Home.jsx'
// import MovieList from './MovieList.jsx'
import {useParams} from "react-router-dom"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Cast from './Cast.jsx'
import Trailer from './Trailer.jsx'


function MovieDetail(){
    const [currentMovieDetail, setCurrentMovieDetail] = useState()
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [like, setLike] = useState(false)

    useEffect(() => {
        getData()
        window.scrollTo(0, 0) // go to top left corner
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [id])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCurrentMovieDetail(data) // data is an object
            const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
            setLike(storedFav.some(m => m.id === data.id))
                      })
                    }

    function handleLike(){ 
        
        const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
        const movie = currentMovieDetail;

        const exists = storedFav.some(m => m.id === movie.id);
        let updated;

        if(exists){//to remove it
            updated = storedFav.filter(m => m.id !== movie.id)
            setLike(false)
        }else{//add it
            updated = [...storedFav, movie]
            setLike(true);
        }

        const data = localStorage.setItem("favourites", JSON.stringify(updated));
        console.log(data);
        }
    
    
    return (
        <div className="movie">
            <div className="movie_intro">
                <button className={`like_button ${like? "active" : ""}`} onClick={handleLike}>❤︎ Like</button>
                <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        {isLoading ? 
                        (<div className="movie_poster">
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                              <Skeleton width={300} height={450} style={{borderRadius: "10px"}} duration={2} />
                            </SkeletonTheme>
                        </div>)
                         :
                        <img className="movie_poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                        }
                        </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie_tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie_rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie_voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie_runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie_releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie_genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie_genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="trailer">
                  {currentMovieDetail?<Trailer className="trailer_video" id={currentMovieDetail.id}/>: "" }   
            </div>
            <div className="cast">
                <h2>Cast Details</h2>               
                 < Cast />
             </div>

            <div className="movie_links">
                <div className="movie_heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie_homeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {//open link in new tab = target blank
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie_imdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie_heading">Production companies</div>
            <div className="movie_production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie_productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}
//we passed props to Trailer component.although we could just use useParams.
export default MovieDetail