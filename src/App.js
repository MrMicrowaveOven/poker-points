import { useEffect, useState } from 'react'
import Table from './Table.js'
import Input from './Input.js'

import {configureAbly, useChannel} from "@ably-labs/react-hooks"

import './App.css';

function App() {
  configureAbly({key: process.env['REACT_APP_ABLY_AUTH_KEY']})
  const emptyArray = Array.apply(null, Array(10)).map(function () {})

  const [isHost, setIsHost] = useState(false)

  const [playerTable, setPlayerTable] = useState(emptyArray)
  const [cardTable, setCardTable] = useState(emptyArray)

  const [playerChannel] = useChannel("player", (state) => isHost && hostUpdatesPlayerTable(state.data))
  const [cardChannel] = useChannel("card", (state) => isHost && hostUpdatesCardTable(state.data))

  const [playerTableChannel] = useChannel("playerTable", (state) => {
    playerNumber === null && setPlayerNumber(getPlayerNumberByName(state.data))
    setPlayerTable(state.data)
  })
  const [cardTableChannel] = useChannel("cardTable", (state) => setCardTable(state.data))

  const [playerNumber, setPlayerNumber] = useState(null)
  const [playerName, setPlayerName] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    // See if host
    setIsHost(true)
    // Get player name
    const givenName = prompt("What's your name?")
    setPlayerName(givenName)
  }, [])

  useEffect(() => {
    if (isHost) {
      setPlayerNumber(0)
      hostUpdatesPlayerTable({name: playerName, id: 0})
    } else {
      playerChannel.publish("player", {name: playerName})
    }
  }, [playerName])

  useEffect(() => {
    cardChannel.publish("card", {id: playerNumber, card: selectedCard})
  }, [selectedCard])

  const hostUpdatesPlayerTable = ((data) => {
    console.log("UPDATING PLAYERS TABLE")
    let playerId = data.id
    if(playerId === undefined) {
      const numNulls = playerTable.filter(n => !n).length
      const rand = Math.floor(Math.random() * numNulls)
      let nullIndex = 0
      for(let i = 0; i < 10; i++) {
        if(playerTable[i]) continue
        if (nullIndex === rand) {
          playerId = i
          break
        } else {
          nullIndex++
        }
      }
    }
    const currentPlayerTable = playerTable
    currentPlayerTable[playerId] = data.name
    setPlayerTable(currentPlayerTable)
    playerTableChannel.publish("playerTable", currentPlayerTable)
  })

  const getPlayerNumberByName = (data) =>
    data.findIndex(player => player.name === playerName)

  const hostUpdatesCardTable = ((data) => {
    const playerNumber = data.id
    const cardNumber = data.card
    const currentCardTable = cardTable
    currentCardTable[playerNumber] = cardNumber
    setCardTable(currentCardTable)
    cardTableChannel.publish("cardTable", currentCardTable)
  })

  const getPlayerTableView = () => {
    const playerTableView = [...playerTable]
    for(let i = 0; i < playerNumber; i++) {
      playerTableView.push(playerTableView.shift())
    }
    return playerTableView
  }
  const playerTableView = getPlayerTableView()

  const getCardTableView = () => {
    const cardTableView = [...cardTable]
    for(let i = 0; i < playerNumber; i++) {
      cardTableView.push(cardTableView.shift())
    }
    return cardTableView
  }
  const cardTableView = getCardTableView()

  console.log("PLAYER NAME")
  console.log(playerName)
  console.log("PLAYER NUMBER")
  console.log(playerNumber)
  console.log("PLAYER Table")
  console.log(playerTable)
  console.log("Player STATE VIEW")
  console.log(playerTableView)
  // console.log("Card STATE")
  // console.log(cardState)
  // console.log("Card STATE VIEW")
  // console.log(cardTableView)

  return (
    <div className="app">
      <Table
        selectedCard={selectedCard}
        names={playerTableView}
        cards={cardTableView}
      >
      </Table>
      <Input
        displaySelectedCard={(num) => setSelectedCard(num)}
      />
    </div>
  );
}

export default App;