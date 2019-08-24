export class Player {

    private uuid: string;
    private username: string;

    constructor(uuid: string, username: string) {
        this.uuid = uuid;
        this.username = username;
    }

    get Username() {
        return this.username;
    }

    get UUID() {
        return this.uuid;
    }

}
