import { useEffect, useState } from "react";
import "../../styles/display/gameTiles.css"

function TileItem({ image, handleTileClicked }) {

    const [imageUrl, setImageUrl] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    async function getImage(props) {
        fetch(formApi({image: props.image}), {mode: 'cors'})
            .then((response) => {
                if (response.status >= 400) 
                    throw new Error("server error");

                return response.json();
            })
            .then((response) => setImageUrl(processJsonPayload(response)))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function formApi(props) {
        return 'https://pokeapi.co/api/v2/pokemon/' + props.image;
    }
    
    function processJsonPayload(json) {
        const image = json.sprites.front_default
        return image;
    }

    useEffect(() => {
        if (imageUrl != null) return; // If image is already loaded, do nothing
        getImage({image: image.toLowerCase()});
    }, [])

    const handleClick = () => {
        handleTileClicked({image})
    }

    if (loading) return <button className="tile-button" onClick={handleClick}>
        <p>Loading...</p>
        <p>{image}</p>
    </button>
        
    if (error) return <button className="tile-button" onClick={handleClick}>
        <p>A network error was encountered</p>
        <p>{image}</p>
    </button>
    

    return <button className="tile-button" onClick={handleClick}>
        <div 
            className="single-tile" 
            style={{
                width: '100px',
                height: '100px',
                backgroundSize: 'cover',
                backgroundImage:`url(${imageUrl})` 
        }}>

        </div>
        <p>{image}</p>
    </button>
}

function Tiles({ images, handleScoreChange }) {

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (arr) => {
        const newArray = [...arr]; // Create a copy of the array to avoid mutating the state directly
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
        }
        return newArray;
    };

    const handleTileClicked = ({image}) => {
        const shuffledArray = shuffleArray(tileItems);
        setTileItems(shuffledArray);
        handleScoreChange(image)
    };

    const [tileItems, setTileItems] = useState(
            images.map((image) => {
                return <TileItem key={image} image={image} handleTileClicked={handleTileClicked}/>;
             })
        );

    return <div className="tiles">
        {tileItems}
    </div>
}



const GameTiles = ({ handleScoreChange }) => {

    var images = ['Ditto', 'Bulbasaur', 'Charmander', 'Squirtle', 'Pidgey', 'Pikachu', 'Vulpix', 'Diglett', 
        'Growlithe', 'Ponyta', 'Mewtwo', 'Mew']

    return (
        <div className="game-tiles-container">
            <Tiles images={images} handleScoreChange={handleScoreChange}/>
        </div>
    )
}

export { GameTiles }