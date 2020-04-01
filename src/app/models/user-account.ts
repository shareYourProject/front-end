import {UserAccountRequest} from './request/user-account';

export class UserAccount {

    public readonly ID: string;
    private _username: string;
    private _firstName: string | null;
    private _lastName: string | null;
    private _email: string | null;

    private _dirty: boolean = false;

    constructor(request: UserAccountRequest) {
        this.ID = request.ID;
        this._username = request.username;
        this._firstName = request.username;
        this._lastName = request.lastName;
        this._email = request.email;
    }

    get username(): string { return this._username; }
    get firstName(): string | null { return this._firstName; }
    get lastName(): string | null { return this._lastName; }
    get email(): string | null { return this._email; }

    // TODO : add check on values
    set username(value: string) { this._username = value; this._dirty = true; }
    set firstName(value: string) { this._firstName = value; this._dirty = true; }
    set lastName(value: string) { this._lastName = value; this._dirty = true; }
    set email(value: string) { this._email = value; this._dirty = true; }
    
    get isDirty(): boolean { return this._dirty; }
}
