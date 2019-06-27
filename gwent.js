/*--------- Fundamental Conditions ----------*/
let playerTurn = true;
let round = 1;

/*--------- Card classes ----------*/
class Card {
    constructor(nameInput, strengthInput, whichRow) {
        this.name = nameInput;
        this.strength = strengthInput;
        this.row = whichRow;
    }
}

class Hero extends Card {
    constructor(nameInput, strengthInput, whichRow) {
        super(nameInput, strengthInput, whichRow);
        this.strongWill = true;
    }
}  

class Spy extends Card {
    constructor(nameInput, strengthInput, whichRow) {
        super(nameInput, strengthInput, whichRow);
    }
    // Set up the logic that allows players to gain cards while boosting enemies
}

class Team extends Card {
    constructor(nameInput, strengthInput, whichRow, faction) {
        super(nameInput, strengthInput, whichRow);
        this.teamName = faction;
    }
    // Set up the logic that seeks out other team members once the card hits the field
    // Thus, a playCard() method may work well here
}

class Healer extends Card {
    constructor(nameInput, strengthInput, whichRow) {
        super(nameInput, strengthInput, whichRow);
    }
    // Set up the logic that splices a chosen card from the discard pile into the hand
}

// For the Nonhumans and Monsters, the Muster cards will be called horde

// Later, add addtional deck types & the logic to pick them!

const northern = [ 
    geralt = new Hero("geralt", 15, "close"),
    ciri = new Hero("ciri", 15, "close"),
    vernon = new Hero("vernon", 10, "close"),
    yennefer = new Hero("yennefer", 7, "ranged"),
    triss = new Hero("triss", 7, "close"),
    zoltan = new Card("zoltan", 5, "close"),
    bluestripes1 = new Team("bluestripes1", 4, "close", "blue"),
    bluestripes2 = new Team("bluestripes2", 4, "close", "blue"),
    bluestripes3 = new Team("bluestripes3", 4, "close", "blue"),
    crinfrid1 = new Team("crinfrid1", 5, "ranged", "reavers"),
    crinfrid2 = new Team("crinfrid2", 5, "ranged", "reavers"),
    crinfrid3 = new Team("crinfrid3", 5, "ranged", "reavers"),
    keira = new Card("keira", 4, "ranged"),
    catapult1 = new Team("catapult1", 8, "siege", "catapult"),
    catapult2 = new Team("catapult2", 8, "siege", "catapult"),
    ves = new Card("ves", 5, "close"),
    sigi = new Spy("sigi", 4, "close"),
    stennis = new Spy("stennis", 5, "close"),
    thaler = new Spy("thaler", 1, "siege"),
    medic = new Healer("medic", 5, "siege"),
]

class Player {
    constructor(deck) {
        this.deck = deck;
        this.hand = []; // Start with 10
        this.killed = []; // Discard pile

        // This refers to who's in play
        this.closecombat = [];
        this.rangedcombat = [];
        this.siegecombat = [];
        
        // Keeping score
        this.closeScore = 0; // Display these in the page
        this.rangeScore = 0;
        this.siegeScore = 0;
        this.score = 0;

        this.roundsWon = 0; // Max 2, then game ends

        this.pass = false;
    }

    renderHand() {        
        let cardHTML = "";
        for (let i = 0; i < this.hand.length; i++) {
            cardHTML += `<img src="img/${this.hand[i].name}.jpg" alt="${this.hand[i].name}" class="${this.hand[i].name}">`;
        }
        $(".hand-row").html(cardHTML);
    }

    renderClose() {        
        let cardHTML = "";
        for (let i = 0; i < this.closecombat.length; i++) {
            const cardName = this.closecombat[i].name;
            cardHTML += `<img src="img/${cardName}.jpg" alt="${cardName}" class="${cardName}">`;
        }
        cardHTML += `<span class="close-score">${this.closeScore}</span>`;
        let whichField = playerTurn ? ".your-field" : ".their-field";
        $(`${whichField} .close-row`).html(cardHTML);
    }

    renderRange() {        
        let cardHTML = "";
        for (let i = 0; i < this.rangedcombat.length; i++) {
            const cardName = this.rangedcombat[i].name;
            cardHTML += `<img src="img/${cardName}.jpg" alt="${cardName}" class="${cardName}">`;
        }
        cardHTML += `<span class="ranged-score">${this.rangeScore}</span>`
        let whichField = playerTurn ? ".your-field" : ".their-field"
        $(`${whichField} .ranged-row`).html(cardHTML);
    }

    renderSiege() {        
        let cardHTML = "";
        for (let i = 0; i < this.siegecombat.length; i++) {
            const cardName = this.siegecombat[i].name;
            cardHTML += `<img src="img/${cardName}.jpg" alt="${cardName}" class="${cardName}">`;
        }
        cardHTML += `<span class="siege-score">${this.siegeScore}</span>`
        let whichField = playerTurn ? ".your-field" : ".their-field"
        $(`${whichField} .siege-row`).html(cardHTML);
    }

