import React, {useState, useEffect} from "react"
import Card from "./Card.jsx";
import { useParams } from "react-router-dom";

function SearchMovie(){
    
    const {query} = useParams();
    const [movieList, setMovieList] = useState([])
    
    function getData(){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&&query=${query}`)
                .then(response => response.json())
                .then(data => {
                    if(data.results && data.results.length > 0){
                        console.log(data.results)
                      const sortedMovies = data.results
                      .filter(movie => movie.vote_count >= 20)
                      .sort((a,b) => b.vote_average - a.vote_average)
                      setMovieList(sortedMovies)
                    } else {
                        setMovieList([])
                    }
                      
                })
                
                
    }

    useEffect(() => {
         getData()
    }, [query])

    return(
        <div className="movie_list">
           <h2 className="list_title">Search result: {(query ? query : "Your Movie")} </h2>
           <div className="list_cards">
                {
                    movieList.map(movie => (
                        <Card movie={movie} />
                    ))
                }
           </div>
        </div>
    )
}
export default SearchMovie