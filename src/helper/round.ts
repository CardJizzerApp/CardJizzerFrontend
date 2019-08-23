import { Player } from './player';

export class Round {

    public currentRound: Round = undefined;

    private cardJizzer: Player;

    constructor(cardJizzer: Player) {
        this.cardJizzer = cardJizzer;
    }

    get CardJizzer() {
        return this.cardJizzer;
    }

}