    drawCard() {
        let randomIndex = Math.floor(Math.random() * this.deck.length);
        this.hand.push(this.deck[randomIndex]);
        this.deck.splice(randomIndex, 1);
    }

    getScore() {
        // Reset score before counting;
        this.closeScore = 0;
        this.rangeScore = 0;
        this.siegeScore = 0;
        let blue = [];
        let reavers = [];
        let catapults = [];
        this.closecombat.forEach((card) => {
            if (card.teamName) {
                blue.push(card);
                card.strength *= blue.length;
            }
            this.closeScore += card.strength;
        });
        this.rangedcombat.forEach((card) => {
            if (card.teamName) {
                reavers.push(card);
                card.strength *= reavers.length;
            }
            
            this.rangeScore += card.strength;
        });
        this.siegecombat.forEach((card) => {
            if (card.teamName) {
                catapults.push(card);
                card.strength *= catapults.length;
            }
            this.siegeScore += card.strength;
        });

        this.score = this.closeScore + this.rangeScore + this.siegeScore;
    }

    playCard(theCard) {
        // Add logic to transfer the card from hand to whichRow
        if(theCard.row === "close") {
            this.closecombat.push(theCard);
            this.getScore();
            this.renderClose();
        }
        if(theCard.row === "ranged") {
            this.rangedcombat.push(theCard);
            this.getScore();
            this.renderRange();
        }
        if(theCard.row === "siege") {
            this.siegecombat.push(theCard);
            this.getScore();
            this.renderSiege();
        }
        let handIndex = this.hand.indexOf(theCard)

        this.hand.splice(handIndex, 1);

        // this.renderHand();
        
    }

    passTurn() {
        this.pass = true;
    }

    winRound() {
        // Add logic to start a new round and clear the board
        // Also draw extra card (Northern Solamente)??
    }

    winGame() {
        /* Add additional logic to display the win screen 
        and either redirect (to final score screen) or reload page */
    }
}

function endRound() {
    if (You.score > Opponent.score) {
        alert("You have won the round!");
        You.roundsWon++;
    }
    else if (You.score < Opponent.score) {
        alert("You have lost the round!");
        Opponent.roundsWon++;
    }
    round++;
    // Clear all cards from board to discard pile
    // Clear all weather conditions
    // Show "Round 2"
}

let You = new Player([...northern]);
let Opponent = new Player([...northern]);

let startGame = () => {
    for (let i = 0; i < 10; i++) {
        You.drawCard();
        Opponent.drawCard();
    }
    You.renderHand();
}

startGame();

// You.playCard(You.hand[0]);

/*--------- Weather functions ----------*/
// Clear weather?? How will that work?
let bitingFrost = () => {
    You.closecombat.map((card) => {
        if(!card.strongWill === true) {
            card.strength = 1;
        }
    });
    // Do the same for the opponent!
}

// bitingFrost();

// console.log(You.hand);


/*--------- UI Playing functions ----------*/

// Only run function if it's player's turn, and only allow 1 to be played 
// Thus, set playerTurn to false at the bottom of playCard
function opponentMove() {
    // Condition in which opponent passes

    if (Opponent.score > 20 && Math.random() > 0.5) {
        Opponent.passTurn();
        playerTurn = true;
    }
    if (!Opponent.pass) {
        Opponent.playCard(Opponent.hand[Math.floor(Math.random() * Opponent.hand.length)])
    }
    else {
        alert("Opponent has passed for the rest of round!");
    }
    
    if (You.pass === false) {
        playerTurn = true;
    }
    console.log(`Opponent: ${Opponent.pass}`);
   
}



function playerMove() {
    $('body').keydown(function(e){
        if(e.keyCode == 32){
            You.passTurn();
            playerTurn = false;
            console.log(You.pass);
        }
     });
    $("body").on("click", ".hand-row img", function () {
        let classname = $(this).attr("class");
        $(".your-card").html(`<img src="img/${classname}.jpg" alt="">`).addClass("your-choice");
        setTimeout(function(){ $(".your-card").removeClass("your-choice") }, 1500);
        const theCard = You.hand.find(card => card.name === classname);
        You.playCard(theCard);
        You.renderHand();
        if (Opponent.pass === false) {
            playerTurn = false;
        }
    })
    
}


function game() {
    if (You.pass === true && Opponent.pass === true) {
        endRound();
        clearInterval(gameInterval);
    }
    else if (playerTurn === true) {
        playerMove();
        $(".your-score").text(`Your Total: ${You.score} pts`)
    }
    else if (playerTurn === false) {
        opponentMove();
        $(".opponent-score").text(`Enemy's Total: ${Opponent.score} pts`);
    }
}

let gameInterval = setInterval(() => {
    game();
}, 1000) 

$('button').click(function () {
    $('.splash-screen').fadeOut();
})


