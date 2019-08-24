import { Player } from './player';

export interface EventErrorCode {
    errorCode: number;
    callback: (args: any[]) => void;
}

export class ErrorCodes {

    allErrorCodes: EventErrorCode[] = [];

    constructor() {
        this.allErrorCodes.push({
            errorCode: 101,
            callback: (args: any[]) => {

            },
        });
    }

    get AllErrorCodes() {
        return this.allErrorCodes;
    }
}

export class Command {

    runCommand(errorCode: EventErrorCode, args: any[]) {
        const errorCodes = new ErrorCodes().AllErrorCodes;
        for (let i = 0; i !== errorCodes.length; i++) {
            if (errorCode === errorCodes[i]) {
                return errorCodes[i].callback(args);
            }
        }
    }

}
