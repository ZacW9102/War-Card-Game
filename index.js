let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const shuffleCardsBtn = document.getElementById("shuffle-cards")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining-cards")
const compScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => { 
            deckId = data.deck_id
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
        })
}

shuffleCardsBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winText = determineWinner(data.cards[0], data.cards[1])
            header.textContent = winText
            
            if(data.remaining === 0) {
                drawCardBtn.disabled = true
                if(computerScore > myScore) {
                    header.textContent = `The computer won the game!`
                } else if (computerScore < myScore) {
                    header.textContent = `You won the game!`
                } else {
                    header.textContent = `The game was a tie!`
                }
            }

        })
})

function determineWinner(card1, card2) {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = values.indexOf(card1.value)
    const card2Value = values.indexOf(card2.value)

    if (card1Value > card2Value) {
        myScore++
        myScoreEl.textContent = `My Score: ${myScore}`
        return "You win!"
    } else if  (card1Value < card2Value) {
        computerScore++
        compScoreEl.textContent = `Computer Score: ${computerScore}`
        return "Computer wins!"
    } else {
        return "Tie!"
    }
}

