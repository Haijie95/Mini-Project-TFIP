import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../models/card';
import { CardsService } from '../service/cards.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  setCode="";
  params$!: Subscription;
  cards!: Card[];
  cardLink!: string;

  constructor(private activatedRoute: ActivatedRoute,
    private cSvc: CardsService, private router: Router){
    }

    ngOnInit(): void {
      this.params$=this.activatedRoute.params.subscribe(
        async(params) => {
          this.setCode = params['setCode'];
          console.log(this.setCode);
          const r = await this.cSvc.getSetCards(this.setCode);
          if (r === undefined || r.length == 0) {
            this.router.navigate(['/'])
          }else{
              this.cards = r;
          }
        }
      )
    }

    goToLink(i: number){
        this.cardLink=this.cards[i].tcgUrl;
        window.open(this.cardLink,'_blank');
    }


}
