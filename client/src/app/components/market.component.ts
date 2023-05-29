import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { Subscription } from 'rxjs';
import { MarketCard, OfferCard, UserCard } from '../models/card';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  params$!: Subscription;
  marketCard!: MarketCard[];
  offerCard!: OfferCard;
  details!: string;

  constructor(private activatedRoute: ActivatedRoute,
    private cSvc: CardsService, private router: Router,
    private sanitizer: DomSanitizer){
      this.offerCard = {
        id: 0,
        email: '',
        cardname: '',
        offeremail: '',
        name: '',
        offerprice: ''
      };
    }

    ngOnInit(): void {
      this.params$=this.activatedRoute.params.subscribe(
        async(params) => {
          const r = await this.cSvc.getMarket();
          if (r === undefined || r.length == 0) {
            this.router.navigate(['/'])
          }else{
            this.marketCard = r;
            console.log(this.marketCard);
            this.marketCard.forEach((marketCard) => {
              const base64String = marketCard.image; // Assuming the image property is already a base64 string
              marketCard.image = 'data:image/jpeg;base64,' + base64String;
            });
          }
        }
      )
    }

    acceptOfferPrice(i: number){
      this.offerCard.email=this.marketCard[i].email;
      this.offerCard.cardname=this.marketCard[i].cardname;
      this.offerCard.id=this.marketCard[i].id;
      this.offerCard.cardname=this.marketCard[i].cardname;
      console.log("Offer this ->",this.offerCard);
      this.details=this.offerCard.email+"/"+this.offerCard.cardname+"/"+this.offerCard.id;
      console.log("Detail ->",this.details);

      this.router.navigate(['/api/acceptoffer',this.details])
    }

}
