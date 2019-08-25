export class Game {


    private maxPlayers: number;
    private amountOfCurrentPlayers: number;
    private passwordRequired: boolean;
    private title: string;

    public constructor(title: string, passwordRequired: boolean, maxPlayers: number) {
        this.passwordRequired = passwordRequired;
        this.maxPlayers = maxPlayers;
        this.title = title;
    }
    public updateAmountOfCurrentPlayers(newAmount: number) {
        this.amountOfCurrentPlayers = newAmount;
    }

    get AmountOfCurrentPlayers() {
        return this.amountOfCurrentPlayers;
    }

    get PasswordRequired(): boolean {
        return this.passwordRequired;
    }

}
