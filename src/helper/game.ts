import Card from './card';
import { Player } from './player';

export class Game {

    private id: string;
    private maxPlayers: number;
    private amountOfCurrentPlayers: number;
    private passwordRequired: boolean;
    private title: string;
    private joinable: boolean;

    private roundWinner: Player;

    private allCards: {uuid: string, cards: Card[]};
    private players: Player[];
    private hand: Card[];

    private ingame: boolean;
    constructor(title: string, passwordRequired: boolean, maxPlayers: number, id: string) {
        this.passwordRequired = passwordRequired;
        this.maxPlayers = maxPlayers;
        this.amountOfCurrentPlayers = 0;
        this.title = title;
        this.id = id;
        this.joinable = maxPlayers >= 4;
        this.allCards = {} as any;
        this.players = [];
        this.hand = [];
        this.ingame = false;
    }

    public addCardToHand(card: Card) {
        this.hand.push(card);
    }

    public removeCardFromHand(card: Card) {
        const index = this.hand.indexOf(card);
        if (index !== -1) {
            delete this.hand[index];
            return true;
        }
        return false;
    }

    public updateAmountOfCurrentPlayers(newAmount: number) {
        this.amountOfCurrentPlayers = newAmount;
    }

    public addPlayer(player: Player): boolean {
        const index = this.players.indexOf(player);
        if (index === -1) {
            this.players.push(player);
            return true;
        }
        return false;
    }

    public removePlayer(player: Player): boolean {
        const index = this.players.indexOf(player);
        if (index !== -1) {
            delete this.players[index];
            return true;
        }
        return false;
    }

    public findPlayerByUUID(uuid: string) {
        for (let i = 0; i !== this.players.length; i++) {
            const player = this.players[i];
            if (player.UUID.toString().toLowerCase() === uuid.toLowerCase()) {
                return player;
            }
        }
        return undefined;
    }

    public overRideAllCards(newAllCards: {uuid: string, cards: Card[]}) {
        this.allCards = newAllCards;
    }

    public start() {
        this.ingame = true;
    }

    public stop() {
        this.ingame = false;
    }

    public setRoundWinner(player: Player) {
        this.roundWinner = player;
        setTimeout(() => {
            this.roundWinner = undefined;
        }, 3 * 1000);
    }

    public newRound() {
        this.allCards = {} as any;
        this.hand = [] as any;
    }

    public updateHand(newHand: Card[]) {
        this.hand = newHand;
    }

    get AmountOfCurrentPlayers() {
        return this.amountOfCurrentPlayers;
    }

    get PasswordRequired(): boolean {
        return this.passwordRequired;
    }

    get MaxPlayers(): number {
        return this.maxPlayers;
    }

    get Title(): string {
        return this.title;
    }

    get Id(): string {
        return this.id;
    }

    get Joinable(): boolean {
        return this.joinable;
    }

    get Players(): Player[] {
        return this.players;
    }

    get AllCards() {
        return this.allCards;
    }

    get RoundWinner() {
        return this.roundWinner;
    }

}
