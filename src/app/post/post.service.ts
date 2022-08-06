import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // fetch all post
  getAll(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(environment.baseUrl + '/posts')
      .pipe(catchError(this.errorHandler));
  }

  // create new post
  create(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(
        environment.baseUrl + '/posts',
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // fetch post by id
  find(id: number): Observable<Post> {
    return this.httpClient
      .get<Post>(environment.baseUrl + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }

  // update post by id
  update(id: number, post: Post): Observable<Post> {
    return this.httpClient
      .put<Post>(
        environment.baseUrl + '/posts/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // delete post by id
  delete(id: number) {
    return this.httpClient.delete<Post>(environment.baseUrl + '/posts/' + id).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
