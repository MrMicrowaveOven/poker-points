import { useState } from 'react'
import Card from './Card.js'
import Name from './Name.js'
import './Table.css';
import './cardsOnTable.css'

const Table = (props) => {
    const [revealed, reveal] = useState(false)
    return (
        <div className="table">
            <Names numPlayers={5}/>
            <button onClick={() => reveal(true)} className="reveal-button">Reveal!</button>
            <CardsOnTable
                revealed={revealed}
                selectedCard={props.selectedCard}
            />
        </div>
    )
}

const Names = (props) =>{
    return [...Array(10).keys()].map(num =>
        <Name
            index={num + 1}
            name={"Benji"}
        />
    )
}

const CardsOnTable = (props) => {
    return [...Array(10).keys()].map(num => {
        const ownCard = num === 0
        return (<div className={"card-on-table card-on-table" + (num + 1)}>
            <Card faceDown={!props.revealed} number={props.selectedCard} ownCard={ownCard} key={num}/>
        </div>)
    })
}

export default Table