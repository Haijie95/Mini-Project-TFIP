import { Component } from '@angular/core';
import { OfferCard } from '../models/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-acceptoffer',
  templateUrl: './acceptoffer.component.html',
  styleUrls: ['./acceptoffer.component.css']
})
export class AcceptofferComponent {

  offerCard: OfferCard | undefined;
  form!: FormGroup
  id!: number
  email!: string
  cardname!: string

  constructor(private route: ActivatedRoute,
    private cSvc: CardsService, private router: Router,
    private fb: FormBuilder,private alertSVc: AlertService) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const details = params['details'];
      if (details) {
        const parts = details.split('/');
        this.email = parts[0];
        this.cardname = parts[1];
        this.id = parseInt(parts[2], 10);
        this.offerCard = {
          id: this.id,
          email: this.email,
          cardname: this.cardname,
          offeremail: '',
          name: '',
          offerprice: ''
        };
        console.log("Received offer card ->", this.offerCard);

      }
    });
    this.form=this.createForm();
  }

  private createForm(): FormGroup{
    return this.fb.group({
      id: this.fb.control<number>(this.id,[Validators.required]),
      email: this.fb.control<string>(this.email,[Validators.required]),
      cardname: this.fb.control<string>(this.cardname,[Validators.required]),
      offeremail: this.fb.control<string>('',[Validators.required,Validators.email]),
      name: this.fb.control<string>('',[Validators.required,Validators.minLength(1)]),
      offerprice: this.fb.control('1',[Validators.required,Validators.minLength(1)])
    })
  }

  sendOffer(){
    const offercard = this.form.value as OfferCard
    this.cSvc.acceptOffer(offercard)
    .then((added: boolean) => {
      console.log(added);
      if (added) {
        console.log("Successfully offered!");
        this.alertSVc.success("Offer Email Sent!");
        this.form.reset();
        this.router.navigate(['/api/market']);
      }
    })
    .catch((error) => {
      console.log("Failed to offer card!");
      this.alertSVc.danger("Card not offered!");
      console.error('Error offering card:', error);
    });
  }


}


