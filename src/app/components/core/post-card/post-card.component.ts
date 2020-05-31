import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/classes/Post';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/User';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  @Input() me?: User | null;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  isLiked() {
    return !!this.me && this.post.likerIds.includes(this.me.id);
  }

  async likeButtonClick(btn: HTMLButtonElement) {
    if (!this.me) return;
    btn.disabled = true;
    try {
      if (this.isLiked()) {
        await this.post.unlike();
      } else {
        await this.post.like();
      }
    } catch (e) { console.error('fail like button', e); }
    btn.disabled = false;
  }

}
