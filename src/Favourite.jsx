import React, {useState, useEffect} from "react"
import "./MovieList.css"
import Card from "./Card.jsx"

function Favourite(){

    const favouriteMovie = JSON.parse(localStorage.getItem("favourites") || "[]" )
    
    return(
        <>

        <div className="movie_list">
           <h2 className="list_title">YOUR FAVOURITES </h2>
           <div className="list_cards">
                {
                    favouriteMovie.map(movie => (
                        <Card movie={movie} />
                    ))
                }
           </div>
        </div>
        </>
    )
}
export default Favourite