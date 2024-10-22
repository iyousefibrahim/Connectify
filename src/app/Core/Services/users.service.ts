import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../../Environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  SignUp(data: object): Observable<any> {
    return this._HttpClient.post(BaseUrl + "users/signup", data);
  }

  SignIn(data: object): Observable<any> {
    return this._HttpClient.post(BaseUrl + "users/signin", data);
  }

  ChangePassword(data: object): Observable<any> {
    return this._HttpClient.patch(BaseUrl + "users/change-password", data);
  }

  UploadProfilePhoto(photo: any): Observable<any> {
    return this._HttpClient.put(BaseUrl + "users/upload-photo", photo);
  }

  GetUserData(): Observable<any> {
    return this._HttpClient.get(BaseUrl + "users/profile-data");
  }


}
