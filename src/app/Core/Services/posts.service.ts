import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../../Environment/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  CreatePost(data: object): Observable<any> {
    return this._HttpClient.post(BaseUrl + "posts", data);
  }

  GetAllPosts(): Observable<any> {
    return this._HttpClient.get(BaseUrl + "posts?limit=50");
  }

  //User ID Req!
  GetUserPosts(): Observable<any> {
    return this._HttpClient.get(BaseUrl + "users/664bcf3e33da217c4af21f00/posts?limit=100");
  }

  GetSinglePost(postId: string): Observable<any> {
    return this._HttpClient.get(BaseUrl + `posts/${postId}`);
  }

  UpdatePost(postId: string,data : object): Observable<any> {
    return this._HttpClient.put(BaseUrl + `posts/${postId}`,data);
  }

  DeletePost(postId: string): Observable<any> {
    return this._HttpClient.delete(BaseUrl + `posts/${postId}`);
  }
}
