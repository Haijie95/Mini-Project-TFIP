import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { UsersharingService } from '../service/usersharing.service';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin!:boolean;
  user!: User|null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,private alertSVc: AlertService,
    public uSvc: UserService, private uShare: UsersharingService)
    {
      this.isLogin = uSvc.getLoginStatus();
      // Subscribe to changes in the login status
      this.uSvc.loginStatusChanged.subscribe((status:boolean) => {
        this.isLogin = status;});
  }

  ngOnInit(): void {
    this.uShare.userChanged.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  getUserCollection(){
    console.log("Search for ->",this.user?.email);
      this.router.navigate(['/api/personalcollection',this.user?.email])
  }

  goAddCard(){
    if(this.user){
      this.uShare.setUser(this.user);
      this.router.navigate(['/api/addcard']);
    }

  }

  logOut(){
    this.uShare.setUser(null);
    this.uSvc.updateLoginStatus()
    this.router.navigate(['/api/logout']);
  }


}
