export default class Card {

    private text: string;
    private uuid: string;
    constructor(text: string, uuid: string) {
        this.text = text;
        this.uuid = uuid;
    }

    public get Text(): string {
           return this.text;
    }
    public get UUID(): string {
        return this.uuid;
    }
}
