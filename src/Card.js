import oneClubs from './cards/ac.webp'
import twoClubs from './cards/2c.webp'
import threeClubs from './cards/3c.webp'
import fiveClubs from './cards/5c.webp'
import eightClubs from './cards/8c.webp'
import kingClubs from './cards/kc.webp'
import oneDiamonds from './cards/ad.webp'
import twoDiamonds from './cards/2d.webp'
import threeDiamonds from './cards/3d.webp'
import fiveDiamonds from './cards/5d.webp'
import eightDiamonds from './cards/8d.webp'
import kingDiamonds from './cards/kd.webp'
import oneHearts from './cards/ah.webp'
import twoHearts from './cards/2h.webp'
import threeHearts from './cards/3h.webp'
import fiveHearts from './cards/5h.webp'
import eightHearts from './cards/8h.webp'
import kingHearts from './cards/kh.webp'
import oneSpades from './cards/as.webp'
import twoSpades from './cards/2s.webp'
import threeSpades from './cards/3s.webp'
import fiveSpades from './cards/5s.webp'
import eightSpades from './cards/8s.webp'
import kingSpades from './cards/ks.webp'
import faceDownCard from './cards/faceDown.jpeg'

const Card = (props) => {
    const {number, select, faceDown, ownCard, clickable} = props
    const cardMap = [
        null,
        oneClubs,
        twoClubs,
        threeClubs,
        null,
        fiveClubs,
        null, null,
        eightClubs,
        null,null,null,null,
        kingClubs
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
                            src={faceDownCard}
                            alt="playing card"
                        />
                        {ownCard &&
                            <img
                                className={className + " bottom-half"}
                                src={cardMap[number]}
                                alt="playing card"
                            />
                        }
                    </div>
                :
                    <div>
                        <img
                            className={className}
                            onClick={() => clickable && select(number)}
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