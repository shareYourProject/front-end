export interface IUserAccount {
    ID: string,
    username: string,
    firstName: string | null,
    lastName: string | null,
}

export class UserAccount implements IUserAccount {

    public readonly ID: string;
    private _username: string;
    private _firstName: string | null;
    private _lastName: string | null;

    private _dirty: boolean = false;

    constructor(userAccount: IUserAccount) {
        this.ID = userAccount.ID;
        this._username = userAccount.username;
        this._firstName = userAccount.username;
        this._lastName = userAccount.lastName;
    }

    get username(): string { return this._username; }
    get firstName(): string | null { return this._firstName; }
    get lastName(): string | null { return this._lastName; }

    set username(value: string) { this._username = value; this._dirty = true; }
    set firstName(value: string) { this._firstName = value; this._dirty = true; }
    set lastName(value: string) { this._lastName = value; this._dirty = true; }
    
    get isDirty(): boolean { return this._dirty; }
}
