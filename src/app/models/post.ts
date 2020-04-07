import { UserAccount } from './user-account';
import { PostRequest } from './request/post';


export class Post {
    public readonly ID: string;
    public readonly content: string;


    constructor(request: PostRequest) {
        this.ID = request.ID;
        this.content = request.content;
    }

}
