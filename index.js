let deckId
const cardsContainer = document.getElementById("cards")
const shuffleCardsBtn = document.getElementById("shuffle-cards")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining-cards")

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
            }

        })
})

function determineWinner(card1, card2) {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = values.indexOf(card1.value)
    const card2Value = values.indexOf(card2.value)

    if (card1Value > card2Value) {
        return "Card 1 wins!"
    } else if  (card1Value < card2Value) {
        return "Card 2 wins!"
    } else {
        return "Tie!"
    }
}

const card1Obj = {
    value: "7"
}

const card2Obj = {
    value: "7"
}

determineWinner(card1Obj, card2Obj)