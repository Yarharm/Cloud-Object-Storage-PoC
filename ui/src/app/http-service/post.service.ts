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
  private GCP_POST_URL = 'gcp_post';

  private healthSubject = new Subject<string>();
  private postSubject = new Subject<string>();

  getAWSPostListener(): any {
    return this.postSubject.asObservable();
  }

  getHealthListener(): any {
    return this.healthSubject.asObservable();
  }

  postGCP(media: File): void {
    const postInfo = new FormData();
    postInfo.append('file', media);

    this.httpClient
      .post<any>(`${this.DJANGO_DOMAIN}${this.GCP_POST_URL}`, postInfo)
      .subscribe((file: any) => {
        this.postSubject.next(file.fileUrl);
        this.router.navigate([`/`]);
      });
  }

  postAWS(media: File): void {
    const postInfo = new FormData();
    postInfo.append('file', media);

    this.httpClient
      .post<any>(`${this.DJANGO_DOMAIN}${this.AWS_POST_URL}`, postInfo)
      .subscribe((file: any) => {
        this.postSubject.next(file.fileUrl);
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
