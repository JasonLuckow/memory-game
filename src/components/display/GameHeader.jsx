import "../../styles/display/gameHeader.css"

const GameHeader = ({ currentScore, bestScore }) => {
    return (
        <div className="header-container">
            <div className="left-container">
                <div className="game-name">Game Name</div>
                <div className="instructions">Instructions</div>
            </div>
            <div className="right-container">
                <div className="current-score">Current Score: {currentScore}</div>
                <div className="best-score">Best Score: {bestScore}</div>
            </div>
        </div>
    )
}

export { GameHeader }