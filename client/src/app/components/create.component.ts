import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    form!: FormGroup

    //google map
    zoom = 10;
    center!: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      maxZoom: 15,
      minZoom: 8,
    };

    constructor(private activatedRoute: ActivatedRoute,
      private fb: FormBuilder, private router: Router,
      private uSvc: UserService){}

    ngOnInit(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: 1.3521,
          lng: 103.8198,
        };
      });
      this.form=this.createForm();
  }

  private createForm(): FormGroup{
    return this.fb.group({
      email: this.fb.control<string>('',[Validators.required,Validators.minLength(3),
      Validators.email]),
      password: this.fb.control<string>('',[Validators.required,
      Validators.minLength(8),Validators.maxLength(8)]),
      displayname:this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
      region:this.fb.control<string>('',[Validators.required])
    })
  }

  //save user to mongoDB
  createUser(){
    const user = this.form.value as User
    this.uSvc.createuser(user).then(result => {
      console.log(result);
      const uniqueId = result.uniqueId.chars;
      alert(`User created. Unique id is ${uniqueId}`)
      this.router.navigate(['/api/login'])
    })
    .catch(error => {
      alert(`ERROR! ${JSON.stringify(error)}`)
    });
  }


}
