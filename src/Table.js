import { useState } from 'react'
import Card from './Card.js'
import Name from './Name.js'
import './Table.css';
import './cardsOnTable.css'

const Table = (props) => {
    const [revealed, reveal] = useState(false)
    const [playerNames, setPlayerNames] = useState([])
    const [playerChoices, setPlayerChoices] = useState([])
    const MAX_NUMBER_PLAYERS = 10

    const numPlayers = playerChoices.filter(Number).length
    const playerApproaches = (name) => {
        const nameDisplay = name == "" ? name : "Player approaches..."
        const numEmptySeats = MAX_NUMBER_PLAYERS - numPlayers
        const randomSeatNumber = Math.floor(Math.random() * numEmptySeats)
        playerNames[randomSeatNumber] = nameDisplay
    }
    return (
        <div className="table">
            <Names playerNames={playerNames}/>
            <CardsOnTable
                revealed={revealed}
                selectedCard={props.selectedCard}
            />
            <RevealButton reveal={() => reveal(true)}/>
        </div>
    )
}

const RevealButton = props =>
    <button onClick={() => props.reveal()} className="reveal-button">Reveal!</button>

const Names = (props) =>
    [...Array(10).keys()].map(num =>
        <Name
            index={num + 1}
            name={"Benji"}
        />
    )

const CardsOnTable = (props) => {
    return [...Array(10).keys()].map(num => {
        const ownCard = num === 0
        return (<div className={"card-on-table card-on-table" + (num + 1)}>
            <Card faceDown={!props.revealed} number={props.selectedCard} ownCard={ownCard} key={num}/>
        </div>)
    })
}

export default Table