import { useEffect, useState } from 'react'
import Table from './Table.js'
import Input from './Input.js'

import {configureAbly, useChannel} from "@ably-labs/react-hooks"

import './App.css';

function App() {
  configureAbly({key: process.env['REACT_APP_ABLY_AUTH_KEY']})
  const [cardState, setCardState] = useState([])
  const [playerState, setPlayerState] = useState([])
  const [playerChannel] = useChannel("players", (state) => setPlayerState(state.data))
  const [cardChannel] = useChannel("cards", (state) => setCardState(state.data))
  const [selectedCard, setSelectedCard] = useState(null)
  const [playerName, setPlayerName] = useState("A player approaches...")

  const playerNumber = 0

  // console.log(cardState)
  // console.log(playerState)

  const updateCurrentPlayerState = (name) => {
    const currentPlayersState = playerState
    currentPlayersState[playerNumber] = name
    playerChannel.publish("players", currentPlayersState)
  }

  useEffect(() => {
    updateCurrentPlayerState(playerName)
  }, [playerName])

  const updateCurrentCardState = (cardNumber) => {
    const currentCardState = cardState
    currentCardState[playerNumber] = cardNumber
    cardChannel.publish("cards", currentCardState)
  }

  useEffect(() => {
    updateCurrentCardState(selectedCard)
  }, [selectedCard])

  return (
    <div className="app">
      <Table selectedCard={selectedCard} names={playerState}>
      </Table>
      <Input
        displaySelectedCard={(num) => setSelectedCard(num)}
      />
    </div>
  );
}

export default App;
