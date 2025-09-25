import React, {useState, useEffect} from "react"
import Card from "./Card.jsx"
import "./MovieList.css"
import {useParams} from "react-router-dom"

function MovieList(){

    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [type])

    // useEffect(() => {
    //     getData()
    // }, [])

    

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            setMovieList(data.results) 
                      })
                    }
    return (
        <>
        <div className="movie_list">
           <h2 className="list_title"> {(type ? type : "POPULAR").toUpperCase().replace(/_/g, " ")} </h2>
           <div className="list_cards">
                {
                    movieList.map(movie => (
                        <Card movie={movie} />
                    ))
                }
           </div>
        </div>
        </>
    )
                    
}
//use curly braces outisde map method in return code.
export default MovieList