import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  private DJANGO_DOMAIN = 'http://127.0.0.1:8000/';
  private HEALTH_CHECK_URL = 'health';

  private healthSubject = new Subject<string>();

  getHealthListener(): any {
    return this.healthSubject.asObservable();
  }

  healthCheck(): void {
    this.httpClient
      .get<string>(`${this.DJANGO_DOMAIN}${this.HEALTH_CHECK_URL}`)
      .subscribe((response: string) => {
        this.healthSubject.next(response);
      });
  }
}
