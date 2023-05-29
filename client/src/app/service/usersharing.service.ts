import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersharingService {

  private user: User | null = null;
  userChanged: EventEmitter<User | null> = new EventEmitter<User | null>();

  setUser(user: User|null): void {
    console.log('User Received: ',user);
    this.user = user;
    this.userChanged.emit(user);
  }

  getUser(): User | null {
    return this.user;
  }
}
