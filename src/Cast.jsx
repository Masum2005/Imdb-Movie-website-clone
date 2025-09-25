import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";

function Cast(){

    const {id} = useParams()
    const [casts, setCasts] = useState([])

    const getCasts = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => {
                  console.log(data.cast)
                  setCasts(data.cast.slice(0, 50)) // start with index 0 and get 50 total casts.
                })
    }

    useEffect(() => {
        getCasts()
    }, [id])




    return(
        <div className="container">
        <Swiper
          modules={[ Scrollbar ]}
          grabCursor={true}
          initialSlide={0}
          centeredSlides={false}
          slidesPerView={4}
          speed={800}
          spaceBetween={5}
          scrollbar={{draggable: true}}
          >
            {
                casts.map(cast => (
                    <SwiperSlide key={cast.id}>
                        <div className="cast_details">
                            <div className="cast_profile">
                                <img src={`https://image.tmdb.org/t/p/w200/${cast ? cast.profile_path : ""}`} />
                            </div>
                            <div className="cast_overlay">
                                <div className="cast_name">
                                    {cast?(cast.name):("N/A")}
                                </div>
                                <div className="cast_character">
                                  <i>as {cast.character}</i>
                                </div>
                            </div>  
                        </div>
                    </SwiperSlide>
                  ) 
                )
            }
          </Swiper>
        </div>
    )

}
export default Cast