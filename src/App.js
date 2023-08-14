import { useEffect, useState } from 'react'
import Table from './Table.js'
import Input from './Input.js'

import {configureAbly, useChannel} from "@ably-labs/react-hooks"

import './App.css';

function App() {
  configureAbly({key: process.env['REACT_APP_ABLY_AUTH_KEY']})
  const [gameState, setGameState] = useState([])
  const [channel] = useChannel("players", (state) => setGameState(state))
  const [selectedCard, setSelectedCard] = useState(null)
  console.log(selectedCard)

  useEffect(() => {
    console.log("Card selected!")
    channel.publish("players", {card: selectedCard})
  }, [selectedCard])

  console.log("GAME STATE")
  console.log(gameState)

  return (
    <div className="app">
      <Table selectedCard={selectedCard}>
      </Table>
      <Input
        displaySelectedCard={(num) => setSelectedCard(num)}
      />
    </div>
  );
}

export default App;
