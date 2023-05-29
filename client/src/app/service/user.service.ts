import { EventEmitter, Injectable } from '@angular/core';
import { User, UserCreatedResponse } from '../models/user';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const URL = "http://localhost:8080/api/createUser"


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REMPASS_URL: string="/api/rememberpassword"
  private CREATE_URL: string="/api/createUser"

  loginStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  public isLogin = true;

  //create and save into mongo
  createuser(user: User): Promise<UserCreatedResponse> {
    return this.http.post<UserCreatedResponse>(this.CREATE_URL, user).toPromise()
    .then(response => {
      if (response) {
        //USE HERE
        return response;
      } else {
        throw new Error('User creation response is undefined.');
      }
    });
		// return firstValueFrom(
		// 	this.http.post<UserCreatedResponse>(URL, user)
		// )
	}

  //get from mongo for use
  getUser(email: string):Promise<User>{
    const params = new HttpParams()
    .set("email",email);

    return lastValueFrom(this.http.get<User>("/api/login/attempt",{params}))
  }

  updateLoginStatus(){
    this.isLogin =!this.isLogin;
    this.loginStatusChanged.emit(this.isLogin);
  }

  getLoginStatus(): boolean{
    return this.isLogin;
  }

  forgetPass(email: string): Promise<any>{
    return this.http.post<any>(this.REMPASS_URL, email).toPromise()
    .then(response => {
      if (response) {
        //check for boolean
        return response;
      } else {
        throw new Error('Failed to remember password!');
      }
    });
  }
}


