import { useEffect, useState } from "react";
import "../../styles/display/gameTiles.css"

function TileItem({ image, handleTileClicked }) {

    const [imageUrl, setImageUrl] = useState(image.toLowerCase());

    async function getImage(props) {
        const response = await fetch(formApi({image: props.image}), {mode: 'cors'});
        const json = await response.json();
        const imagePath = processJsonPayload(json);
        setImageUrl(imagePath)
    }

    function formApi(props) {
        return 'https://pokeapi.co/api/v2/pokemon/' + props.image;
    }
    
    function processJsonPayload(json) {
        const image = json.sprites.front_default
        return image;
    }

    useEffect(() => {
        getImage({image: imageUrl});
    }, [])

    const handleClick = () => {
        handleTileClicked({image})
    }


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
        {image}
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