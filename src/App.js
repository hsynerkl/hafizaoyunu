import './App.css'
import { useState, useEffect } from 'react';
import Card from './components/Card'
function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(null);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const cardImages = [
    { "src": "./img/helmet-1.png", matched: false },
    { "src": "./img/potion-1.png", matched: false },
    { "src": "./img/ring-1.png", matched: false },
    { "src": "./img/scroll-1.png", matched: false },
    { "src": "./img/shield-1.png", matched: false },
    { "src": "./img/sword-1.png", matched: false },
  ]

  // kartları karıştır
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {
                ...card, matched: true
              }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
  }


  return (
    <div className="App">
      <h1>Hafıza Oyunu</h1>
      <button onClick={shuffleCards}>Yeni Oyun</button>
      <div className="card-grid">
        {

          cards.map((card) => (
            <Card flipped={card === choiceOne || card === choiceTwo || card.matched} key={card.id} card={card} handleChoice={handleChoice} />
          ))

        }
      </div>
      {turns !== null ? <p> Çevrilen kart sayısı : {turns}</p> : ""}

    </div >
  );
}

export default App