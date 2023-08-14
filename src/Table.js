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

    const playerApproaches = name => {
        const nameDisplay = name === "" ? name : "Player approaches..."
        const numEmptySeats = MAX_NUMBER_PLAYERS - numPlayers
        const randomSeatNumber = Math.floor(Math.random() * numEmptySeats)
        const oldPlayerNames = playerNames
        oldPlayerNames[randomSeatNumber] = nameDisplay
        setPlayerNames(oldPlayerNames)
    }

    const playerMakesChoice = (playerNumber, choice) => {
        const oldPlayerChoices = playerChoices
        oldPlayerChoices[playerNumber] = choice
        setPlayerChoices(oldPlayerChoices)
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
            key={num}
            index={num}
            name={
                // "a"
                props.playerNames[num]
            }
        />
    )

const CardsOnTable = (props) =>
    [...Array(10).keys()].map(num => {
        const ownCard = num === 0
        return (
            <div className={"card-on-table card-on-table" + num} key={num}>
                <Card
                    faceDown={!props.revealed}
                    number={props.selectedCard}
                    ownCard={ownCard}
                />
            </div>
        )
    })

export default Table