import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Home from './Home.jsx'
import MovieList from "./MovieList.jsx";
import './App.css'
import 'react-loading-skeleton/dist/skeleton.css';
import MovieDetail from "./MovieDetail.jsx";
import SearchMovie from "./SearchMovie.jsx";
import Favourite from "./Favourite.jsx";

function App19(){
return(
    <div className="App">
        <Header />
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/movie/:id" element={<MovieDetail />}></Route>
                <Route path="/movies/:type" element={<MovieList/>}></Route>
                <Route path="/search/:query" element={<SearchMovie/>}></Route>
                <Route path="/favourite" element={<Favourite/>}></Route>
                <Route path="/*" element={<h1 style={{color: "white"}}>Error Page</h1>}></Route>
            </Routes>
    </div>
);
}

export default App19