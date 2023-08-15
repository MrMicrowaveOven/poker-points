import { useEffect, useState } from 'react'
import Table from './Table.js'
import Input from './Input.js'

import {configureAbly, useChannel} from "@ably-labs/react-hooks"

import './App.css';

function App() {
  configureAbly({key: process.env['REACT_APP_ABLY_AUTH_KEY']})
  const emptyArray = Array.apply(null, Array(10)).map(function () {})
  const [cardState, setCardState] = useState(emptyArray)
  const [playerState, setPlayerState] = useState(emptyArray)
  const [playerChannel] = useChannel("players", (state) => setPlayerState(state.data))
  const [cardChannel] = useChannel("cards", (state) => setCardState(state.data))
  const [selectedCard, setSelectedCard] = useState(null)
  const [playerName, setPlayerName] = useState(null)
  const [playerNumber, setPlayerNumber] = useState(null)

  useEffect(() => {
    // Assign player number
    const numNulls = playerState.filter(n => !n).length
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
    // Get player name
    // const givenName = prompt("What's your name?")
    const givenName = "Benji"
    setPlayerName(givenName)
  }, [])

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

  const getPlayerStateView = () => {
    const playerStateView = [...playerState]
    for(let i = 0; i < playerNumber; i++) {
      playerStateView.push(playerStateView.shift())
    }
    return playerStateView
  }
  const playerStateView = getPlayerStateView()

  const getCardStateView = () => {
    const cardStateView = [...cardState]
    for(let i = 0; i < playerNumber; i++) {
      cardStateView.push(cardStateView.shift())
    }
    return cardStateView
  }
  const cardStateView = getCardStateView()

  return (
    <div className="app">
      <Table
        selectedCard={selectedCard}
        names={playerStateView}
        cards={cardStateView}
      >
      </Table>
      <Input
        displaySelectedCard={(num) => setSelectedCard(num)}
      />
    </div>
  );
}

export default App;