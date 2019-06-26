/*--------- Fundamental Conditions ----------*/
let playerTurn = true;

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
    bluestripes1 = new Team("blueStripes1", 4, "close", "blue"),
    bluestripes2 = new Team("blueStripes2", 4, "close", "blue"),
    bluestripes3 = new Team("blueStripes3", 4, "close", "blue"),
    crinfrid1 = new Team("crinfrid1", 4, "ranged", "reavers"),
    crinfrid2 = new Team("crinfrid2", 4, "ranged", "reavers"),
    crinfrid3 = new Team("crinfrid3", 4, "ranged", "reavers"),
    keira = new Card("keira", 4, "ranged"),
    catapult1 = new Team("catapult1", 4, "siege", "catapult"),
    catapult2 = new Team("catapult2", 4, "siege", "catapult"),
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
    }

    renderHand() {
        let cardHTML = "";
        for (let i = 0; i < this.hand.length; i++) {
            cardHTML += `<img src="img/${this.hand[i].name}.jpg" alt="${this.hand[i].name}" class="${this.hand[i].name}">`;
            $(".hand-row").html(cardHTML);
        }
    }

    drawCard() {
        let randomIndex = Math.floor(Math.random() * this.deck.length);
        this.hand.push(this.deck[randomIndex]);
        this.deck.splice(randomIndex, 1);
        this.renderHand();
    }

    getScore() {
        // Reset score before counting;
        this.closeScore = 0;
        this.rangeScore = 0;
        this.siegeScore = 0;
        this.closecombat.map((card) => {
            this.closeScore += card.strength;
        });
        this.rangedcombat.map((card) => {
            this.rangeScore += card.strength;
        });

        this.score = this.closeScore + this.rangeScore + this.siegeScore;
    }

    playCard(theCard) {
        // Add logic to transfer the card from hand to whichRow
        if(theCard.row === "close") {
            this.closecombat.push(theCard);
        }
        if(theCard.row === "ranged") {
            this.rangedcombat.push(theCard);
        }
        if(theCard.row === "siege") {
            this.siegecombat.push(theCard);
        }
        let handIndex = this.hand.indexOf(theCard)

        this.hand.splice(handIndex, 1);
        
        this.getScore();
    }

    endTurn() {} // Add logic where the game automatically cycles back & forth
    // Turns should end after a card has been played, and opponents be given the chance to play their card
    passTurn() {}

    winRound() {
        // Add logic to start a new round and clear the board
        // Also draw extra card (Northern Solamente)??
    }

    winGame() {
        /* Add additional logic to display the win screen 
        and either redirect (to final score screen) or reload page */
    }
}

let You = new Player([...northern]);
let Opponent = new Player([...northern]);

let startGame = () => {
    for (let i = 0; i < 10; i++) {
        You.drawCard();
        Opponent.drawCard();
    }
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

// console.log(You);


/*--------- UI Playing functions ----------*/

// Only run function if it's player's turn, and only allow 1 to be played 
// Thus, set playerTurn to false at the bottom of playCard
$(".hand-row img").click(function () {
    let classname = $(this).attr("class");
    const theCard = You.hand.find(card => card.name === classname);
    You.playCard(theCard);
    // console.log(You.hand.find(card => card.name === classname));
    console.log("Card updated!");
    console.log(You);
    
    
    
})