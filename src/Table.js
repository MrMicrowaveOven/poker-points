import { useState } from 'react'
import Card from './Card.js'
import Name from './Name.js'
import './Table.css';
import './cardsOnTable.css'

const Table = (props) => {
    const [revealed, reveal] = useState(false)
    
    const cardsOnTable = [...Array(10).keys()].map(num => {
        const ownCard = num === 0
        return (<div className={"card-on-table card-on-table" + (num + 1)}>
            <Card faceDown={!revealed} number={props.selectedCard} ownCard={ownCard} key={num}/>
        </div>)
    })

    const names = () =>
        [...Array(10).keys()].map(num =>
            <Name
                index={num + 1}
                name={"Benji"}
            />
        )

    return (
        <div className="table">
            {names()}
            <button onClick={() => reveal(true)} className="reveal-button">Reveal!</button>
            {cardsOnTable}
        </div>
    )
}

export default Table