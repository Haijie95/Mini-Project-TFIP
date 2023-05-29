import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertSVc: AlertService,
    ){}

  ngOnInit(): void {
    this.alertSVc.success("Logout Successful!")
  }
}
