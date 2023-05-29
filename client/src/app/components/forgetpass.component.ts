import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit{

  form!: FormGroup

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private router: Router,
    private uSvc: UserService,private alertSVc: AlertService,
    ){}

  ngOnInit(): void {
    this.form=this.createForm()
  }


  private createForm(): FormGroup{
    return this.fb.group({
      email: this.fb.control<string>('',[Validators.required,Validators.minLength(3),
      Validators.email])
    })
  }

  forgetPass(){
    const email = this.form.value as string
    console.log("email -> ",email)
    this.uSvc.forgetPass(email)
    .then((removed: boolean) => {
      console.log(removed);
      if (removed) {
        console.log("Email sent!");
        this.alertSVc.success("Email Sent!");
        this.router.navigate(['/']);
      }
    })
    .catch((error) => {
      console.log("Failed to send email!");
      this.alertSVc.danger("Failed to send email!");
      console.error('Error removing card:', error);
    })
  };

}
