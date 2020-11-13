import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly httpClient: HttpClient,
    private router: Router
  ) {}

  private DJANGO_DOMAIN = 'http://127.0.0.1:8000/';
  private HEALTH_CHECK_URL = 'health';
  private AWS_POST_URL = 'aws_post';

  private healthSubject = new Subject<string>();
  private awsPostSubject = new Subject<string>();

  getAWSPostListener(): any {
    return this.awsPostSubject.asObservable();
  }

  getHealthListener(): any {
    return this.healthSubject.asObservable();
  }

  addPost(media: File): void {
    const postInfo = new FormData();
    postInfo.append('file', media);

    this.httpClient
      .post<any>(`${this.DJANGO_DOMAIN}${this.AWS_POST_URL}`, postInfo)
      .subscribe((file: any) => {
        this.awsPostSubject.next(file.fileUrl);
        this.router.navigate([`/`]);
      });
  }

  healthCheck(): void {
    this.httpClient
      .get<any>(`${this.DJANGO_DOMAIN}${this.HEALTH_CHECK_URL}`)
      .subscribe((response: any) => {
        this.healthSubject.next(response.health);
      });
  }
}
