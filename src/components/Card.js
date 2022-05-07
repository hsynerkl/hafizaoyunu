import React from 'react'
import './Card.css'

const Card = ({ card, handleChoice, flipped }) => {


    const handleClick = () => {
        handleChoice(card);
    }

    return (

        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card" />
                <img className="back" onClick={handleClick} src="../img/cover.png" alt="card" />
            </div>
        </div>

    )
}

export default Card