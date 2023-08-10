import { useEffect, useState } from 'react';
import Card from './Card.js'

const Input = (props) => {
    const [selected, select] = useState(null)

    useEffect(() => {
        props.displaySelectedCard(selected)
    })

    return (
        <div className="input">
            {[1, 2, 3, 5, 8, 13].map((num) => {
                return  <Card
                            number={num}
                            select={num => select(num)}
                            selected={num === selected}
                        />
            })}
        </div>
    )
}

export default Input;