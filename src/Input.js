import { useEffect, useState } from 'react';
import Card from './Card.js'

const Input = (props) => {
    const [selected, select] = useState(null)
    const CARD_NUMBERS = [1, 2, 3, 5, 8, 13]

    useEffect(() => {
        props.displaySelectedCard(selected)
    })

    return (
        <div className="input">
            {CARD_NUMBERS.map((num) =>
                <Card
                    clickable
                    key={num}
                    number={num}
                    select={num => select(num)}
                    selected={num === selected}
                />
            )}
        </div>
    )
}

export default Input;