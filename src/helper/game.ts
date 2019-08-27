export class Game {

    private id: string;
    private maxPlayers: number;
    private amountOfCurrentPlayers: number;
    private passwordRequired: boolean;
    private title: string;
    private joinable: boolean;

    public constructor(title: string, passwordRequired: boolean, maxPlayers: number, id: string) {
        this.passwordRequired = passwordRequired;
        this.maxPlayers = maxPlayers;
        this.amountOfCurrentPlayers = 0;
        this.title = title;
        this.id = id;
        this.joinable = maxPlayers >= 4;
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

    get MaxPlayers(): number {
        return this.maxPlayers;
    }

    get Title(): string {
        return this.title;
    }

    get Id(): string {
        return this.id;
    }

}
