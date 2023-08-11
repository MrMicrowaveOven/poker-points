import { useState } from 'react'
import Card from './Card.js'
import './Table.css';
import './cardsOnTable.css'

const Table = (props) => {
    const [revealed, reveal] = useState(false)
    const cardsOnTable = [...Array(10).keys()].map(num => {
        const ownCard = num === 0
        return (<div className={"card-on-table card-on-table" + (num + 1)}>
            <Card faceDown={!revealed && !ownCard} number={props.selectedCard} ownCard={ownCard} key={num}/>
        </div>)
    })
    return (
        <div className="table">
            {props.children}
            {cardsOnTable}
        </div>
    )
}

export default Table