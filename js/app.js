const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard , secoundCard;
let lockBoard = false;


function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return
    }
    //second click
    secoundCard = this;
    
    checkForMatch()
    
}

function checkForMatch(){

    let isMatch = firstCard.dataset.framework === secoundCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
} 

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secoundCard.removeEventListener('click',flipCard);
    resetBoard();
} 

function unflipCards(){

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secoundCard.classList.remove('flip');
        resetBoard();
    },450); 
}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secoundCard] = [null,null];
}

(function rand(){
    cards.forEach(card=> {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    })
})();

cards.forEach(card => {
    card.addEventListener('click',flipCard);
})