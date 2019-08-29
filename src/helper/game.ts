import Card from './card';
import { Player } from './player';

export class Game {

    private id: string;
    private maxPlayers: number;
    private amountOfCurrentPlayers: number;
    private passwordRequired: boolean;
    private title: string;
    private joinable: boolean;

    private allCards: Card[];
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
        this.allCards = [];
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

    public start() {
        this.ingame = true;
    }

    public stop() {
        this.ingame = false;
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

}
