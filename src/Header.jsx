import React, {useState, useEffect} from 'react'
import './Header.css'
import {Link, useNavigate} from "react-router-dom"

function Header(){

    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const[index, setIndex] = useState(-1);

    useEffect(() => {
        if(query.trim() !== 0){
           fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&&query=${query}`)
                .then(response => response.json())
                .then(data => {
                      console.log(data.results)
                      const sortedMovies = data.results
                      .filter(movie => movie.title.toLowerCase().startsWith(query.toLocaleLowerCase()))
                      .sort((a, b) => b.popularity - a.popularity)
                      setSuggestions(sortedMovies.slice(0, 10))})
                    }
                 },[query])
 
    function handleChange(event){
        setQuery(event.target.value);
    }


    function handleSearch(){
        if(query.trim() != ""){
        navigate(`/search/${query}`);
        setQuery("")
                 }
     }
     
     function openPage(id){
        navigate(`/movie/${id}`)
        setQuery("");
     }

     function handleKey(event){
        if(event.key === "Enter"){
            if(index < 0) {handleSearch()}
            else{
                openPage(suggestions[index].id)
                setIndex(-1)
            }
            }
        else if( event.key === "ArrowDown" && index < suggestions.length - 1){
            console.log(suggestions.length)
            setIndex( i => i + 1)
        }
        else if( event.key === "ArrowUp" && index >= 0){
           setIndex( i => i - 1)
        }
     }
    


    return(
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header_icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/favourite" style={{textDecoration: "none"}}><span>Favourite</span></Link>
                <div className="search_box">
                  <input 
                    className="search_input"
                    type="text"
                    placeholder="Enter a movie..."
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    />
                    
                    <button className="search_button" onClick={handleSearch}>
                    <i class="fas fa-search"></i>
                    </button>

                    <div className="dropdown_content">
                        {suggestions.length > 0 && (
                         suggestions.map( (movie, i) => (
                            <div className={`dropdown_item ${i === index ? 'active': ''}`} key={movie.id} onClick={() => openPage(movie.id)}>
                                <span>{movie?.title}</span>  
                                <span>{movie.release_date?.slice(0, 4)}</span>
                            </div>
                         ))
                    
                        )}
                    </div>
                    
                </div>
                
             </div>
        </div>
    )
}
export default Header



// Notice the curly braces {} inside the map.
//  In arrow functions, using {} requires a return. 
// Otherwise, nothing is returned → nothing is rendered.