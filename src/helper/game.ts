export class Game {


    private maxPlayers: number;
    private amountPlayers: number;
    private passwordRequired: boolean;
    
    public Game(passwordRequired: boolean, maxPlayers: number, amountPlayers: number) {
        this.passwordRequired = passwordRequired;
        this.maxPlayers = maxPlayers;
        this.amountPlayers = amountPlayers;
    }

}