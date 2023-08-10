import Card from './Card.js'
import './Table.css';

const Table = (props) => {

    return (
        <div>
            <div className="table">
                {props.children}
                <div className="card-on-table">
                    <Card number={props.selectedCard} />
                </div>
            </div>
        </div>
    )
}

export default Table