import React, {useState, useEffect} from "react"

function Trailer({id, className}){

    const [video, setVideo] = useState(null);


    useEffect(() => {

        if(!id) return;

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(response => response.json())
        .then(data => {
            // const trailerList = data.results.filter((video) => video.type === "Trailer")
            console.log(data.results)
            let videoClip = data.results.find((object) => object.type === "Trailer" && object.site === "YouTube" ) 
            console.log(videoClip)
            if(!videoClip){
              videoClip = data.results.find((object) => object.type === "Teaser" && object.site === "YouTube" )
            }
            setVideo(videoClip || null)  //its an object
        }
        )


     },[id])



    return(
       
            <iframe
            className={className}
                src={`https://www.youtube.com/embed/${video?video.key:""}`}
                title={video?.name}
                frameBorder="0"
                allowFullScreen
                style={{borderRadius: "20px"}}
            >
            </iframe>
 
    )
}
export default Trailer
//React renders the JSX immediately, 
// so if you try to access video.name or video.key without checking, 
// it will throw an error.