import Card from './Card.js'
import './Table.css';
import './cardsOnTable.css'

const Table = (props) => {
    const cardsOnTable = [...Array(10).keys()].map(num =>
        (<div className={"card-on-table card-on-table" + (num + 1)}>
            <Card number={props.selectedCard} key={num}/>
        </div>)
    )
    return (
        <div>
            <div className="table">
                {props.children}
                {cardsOnTable}
            </div>
        </div>
    )
}

export default Table