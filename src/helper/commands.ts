export class Commands {

    constructor() {}

    public createGame(
        title: string,
        maxplayers: number,
        deckids: string[],
        maxroundtime: number,
        pointstowin: number,
        password?: string,
    ): string {
        return JSON.stringify({
            command: 'creategame',
            params: {
                gametitle: title,
                maxplayers,
                deckids,
                maxroundtime,
                pointstowin,
                password
            }
        });
    }
    public fetchGames() {
        return JSON.stringify({
            command: 'fetchgames'
        });
    }
    public login(username: string) {
        return JSON.stringify({
            command: 'setusername',
            params: {
                username
            }
        });
    }
    public leave() {
        return JSON.stringify({
            command: 'leave'
        });
    }
    public join(gameUUID: string) {
        return JSON.stringify({
            command: 'join',
            params: {
                gameid: gameUUID
            }
        });
    }
    public fetchCards() {
        return JSON.stringify({
            command: 'fetchcards'
        });
    }
    public playCard(cardid: string) {
        return JSON.stringify({
            command: 'playcard',
            params: {
                cardid
            }
        });
    }
    public pickCard(cardid: string) {
        return JSON.stringify({
            command: 'pickcard',
            params: {
                cardid
            }
        });
    }
    public fetchAllLaidCards() {
        return JSON.stringify({
            command: 'fetchallcards'
        });
    }
    public start() {
        return JSON.stringify({
            command: 'start'
        });
    }
    public logout() {
        return JSON.stringify({
            command: 'logout'
        });
    }
    public fetchScoreBoard() {
        return JSON.stringify({
            command: 'getscore',
        });
    }
}
