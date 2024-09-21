import { useState } from 'react';
import './App.css'
import { GameHeader } from './components/display/GameHeader'
import { GameTiles } from './components/display/GameTiles'

function App() {

  const [data, setData] = useState({
    currentScore: 0,
    bestScore: 0,
    previousSelections: new Set()
  });

  const handleScoreChange = (selection) => {
    setData((prevData) => {

      if (prevData.previousSelections.has(selection)) {
          const newBestScore = Math.max(prevData.currentScore, prevData.bestScore);
          return {
          bestScore: newBestScore,
          currentScore: 0,
          previousSelections: new Set() 
        };
      } else {
          const newScore = prevData.currentScore + 1;
          const newSelections = new Set(prevData.previousSelections);
          newSelections.add(selection);
    
          return {
            ...prevData,
            currentScore: newScore,
            previousSelections: newSelections
          };
      }

   });
  }

  return (
    <div className='app-container'>
      <GameHeader currentScore={data.currentScore} bestScore={data.bestScore}/>
      <GameTiles handleScoreChange={handleScoreChange}/>
    </div>
  )
}

export default App
