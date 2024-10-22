import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../../Environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  CreateComment(data: object): Observable<any> {
    return this._HttpClient.post(BaseUrl + "comments", data);
  }

  GetPostComments(postID: string): Observable<any> {
    return this._HttpClient.get(BaseUrl + `posts/${postID}/comments`);
  }

  UpdateComment(postID: string, data: object): Observable<any> {
    return this._HttpClient.put(BaseUrl + `comments/${postID}`, data);
  }

  DeleteComment(postID: string): Observable<any> {
    return this._HttpClient.get(BaseUrl + `comments/${postID}`);
  }
}
