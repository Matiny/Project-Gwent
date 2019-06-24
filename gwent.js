
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
    }
    strongWill(){
        // Decide on the tactics that will prevent the Hero from losing or gaining strength
        // Probably just return true, and only allow the card to be affected if strongWill() === true
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
    yennefer = new Hero("yennefer", 7),
    triss = new Hero("triss", 7),
    zoltan = new Card("zoltan", 5, "close"),
    bluestripes1 = new Team("blueStripes1", 4, "blue"),
    bluestripes2 = new Team("blueStripes2", 4, "blue"),
    bluestripes3 = new Team("blueStripes3", 4, "blue"),
    crinfrid1 = new Team("crinfrid1", 4, "reavers"),
    crinfrid2 = new Team("crinfrid2", 4, "reavers"),
    crinfrid3 = new Team("crinfrid3", 4, "reavers"),
    keira = new Card("keira", 4),
    catapult1 = new Team("catapult1", 4, "catapult"),
    catapult2 = new Team("catapult2", 4, "catapult"),
    ves = new Card("ves", 5, "close"),
    sigi = new Spy("sigi", 4, "close"),
    stennis = new Spy("stennis", 5, "close"),
    thaler = new Spy("thaler", 1),
    medic = new Healer("medic", 5),
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
        this.score = 0;
        this.roundsWon = 0; // Max 2, then game ends
    }

    drawCard() {
        let randomIndex = Math.floor(Math.random() * this.deck.length);
        this.hand.push(this.deck[randomIndex]);
        this.deck.splice(randomIndex, 1);

        // Also make sure the hand array cannot "includes" the same card
    }

    playCard() {
        // Add logic to transfer the card from hand to whichRow
    }

    winRound() {
        // Add logic to start a new round and clear the board
        // Also draw extra card (Northern Solamente)??
    }

    winGame() {
        console.log(`${this.name} Wins!`); 
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

console.log(You);
console.log(Opponent);

// console.log(northern);