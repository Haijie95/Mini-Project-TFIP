import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User, loginDetails } from '../models/user';
import { AlertService } from '@full-fledged/alerts';
import { UsersharingService } from '../service/usersharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  hide: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private router: Router,
    private uSvc: UserService,private alertSVc: AlertService,
    private uShare: UsersharingService){}

    user!: User;

    ngOnInit(): void {
      this.form=this.createForm();
    }

    private createForm(): FormGroup{
      return this.fb.group({
        email: this.fb.control<string>('',[Validators.required,Validators.minLength(3),
        Validators.email]),
        password: this.fb.control<string>('',[Validators.required,
        Validators.maxLength(8),Validators.maxLength(8)])
      })
    }

    createUser(){
      this.router.navigate(['/api/createUser'])
    }

    checkForUser(){
      const loginDetails = this.form.value as loginDetails
      this.uSvc.getUser(loginDetails.email)
      .then((user: User) => {
        console.log(user); // Handle the User object here
        if(user.password==loginDetails.password){
          console.log("Successful Login!")
          this.alertSVc.success("Login Successful!")
          this.uSvc.updateLoginStatus()
          this.uShare.setUser(user)
          this.router.navigate([''])
        } else if (user.password!=loginDetails.password){
          console.log("Password incorrect!")
          this.alertSVc.danger("Incorrect Password!")
        }
      })
      .catch((error) => {
        console.log("User does not exist!")
        this.alertSVc.danger("User does not exist!")
        console.error('Error fetching user data:', error);
      });

    }

    forgetPass(){
      this.router.navigate(['/api/forgetpassword'])
    }
}
