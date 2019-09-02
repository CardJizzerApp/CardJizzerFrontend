import Card from './card';

export default class Deck {

    private title: string;
    private cards: Card[];
    private id: string;
    constructor(title: string, cards: Card[], id: string) {
        this.cards = cards;
        this.title = title;
        this.id = id;
    }

    get Title() { return this.title; }
    get Cards() { return this.cards; }
    get Id() { return this.id; }
}
