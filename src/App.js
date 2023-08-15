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
  const [playerName, setPlayerName] = useState(null)
  const [playerNumber, setPlayerNumber] = useState(null)

  console.log(playerState)
  console.log(cardState)

  useEffect(() => {
    assignPlayerNumber()
  }, [])

  const assignPlayerNumber = () => {
    const numNulls = 10 - playerState.filter(String).length
    const rand = Math.floor(Math.random() * numNulls)
    let nullIndex = 0

    for(let i = 0; i < 10; i++) {
      if(playerState[i]) continue
      if (nullIndex === rand) {
        setPlayerNumber(i)
        break
      } else {
        nullIndex++
      }
    }
  }

  const updateCurrentPlayerState = (name) => {
    const currentPlayerState = playerState
    currentPlayerState[playerNumber] = name
    playerChannel.publish("players", currentPlayerState)
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
