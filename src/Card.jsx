import './Card.css'
import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {Link} from "react-router-dom"
import "./Cast.css"

function Card({movie}){

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() =>  {
            setIsLoading(false)
        }, 1500)
    }, [])

    return(
        <>
        {isLoading ? (
            <div className="cards">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
            </div> ) 
            :
            (
                 <Link to={`/movie/${movie.id}`} style={{textDecoration: "none", color: "white"}} >
                    <div className="cards">
                        <img className="card_img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:"N/A"}`} />
                        <div className="card_overlay">
                            <div className="card_title">
                                {movie?movie.title:"N/A"}
                            </div>
                            <div className="card_runtime">
                                {movie?movie.release_date:"N/A"}
                                <span className="card_rating">{movie?movie.vote_average.toFixed(2):"N/A"}⭐</span>
                                {/* <i class="fa-solid fa-star"></i>{" "} */}
                            </div>
                            <div className="card_description">{movie ? movie.overview.slice(0,118)+"...":"N/A"}</div>
                        </div>
                    </div>
                </Link>

                
            )}
        </>
    );

}
export default Card