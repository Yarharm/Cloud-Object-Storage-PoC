import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostModel } from '../models/post.model';
import { PostService } from '../http-service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private readonly postService: PostService) {}
  posts: PostModel[] = [];
  health = '';
  private healthSubs = new Subscription();

  ngOnInit(): void {
    this.healthSubs = this.postService
      .getHealthListener()
      .subscribe((healthStatus: string) => {
        this.health = healthStatus;
      });
    this.postService.healthCheck();
  }

  ngOnDestroy(): void {
    this.healthSubs.unsubscribe();
  }
}
