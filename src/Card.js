import one from './cards/ac.webp'
import two from './cards/2c.webp'
import three from './cards/3c.webp'
import five from './cards/5c.webp'
import eight from './cards/8c.webp'
import king from './cards/kc.webp'
import faceDownCard from './cards/faceDown.jpeg'

const Card = (props) => {
    const {number, select, faceDown, ownCard} = props
    const cardMap = [
        null,
        one,
        two,
        three,
        null,
        five,
        null, null,
        eight,
        null,null,null,null,
        king
    ]
    let className = "card"
    if (props.selected) className += " card-selected"
    if (ownCard) className += " own-card"
    return (
        <div>
        {number &&
            (faceDown
                ?
                    <div>
                        <img
                            className={className + (ownCard ? " top-half" : "")}
                            onClick={() => select(number)}
                            src={faceDownCard}
                            alt="playing card"
                        />
                        {ownCard &&
                            <img
                                className={className + " bottom-half"}
                                onClick={() => select(number)}
                                src={cardMap[number]}
                                alt="playing card"
                            />
                        }
                    </div>
                :
                    <div>
                        <img
                            className={className}
                            onClick={() => select(number)}
                            src={cardMap[number]}
                            alt="playing card"
                        />
                    </div>
            )
        }
        </div>
    )
}

export default Card