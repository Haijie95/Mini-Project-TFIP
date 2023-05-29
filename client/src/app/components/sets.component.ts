import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { Sets } from '../models/sets';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit, OnDestroy{

  params$!: Subscription;
  sets!: Sets[];
  setCode="";
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private activatedRoute: ActivatedRoute,
    private cSvc: CardsService, private router: Router){
    }

    ngOnInit(): void {
      this.params$=this.activatedRoute.params.subscribe(
        async(params) => {
          const r = await this.cSvc.getSets();
          if (r === undefined || r.length == 0) {
            this.router.navigate(['/'])
          }else{
              this.sets = r;
              this.sortSetsByReleaseDate();
          }
        }
      )
    }

    ngOnDestroy(): void{

    }

    getSpecificSet(i: number){
      this.setCode=this.sets[i].code
      console.log("Search for ->",this.setCode);
      this.router.navigate(['/api/getSetCards',this.setCode])
    }

    sortSetsByReleaseDate() {
      this.sets.sort((a, b) => {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        if (this.sortOrder === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });

      // Toggle the sort order for the next click
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }

}
