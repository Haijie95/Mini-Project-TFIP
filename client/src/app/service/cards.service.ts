import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Sets } from '../models/sets';
import { MarketCard, OfferCard, UserCard } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private API_URI: string="/api/getAllSets"
  private SET_URL: string="/api/getSetCards"
  private ADD_URL: string="/api/addcard"
  private MKT_URL: string="/api/market"
  private GET_URL: string="/api/personalcollection"
  private OFFER_URL: string="/api/offercard"
  private REM_URL: string="/api/removelisting"


  constructor(private httpClient: HttpClient) { }

  getSets():Promise<any>{
    return lastValueFrom(this.httpClient
      .get<Sets[]>(this.API_URI))
    }

  getSetCards(setCode: string):Promise<any>{
    const params= new HttpParams()
    .set("setCode",setCode);

    return lastValueFrom(this.httpClient
      .get(this.SET_URL,{params}))
  }

  addToCollection(userCard: UserCard): Promise<any>{
    return this.httpClient.post<any>(this.ADD_URL, userCard).toPromise()
    .then(response => {
      if (response) {
        //check for boolean
        return response;
      } else {
        throw new Error('Card failed to add into collection!');
      }
    });
  }

  acceptOffer(offercard: OfferCard): Promise<any>{
    return this.httpClient.post<any>(this.OFFER_URL, offercard).toPromise()
    .then(response => {
      if (response) {
        //check for boolean
        return response;
      } else {
        throw new Error('Failed to send email!');
      }
    });
  }

  removelisting(id: number): Promise<any>{
    return this.httpClient.post<any>(this.REM_URL, id).toPromise()
    .then(response => {
      if (response) {
        //check for boolean
        return response;
      } else {
        throw new Error('Failed to remove listing!');
      }
    });
  }

  getMarket(): Promise<any>{
    return lastValueFrom(this.httpClient
      .get<MarketCard[]>(this.MKT_URL))
  }

  getCollection(email: string):Promise<any>{
    const params= new HttpParams()
    .set("email",email);

    return lastValueFrom(this.httpClient
      .get(this.GET_URL,{params}))
  }

}
