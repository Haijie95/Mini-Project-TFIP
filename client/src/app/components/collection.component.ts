import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarketCard } from '../models/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models/user';
import { UsersharingService } from '../service/usersharing.service';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{

  params$!: Subscription;
  marketCard!: MarketCard[];
  user!: User|null;
  email!: string;
  id!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private cSvc: CardsService, private router: Router,
    private sanitizer: DomSanitizer,
    private uShare: UsersharingService,
    private alertSVc: AlertService
    ){
    }

    ngOnInit(): void {
      this.user = this.uShare.getUser();
      if(this.user){
        this.email=this.user.email;
      }
      this.params$=this.activatedRoute.params.subscribe(
        async(params) => {
          const r = await this.cSvc.getCollection(this.email);
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

    removeListing(i:number){
      this.id=this.marketCard[i].id;
      console.log("Remove listing of id ->",this.id);
      this.cSvc.removelisting(this.id).then((removed: boolean) => {
        console.log(removed);
        if (removed) {
          console.log("Successfully removed!");
          this.alertSVc.success("Listing removed!");
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log("Failed to remove listing!");
        this.alertSVc.danger("Listing not removed!");
        console.error('Error removing card:', error);
      })
    };

}
