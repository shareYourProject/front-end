export interface UserAccountRequest {
    ID: string;
    username: string;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
}
