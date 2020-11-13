import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../http-service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private readonly postService: PostService) {}
  posts: string[] = [];
  health = '';
  private healthSubs = new Subscription();
  private awsPostSubs = new Subscription();

  ngOnInit(): void {
    this.healthSubs = this.postService
      .getHealthListener()
      .subscribe((healthStatus: string) => {
        this.health = healthStatus;
      });
    this.awsPostSubs = this.postService
      .getAWSPostListener()
      .subscribe((postUrl: string) => {
        this.posts.push(postUrl);
      });
    this.postService.healthCheck();
  }

  ngOnDestroy(): void {
    this.healthSubs.unsubscribe();
    this.awsPostSubs.unsubscribe();
  }
}
