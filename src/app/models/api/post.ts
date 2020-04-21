import { Project } from '../project';
import { Comment } from '@angular/compiler';

export interface IPost {
    id: number,
    project: Project,
    content: string,
    nb_like: number,
    comments: Comment[],
    author_id: number,
}